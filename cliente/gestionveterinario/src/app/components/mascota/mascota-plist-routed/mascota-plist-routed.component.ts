import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaAjaxService } from 'src/app/service/mascota.ajax.service';

@Component({
  selector: 'app-mascota-plist-routed',
  templateUrl: './mascota-plist-routed.component.html',
  styleUrls: ['./mascota-plist-routed.component.css']
})
export class MascotaPlistRoutedComponent implements OnInit {
  bLoading: boolean = false;

  constructor(
    private oMascotaAjaxService: MascotaAjaxService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;    
    this.oMascotaAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " pets", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating pets: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }
}
