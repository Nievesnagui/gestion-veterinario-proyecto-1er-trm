import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IMascota, IVeterinario } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})

export class HomeRoutedComponent implements OnInit {

  strUserName: string = "";
  oSessionUser: IVeterinario | null = null;

  id_mascota: number = 0;
  reloadThreads: Subject<boolean> = new Subject<boolean>();

  constructor(
    private oSessionService: SessionAjaxService,
    private oVeterinarioAjaxService: VeterinarioAjaxService
  ) {
    this.strUserName = oSessionService.getUsername();
    this.oVeterinarioAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IVeterinario) => {
        this.oSessionUser = oUser;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
  }

  onThreadChange(oMascota: IMascota) {
    this.id_mascota = oMascota.id;
  }

  onReplyChange(bCita: Boolean) {
    this.reloadThreads.next(true);
  }
}
