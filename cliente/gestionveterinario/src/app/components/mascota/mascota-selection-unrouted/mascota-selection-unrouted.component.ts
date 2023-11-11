import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IMascota, IMascotaPage } from 'src/app/model/model.interfaces';
import { MascotaAjaxService } from 'src/app/service/mascota.ajax.service';

@Component({
  selector: 'app-mascota-selection-unrouted',
  templateUrl: './mascota-selection-unrouted.component.html',
  styleUrls: ['./mascota-selection-unrouted.component.css']
})
export class MascotaSelectionUnroutedComponent implements OnInit {

  
  oPage: IMascotaPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oMascotaToRemove: IMascota | null = null;

  constructor(
    private oMascotaAjaxService: MascotaAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oMascotaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({    
      next: (data: IMascotaPage) => {
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

  onSelectPet(oPet: IMascota) {
    this.oDynamicDialogRef.close(oPet);
  }
}
