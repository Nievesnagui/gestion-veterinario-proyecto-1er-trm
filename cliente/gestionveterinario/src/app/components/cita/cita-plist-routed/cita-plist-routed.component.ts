import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';

@Component({
  selector: 'app-cita-plist-routed',
  templateUrl: './cita-plist-routed.component.html',
  styleUrls: ['./cita-plist-routed.component.css']
})
export class CitaPlistRoutedComponent implements OnInit {

  bLoading: boolean = false;

  constructor(
    private oCitaAjaxService: CitaAjaxService,
    private oMatSnackBar: MatSnackBar
  ) { }

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
