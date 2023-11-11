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

@Component({
  selector: 'app-cita-form-unrouted',
  templateUrl: './cita-form-unrouted.component.html',
  styleUrls: ['./cita-form-unrouted.component.css']
})
export class CitaFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  citaForm!: FormGroup;
  oCita: ICita = { vet: {}, pet: {} } as ICita;
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
      fecha: [oCita.fecha, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      hora: [oCita.hora, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      vet: this.oFormBuilder.group({
        id: [oCita.vet.id, Validators.required]
      }),
      pet: this.oFormBuilder.group({
        id: [oCita.pet.id, Validators.required]
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
            this.oCita = { "vet": {}, "pet": {} } as ICita;
            this.initializeForm(this.oCita);
            // avisar al usuario que se ha creado correctamente
            console.log('Datos a enviar:', this.citaForm.value);
            this.oMatSnackBar.open("The appointment has been created.", '', { duration: 2000 });
            this.oRouter.navigate([ '/cita/view', this.oCita.id]);
            
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't create the appointment.", '', { duration: 2000 });
          }
        })

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
        this.oCita.vet = oVet;
        this.citaForm.controls['vet'].patchValue({ id: oVet.id })
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
        this.oCita.pet = oPet;
        this.citaForm.controls['pet'].patchValue({ id: oPet.id })
      }
    });
  }

}
