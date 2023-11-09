import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IVeterinario, IVeterinarioPage } from 'src/app/model/model.interfaces';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-veterinario-selection-unrouted',
  templateUrl: './veterinario-selection-unrouted.component.html',
  styleUrls: ['./veterinario-selection-unrouted.component.css']
})
export class VeterinarioSelectionUnroutedComponent implements OnInit {

  oPage: IVeterinarioPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oVeterinarioToRemove: IVeterinario | null = null;

  constructor(
    private oVeterinarioAjaxService: VeterinarioAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
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

  onSelectUser(oUser: IVeterinario) {
    this.oDynamicDialogRef.close(oUser);
  }
}
