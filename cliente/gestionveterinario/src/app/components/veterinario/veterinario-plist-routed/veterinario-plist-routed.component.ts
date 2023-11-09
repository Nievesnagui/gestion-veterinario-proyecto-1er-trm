import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-veterinario-plist-routed',
  templateUrl: './veterinario-plist-routed.component.html',
  styleUrls: ['./veterinario-plist-routed.component.css']
})
export class VeterinarioPlistRoutedComponent implements OnInit {


  bLoading: boolean = false;

  constructor(
    private oVeterinarioAjaxService: VeterinarioAjaxService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;    
    this.oVeterinarioAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " vets", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating vets: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }
}
