import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IMascota, formOperation } from 'src/app/model/model.interfaces';
import { MascotaAjaxService } from 'src/app/service/mascota.ajax.service';

@Component({
  selector: 'app-mascota-form-unrouted',
  templateUrl: './mascota-form-unrouted.component.html',
  styleUrls: ['./mascota-form-unrouted.component.css']
})
export class MascotaFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  mascotaForm!: FormGroup;
  oMascota: IMascota = {} as IMascota;
  status: HttpErrorResponse | null = null;

  constructor(
    private oFormBuilder: FormBuilder,
    private oMascotaAjaxService: MascotaAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oMascota);
  }

  initializeForm(oMascota: IMascota) {
    this.mascotaForm = this.oFormBuilder.group({
      id: [oMascota.id],
      name: [oMascota.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      chip: [oMascota.chip, [Validators.required, Validators.minLength(1)]],
      propietario: [oMascota.propietario, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      phone: [oMascota.phone, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email: [oMascota.email, [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oMascotaAjaxService.getOne(this.id).subscribe({
        next: (data: IMascota) => {
          this.oMascota = data;
          this.initializeForm(this.oMascota);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading pet from server.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oMascota);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.mascotaForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    console.log("entra en submit");
    if (this.mascotaForm.valid) {
      console.log("entra en el if");
      if (this.operation == 'NEW') {
        console.log("entra en new");
        this.oMascotaAjaxService.newOne(this.mascotaForm.value).subscribe({
          next: (data: IMascota) => {
            console.log("entra en this");
            this.oMascota = data;
            this.initializeForm(this.oMascota);
            // avisar al usuario que se ha creado correctamente
            console.log('Datos a enviar:', this.mascotaForm.value);
            this.oMatSnackBar.open("Pet has been created.", '', { duration: 2000 });
            this.oRouter.navigate([ '/mascota/view', this.oMascota.id]);
            
          },
          error: (error: HttpErrorResponse) => {
            console.log("entra en el error del new");
            this.status = error;
            this.oMatSnackBar.open("Can't create Mascota.", '', { duration: 2000 });
          }
        })

      } else {
        console.log("entra en else");
        this.oMascotaAjaxService.updateOne(this.mascotaForm.value).subscribe({
          next: (data: IMascota) => {
            console.log("entra en el this del else");
            this.oMascota = data;
            this.initializeForm(this.oMascota);
            // avisar al usuario que se ha actualizado correctamente
            this.oMatSnackBar.open("Pet has been updated.", '', { duration: 2000 });
            this.oRouter.navigate(['/mascota', 'view', this.oMascota.id]);
          },
          error: (error: HttpErrorResponse) => {
            console.log("entra en error del else");
            this.status = error;
            this.oMatSnackBar.open("Can't update pet.", '', { duration: 2000 });
          }
        })
      }
    }
  }

}
