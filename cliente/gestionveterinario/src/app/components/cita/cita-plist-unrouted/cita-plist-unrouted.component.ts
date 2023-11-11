import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { ICita, ICitaPage, IMascota, IVeterinario } from 'src/app/model/model.interfaces';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';
import { CitaDetailUnroutedComponent } from '../cita-detail-unrouted/cita-detail-unrouted.component';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';
import { MascotaAjaxService } from 'src/app/service/mascota.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  selector: 'app-cita-plist-unrouted',
  templateUrl: './cita-plist-unrouted.component.html',
  styleUrls: ['./cita-plist-unrouted.component.css']
})
export class CitaPlistUnroutedComponent implements OnInit {
  @Input() id_veterinario: number = 0; 
  @Input() id_mascota: number = 0;


  oPage: ICitaPage | undefined;
  oVet: IVeterinario | null = null;
  oPet: IMascota | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oCitaToRemove: ICita | null = null;

  constructor(
    private oVeterinarioAjaxService: VeterinarioAjaxService,
    private oMascotaAjaxService: MascotaAjaxService,
    private oCitaAjaxService: CitaAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_veterinario > 0) {
      this.getVeterinario();
    }
    if (this.id_mascota > 0) {
      this.getMascota();
    }
  }

  getPage(): void {
    this.oCitaAjaxService.getPage(
      this.oPaginatorState.rows,
      this.oPaginatorState.page,
      this.orderField,
      this.orderDirection,
      this.id_veterinario,
      this.id_mascota
    ).subscribe({
      next: (data: ICitaPage) => {
        console.log(data); 
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }
  

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
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
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The appointment has been removed.", '', { duration: 2000 });
        this.oCitaAjaxService.removeOne(this.oCitaToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The appointment hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The appointment hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

  getVeterinario(): void {
    this.oVeterinarioAjaxService.getOne(this.id_veterinario).subscribe({
      next: (data: IVeterinario) => {
        this.oVet = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  getMascota(): void {
    this.oMascotaAjaxService.getOne(this.id_mascota).subscribe({
      next: (data: IMascota) => {
        this.oPet = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

}
