import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IMascota } from 'src/app/model/model.interfaces';
import { MascotaAjaxService } from 'src/app/service/mascota.ajax.service';

@Component({
  selector: 'app-mascota-detail-unrouted',
  templateUrl: './mascota-detail-unrouted.component.html',
  styleUrls: ['./mascota-detail-unrouted.component.css']
})
export class MascotaDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oPet: IMascota = {} as IMascota;
  status: HttpErrorResponse | null = null;

  constructor(
    private oMascotaAjaxService: MascotaAjaxService,
    @Optional() public ref:DynamicDialogRef,
    @Optional() public config:DynamicDialogConfig
  ) {     
    if (config){
      if (config.data){
        this.id = config.data.id;
      }
    }    
  }

  ngOnInit() {
    console.log(this.id);
    this.getOne();
  }

  getOne(): void {
    this.oMascotaAjaxService.getOne(this.id).subscribe({    
      next: (data: IMascota) => {
        this.oPet = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }
}
