import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';

@Component({
  selector: 'app-cita-plist-routed',
  templateUrl: './cita-plist-routed.component.html',
  styleUrls: ['./cita-plist-routed.component.css']
})
export class CitaPlistRoutedComponent implements OnInit {

  id_veterinario: number;
  id_mascota: number;
  bLoading: boolean = false;

  constructor(
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

}
