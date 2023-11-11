import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { ICita, ICitaPage } from 'src/app/model/model.interfaces';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';

@Component({
  selector: 'app-cita-selection-unrouted',
  templateUrl: './cita-selection-unrouted.component.html',
  styleUrls: ['./cita-selection-unrouted.component.css']
})
export class CitaSelectionUnroutedComponent implements OnInit {


  oPage: ICitaPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oCitaToRemove: ICita | null = null;
  id_veterinario: number = 0;
  id_mascota: number = 0;

  constructor(
    private oCitaAjaxService: CitaAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oCitaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_veterinario, this.id_mascota).subscribe({    
      next: (data: ICitaPage) => {
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

  onSelectCita(oCita: ICita) {
    this.oDynamicDialogRef.close(oCita);
  }
}
