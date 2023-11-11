import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IVeterinario, formOperation } from 'src/app/model/model.interfaces';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';

@Component({
  selector: 'app-veterinario-form-unrouted',
  templateUrl: './veterinario-form-unrouted.component.html',
  styleUrls: ['./veterinario-form-unrouted.component.css']
})
export class VeterinarioFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  veterinarioForm!: FormGroup;
  oVeterinario: IVeterinario = {} as IVeterinario;
  status: HttpErrorResponse | null = null;

  constructor(
    private oFormBuilder: FormBuilder,
    private oVeterinarioAjaxService: VeterinarioAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oVeterinario);
  }

  initializeForm(oVeterinario: IVeterinario) {
    this.veterinarioForm = this.oFormBuilder.group({
      id: [oVeterinario.id],
      name: [oVeterinario.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      surname: [oVeterinario.surname, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      email: [oVeterinario.email, [Validators.required, Validators.email]],
      username: [oVeterinario.username, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      dni: [oVeterinario.dni, [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      phone: [oVeterinario.phone, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      role: [oVeterinario.role, Validators.required]
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oVeterinarioAjaxService.getOne(this.id).subscribe({
        next: (data: IVeterinario) => {
          this.oVeterinario = data;
          this.initializeForm(this.oVeterinario);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading vet from server.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oVeterinario);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.veterinarioForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.veterinarioForm.valid) {
      if (this.operation == 'NEW') {
        this.oVeterinarioAjaxService.newOne(this.veterinarioForm.value).subscribe({
          next: (data: IVeterinario) => {
            this.oVeterinario = data;
            this.initializeForm(this.oVeterinario);
            // avisar al usuario que se ha creado correctamente
            console.log('Datos a enviar:', this.veterinarioForm.value);
            this.oMatSnackBar.open("Vet has been created.", '', { duration: 2000 });
            this.oRouter.navigate([ '/veterinario', 'view', this.oVeterinario]);
            
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't create veterinario.", '', { duration: 2000 });
          }
        })

      } else {
        this.oVeterinarioAjaxService.updateOne(this.veterinarioForm.value).subscribe({
          next: (data: IVeterinario) => {
            this.oVeterinario = data;
            this.initializeForm(this.oVeterinario);
            // avisar al usuario que se ha actualizado correctamente
            this.oMatSnackBar.open("Vet has been updated.", '', { duration: 2000 });
            this.oRouter.navigate(['/veterinario', 'view', this.oVeterinario.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't update vet.", '', { duration: 2000 });
          }
        })
      }
    }
  }
}
