import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { ICita, ICitaPage, IMascota, IVeterinario } from 'src/app/model/model.interfaces';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';
import { MascotaAjaxService } from 'src/app/service/mascota.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';
import { CitaDetailUnroutedComponent } from '../cita-detail-unrouted/cita-detail-unrouted.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CitaFormUnroutedComponent } from '../cita-form-unrouted/cita-form-unrouted.component';

@Component({
  selector: 'app-user-cita-plist-unrouted',
  templateUrl: './user-cita-plist-unrouted.component.html',
  styleUrls: ['./user-cita-plist-unrouted.component.css']
})
export class UserCitaPlistUnroutedComponent implements OnInit {

  strUserName: string = "";
  oSessionUser: IVeterinario | null = null;
  @Input()
  set id_veterinario(value: number) {
    if (value) {
      this.id_veterinario_filter = value;
    } else {
      this.id_veterinario_filter = 0;
    }
    this.getPage();
  }
  get id_veterinario(): number {
    return this.id_veterinario_filter;
  }

  @Input()
  set id_mascota(value: number) {
    if (value) {
      this.id_mascota_filter = value;
    } else {
      this.id_mascota_filter = 0;
    }
    this.getPage();
  }
  get id_mascota(): number {
    return this.id_mascota_filter;
  }

  @Output() cita_change = new EventEmitter<Boolean>();

  id_mascota_filter: number = 0; 
  id_veterinario_filter: number = 0; 

  oPage: ICitaPage | undefined;
  oVeterinario: IVeterinario | null = null; 
  oMascota: IMascota | null = null; 
  orderField: string = "id";
  orderDirection: string = "desc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oCitaToRemove: ICita | null = null;

  constructor(
    private oVeterinarioAjaxService: VeterinarioAjaxService,
    public oSessionService: SessionAjaxService,
    private oMascotaAjaxService: MascotaAjaxService,
    private oCitaAjaxService: CitaAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { this.strUserName = oSessionService.getUsername();
    this.oVeterinarioAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IVeterinario) => {
        this.oSessionUser = oUser;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    }); }
  citaForm: FormGroup = new FormGroup({
    fecha: new FormControl(null, [Validators.required]), // Ajusta los validators según tus necesidades
    veterinario: new FormGroup({
      id: new FormControl(null, [Validators.required])
    }),
    mascota: new FormGroup({
      id: new FormControl(null, [Validators.required])
    })
  });
  ngOnInit() {
    
    const idVeterinarioConectado = this.oSessionService.getVetId();
    if (idVeterinarioConectado) {
      // Establecer el ID del veterinario conectado en el formulario
      this.citaForm.get('veterinario.id')?.setValue(idVeterinarioConectado);
      console.log(idVeterinarioConectado);
    }

    this.getPage();
    if (this.id_veterinario > 0) {
      this.getVeterinario();
    }
    if (this.id_mascota > 0) {
      this.getMascota();
    }
  }

  getPage(): void {
    this.oCitaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_veterinario_filter, this.id_mascota_filter).subscribe({
      next: (data: ICitaPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

  doView(u: ICita) {
    this.ref = this.oDialogService.open(CitaDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of appointment',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: ICita) {
    this.oCitaToRemove = u;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The appointment has been removed.", '', { duration: 2000 });
        this.oCitaAjaxService.removeOne(this.oCitaToRemove?.id).subscribe({
          next: () => {
            this.getPage();
            this.cita_change.emit(true);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The reply hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The reply hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

  getVeterinario(): void {
    this.oVeterinarioAjaxService.getOne(this.id_veterinario).subscribe({
      next: (data: IVeterinario) => {
        this.oVeterinario = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  getMascota(): void {
    this.oMascotaAjaxService.getOne(this.id_mascota).subscribe({
      next: (data: IMascota) => {
        this.oMascota = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  postNewCita(): void {
    if (this.oSessionService.isSessionActive()) {
      this.ref = this.oDialogService.open(CitaFormUnroutedComponent, {
        data: {
          id_thread: this.id_mascota_filter,
        },
        header: 'Post a new pet',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false
      });

      this.ref.onClose.subscribe((nCita: number) => {
        this.getPage();
        this.cita_change.emit(true);
      });
    }
  }

  viewAllAppointment(): void {
    this.id_veterinario_filter = 0;
    this.id_mascota_filter = 0;
    this.getPage();
  }



  
}
