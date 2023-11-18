import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IVeterinario, IVeterinarioPage } from 'src/app/model/model.interfaces';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeterinairoDetailUnroutedComponent } from '../veterinairo-detail-unrouted/veterinairo-detail-unrouted.component';
import { Subject } from 'rxjs';

@Component({
  providers: [ConfirmationService],
  selector: 'app-veterinario-plist-unrouted',
  templateUrl: './veterinario-plist-unrouted.component.html',
  styleUrls: ['./veterinario-plist-unrouted.component.css']
})
export class VeterinarioPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IVeterinarioPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oVeterinarioToRemove: IVeterinario | null = null;

  constructor(
    private oVeterinarioAjaxService: VeterinarioAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {
    this.oVeterinarioAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IVeterinarioPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

  doView(u: IVeterinario) {
    this.ref = this.oDialogService.open(VeterinairoDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of vet',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: IVeterinario) {
    this.oVeterinarioToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The vet has been removed.", '', { duration: 2000 });
        this.oVeterinarioAjaxService.removeOne(this.oVeterinarioToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The vet hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The vet hasn't been removed.", "", { duration: 2000 });
      }
    });
  }
}
