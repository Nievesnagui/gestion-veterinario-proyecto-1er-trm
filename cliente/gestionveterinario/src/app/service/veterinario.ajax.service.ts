import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVeterinario, IVeterinarioPage } from '../model/model.interfaces';
import { API_URL } from 'src/environment/environment';

@Injectable()
export class VeterinarioAjaxService {

    sUrl: string = API_URL + "/veterinario";

    constructor(
        private oHttpClient: HttpClient
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
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oUser: IVeterinario): Observable<IVeterinario> {
        return this.oHttpClient.post<IVeterinario>(this.sUrl, oUser);
    }

    updateOne(oUser: IVeterinario): Observable<IVeterinario> {
        return this.oHttpClient.put<IVeterinario>(this.sUrl, oUser);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

}
