import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICita } from 'src/app/model/model.interfaces';
import { CitaAjaxService } from 'src/app/service/cita.ajax.service';

@Component({
  selector: 'app-cita-detail-unrouted',
  templateUrl: './cita-detail-unrouted.component.html',
  styleUrls: ['./cita-detail-unrouted.component.css']
})
export class CitaDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oCita: ICita = { vet: {}, pet: {} } as ICita;
  status: HttpErrorResponse | null = null;

  constructor(
    private oCitaAjaxService: CitaAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
  }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oCitaAjaxService.getOne(this.id).subscribe({
      next: (data: ICita) => {
        this.oCita = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }
}
