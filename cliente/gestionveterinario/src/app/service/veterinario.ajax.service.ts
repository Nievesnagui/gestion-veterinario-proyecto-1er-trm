import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVeterinario, IVeterinarioPage } from '../model/model.interfaces';
import { API_URL } from 'src/environment/environment';
import { ConfirmationService } from 'primeng/api';

@Injectable()
export class VeterinarioAjaxService {

    sUrl: string = API_URL + "/veterinario";

    constructor(
        private oHttpClient: HttpClient,
        private oCconfirmationService: ConfirmationService
    ) { }

    getOne(id: number): Observable<IVeterinario> {
        return this.oHttpClient.get<IVeterinario>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IVeterinarioPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IVeterinarioPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }

    removeOne(id: number | undefined): Observable<number> {
        console.log('Removing veterinarian with ID:', id);
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oVeterinario: IVeterinario): Observable<IVeterinario> {
        return this.oHttpClient.post<IVeterinario>(this.sUrl, oVeterinario);
    }

    updateOne(oVeterinario: IVeterinario): Observable<IVeterinario> {
        return this.oHttpClient.put<IVeterinario>(this.sUrl, oVeterinario);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

    getByUsername(username: string): Observable<IVeterinario> {
        return this.oHttpClient.get<IVeterinario>(this.sUrl + "/byUsername/" + username);
    }

}
