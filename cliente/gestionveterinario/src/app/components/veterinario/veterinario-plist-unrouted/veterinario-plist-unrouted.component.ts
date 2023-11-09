import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IVeterinario, IVeterinarioPage } from 'src/app/model/model.interfaces';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-veterinario-plist-unrouted',
  templateUrl: './veterinario-plist-unrouted.component.html',
  styleUrls: ['./veterinario-plist-unrouted.component.css']
})
export class VeterinarioPlistUnroutedComponent implements OnInit {

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
  }

  getPage(): void {
    this.oVeterinarioAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IVeterinarioPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
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
    this.ref = this.oDialogService.open(VeterinarioDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of user',
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
        this.oMatSnackBar.open("The user has been removed.", '', { duration: 2000 });
        this.oVeterinarioAjaxService.removeOne(this.oVeterinarioToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The user hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The user hasn't been removed.", "", { duration: 2000 });
      }
    });
  }
}
