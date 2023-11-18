import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICita, IMascota, formOperation } from 'src/app/model/model.interfaces';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';
import { MascotaSelectionUnroutedComponent } from '../../mascota/mascota-selection-unrouted/mascota-selection-unrouted.component';
import { CALENDAR_ES } from 'src/environment/environment';

@Component({
  selector: 'app-user-cita-form-unrouted',
  templateUrl: './user-cita-form-unrouted.component.html',
  styleUrls: ['./user-cita-form-unrouted.component.css']
})
export class UserCitaFormUnroutedComponent implements OnInit {


  citaForm!: FormGroup;
  oCita: ICita = { fecha: new Date(Date.now()), veterinario: {}, mascota: {} } as ICita;
  status: HttpErrorResponse | null = null;
  //---
  id: number = 0;
  id_mascota: number = 0;
  operation: formOperation = 'NEW'; // new or edit
  oRouter: any;

  es = CALENDAR_ES;

  constructor(
    private formBuilder: FormBuilder,
    private oCitaAjaxService: CitaAjaxService,
    private matSnackBar: MatSnackBar,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef,
    public oDynamicDialogConfig: DynamicDialogConfig
  ) {
    if (oDynamicDialogConfig) {
      if (oDynamicDialogConfig.data) {
        if (oDynamicDialogConfig.data.id) {
          this.oCita.id = oDynamicDialogConfig.data.id;
        } else {
          this.oCita.id = 0;
        }
        if (oDynamicDialogConfig.data.id_mascota) {
          this.oCita.mascota = { id: oDynamicDialogConfig.data.id_mascota } as IMascota;
        } else {
          this.oCita.mascota = {} as IMascota;
        }
        if (oDynamicDialogConfig.data.operation) {
          this.operation = oDynamicDialogConfig.data.operation;
        } else {
          this.operation = 'NEW';
        }
      }
    }
    this.initializeForm(this.oCita);

  }

  initializeForm(oCita: ICita) {
    this.citaForm = this.formBuilder.group({
      id: [oCita.id],
      fecha: [new Date(oCita.fecha), [Validators.required]],
      veterinario: this.formBuilder.group({
        id: [oCita.veterinario.id, Validators.required]
      }),
      mascota: this.formBuilder.group({
        id: [oCita.mascota.id, Validators.required]
      })
    });
  }
  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oCitaAjaxService.getOne(this.id).subscribe({
        next: (data: ICita) => {
          this.oCita = data;
          this.initializeForm(this.oCita);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.matSnackBar.open("Error reading appointment from server.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oCita);
    }
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.citaForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.citaForm.valid) {
      if (this.operation == 'NEW') {
        this.oCitaAjaxService.newOne(this.citaForm.value).subscribe({
          next: (data: ICita) => {
            this.oCita = { "veterinario" : {}, "mascota" : {}} as ICita;
            this.initializeForm(this.oCita);
            
            console.log('Datos a enviar:', this.citaForm.value);
            this.matSnackBar.open("The appointment has been created.", '', { duration: 2000 });

            // Verifica si 'id' está definido antes de navegar
            if (this.oCita.id !== null && this.oCita.id !== undefined) {
              this.oRouter.navigate(['/cita/view', this.oCita.id]);
            } else {
              console.error('No se puede navegar a la vista de la cita porque el ID no está definido.');
            }
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't create the appointment.", '', { duration: 2000 });
          }
        });
      } else {
        this.oCitaAjaxService.updateOne(this.citaForm.value).subscribe({
          next: (data: ICita) => {
            this.oCita = data;
            this.initializeForm(this.oCita);
            // avisar al usuario que se ha actualizado correctamente
            this.matSnackBar.open("The appointment has been updated.", '', { duration: 2000 });
            this.oRouter.navigate(['/cita', 'view', this.oCita.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't update appointment.", '', { duration: 2000 });
          }
        })
      }
    }
  }

  onShowPetsSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(MascotaSelectionUnroutedComponent, {
      header: 'Select a Pet',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oPet: IMascota) => {
      if (oPet) {
        this.oCita.mascota = oPet;
        this.citaForm.controls['mascota'].patchValue({ id: oPet.id })
      }
    });
  }
}
