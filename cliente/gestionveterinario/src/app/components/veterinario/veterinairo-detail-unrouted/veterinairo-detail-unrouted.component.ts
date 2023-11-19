import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IVeterinario } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';

@Component({
  selector: 'app-veterinairo-detail-unrouted',
  templateUrl: './veterinairo-detail-unrouted.component.html',
  styleUrls: ['./veterinairo-detail-unrouted.component.css']
})
export class VeterinairoDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oVet: IVeterinario = {} as IVeterinario;
  status: HttpErrorResponse | null = null;

  constructor(
    private oVeterinarioAjaxService: VeterinarioAjaxService,
    private oSessionService: SessionAjaxService,
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
    this.getOne();

  }

  getOne(): void {
    this.oVeterinarioAjaxService.getOne(this.id).subscribe({    
      next: (data: IVeterinario) => {
        this.oVet = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}
