import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-cita-plist-routed',
  templateUrl: './cita-plist-routed.component.html',
  styleUrls: ['./cita-plist-routed.component.css']
})
export class CitaPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_veterinario: number;
  id_mascota: number;
  bLoading: boolean = false;

  constructor(
    private oConfirmationService: ConfirmationService,
    private oActivatedRoute: ActivatedRoute,
    private oCitaAjaxService: CitaAjaxService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.id_veterinario = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id_veterinario") ?? "0");
    this.id_mascota = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id_mascota") ?? "0");
   }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;    
    this.oCitaAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " appointments", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating appointments: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }
  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Are you sure that you want to remove all the appointments?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oCitaAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Now there are " + oResponse + " appointments", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error emptying appontments: " + oError.message, '', { duration: 2000 });
            this.bLoading = false;
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Empty Cancelled!", '', { duration: 2000 });
      }
    });
  }
}
