import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICita, IMascota, IVeterinario, formOperation } from 'src/app/model/model.interfaces';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';
import { MascotaSelectionUnroutedComponent } from '../../mascota/mascota-selection-unrouted/mascota-selection-unrouted.component';
import { VeterinarioSelectionUnroutedComponent } from '../../veterinario/veterinario-selection-unrouted/veterinario-selection-unrouted.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CALENDAR_ES } from 'src/environment/environment';

@Component({
  selector: 'app-cita-form-unrouted',
  templateUrl: './cita-form-unrouted.component.html',
  styleUrls: ['./cita-form-unrouted.component.css']
})
export class CitaFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  es = CALENDAR_ES;

  citaForm!: FormGroup;
  oCita: ICita = { fecha: new Date(Date.now()), veterinario: {}, mascota: {} } as ICita;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private oFormBuilder: FormBuilder,
    private oCitaAjaxService: CitaAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oCita);
  }

  initializeForm(oCita: ICita) {
    this.citaForm = this.oFormBuilder.group({
      id: [oCita.id],
      fecha: [new Date(oCita.fecha), [Validators.required]],
      veterinario: this.oFormBuilder.group({
        id: [oCita.veterinario.id, Validators.required]
      }),
      mascota: this.oFormBuilder.group({
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
          this.oMatSnackBar.open("Error reading appointment from server.", '', { duration: 2000 });
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
            this.oCita = data;
            this.initializeForm(this.oCita);
            console.log('Datos a enviar:', this.citaForm.value);
            this.oMatSnackBar.open("The appointment has been created.", '', { duration: 2000 });

            // Verifica si 'id' está definido antes de navegar
            if (this.oCita.id !== null && this.oCita.id !== undefined) {
              this.oRouter.navigate(['/cita/view', this.oCita.id]);
            } else {
              console.error('No se puede navegar a la vista de la cita porque el ID no está definido.');
            }
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't create the appointment.", '', { duration: 2000 });
          }
        });
      } else {
        this.oCitaAjaxService.updateOne(this.citaForm.value).subscribe({
          next: (data: ICita) => {
            this.oCita = data;
            this.initializeForm(this.oCita);
            // avisar al usuario que se ha actualizado correctamente
            this.oMatSnackBar.open("The appointment has been updated.", '', { duration: 2000 });
            this.oRouter.navigate(['/cita', 'view', this.oCita.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't update appointment.", '', { duration: 2000 });
          }
        })
      }
    }
  }


  onShowVetsSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(VeterinarioSelectionUnroutedComponent, {
      header: 'Select a Vet',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oVet: IVeterinario) => {
      if (oVet) {
        this.oCita.veterinario = oVet;
        this.citaForm.controls['veterinario'].patchValue({ id: oVet.id })
      }
    });
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
