import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  providers: [ConfirmationService],
  selector: 'app-veterinario-plist-routed',
  templateUrl: './veterinario-plist-routed.component.html',
  styleUrls: ['./veterinario-plist-routed.component.css']
})
export class VeterinarioPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oVeterinarioAjaxService: VeterinarioAjaxService,
    private oConfirmationService: ConfirmationService,
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

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Are you sure that you want to remove all the vets?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oVeterinarioAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Now there are " + oResponse + " vets", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error emptying vets: " + oError.message, '', { duration: 2000 });
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
