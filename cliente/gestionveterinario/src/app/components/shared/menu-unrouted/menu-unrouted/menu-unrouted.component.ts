
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IVeterinario, SessionEvent } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';

@Component({
    selector: 'app-menu-unrouted',
    templateUrl: './menu-unrouted.component.html',
    styleUrls: ['./menu-unrouted.component.css']
})
export class MenubarUnroutedComponent implements OnInit {
    strUserName: string = "";
    oSessionUser: IVeterinario | null = null;

    isMenuOpen: boolean = false;
  
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
      this.oSessionService.on().subscribe({
        next: (data: SessionEvent) => {
          if (data.type == 'login') {
            this.strUserName = this.oSessionService.getUsername();
            this.oVeterinarioAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
              next: (oUser: IVeterinario) => {
                this.oSessionUser = oUser;
              },
              error: (error: HttpErrorResponse) => {
                console.log(error);
              }
            });
          }
          if (data.type == 'logout') {
            this.strUserName = "";
          }
        }
      });
  
  
    }  
   

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
}