
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
    selector: 'app-menu-unrouted',
    templateUrl: './menu-unrouted.component.html',
    styleUrls: ['./menu-unrouted.component.css']
})
export class MenubarUnroutedComponent implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private sessionService: SessionAjaxService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Home', //Por hacer
                icon: 'pi pi-fw pi-home',
                routerLink: 'home'
            },
            {
                label: 'Vets',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: 'veterinario/new'
                    },
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: 'veterinario/plist'
                    }
                ]
            },
            {
                label: 'Pets',
                icon: 'pi pi-fw pi-heart',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: 'mascota/new'
                    },
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: 'mascota/plist'
                    }
                ]
            },
            {
                label: 'Appointments',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: 'cita/new'
                    },
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: 'cita/plist'
                    }
                ]
            },
            {
                label: this.sessionService.isAuthenticated() ? 'Quit' : 'Login',
                icon: 'pi pi-fw pi-power-off',
                routerLink: this.sessionService.isAuthenticated() ? 'logout' : 'login',
            }
        ];
    }
}