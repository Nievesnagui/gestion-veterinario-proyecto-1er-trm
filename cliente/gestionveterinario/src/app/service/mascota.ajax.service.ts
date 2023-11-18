import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environment/environment';
import { IMascota, IMascotaPage } from '../model/model.interfaces';

@Injectable({
    providedIn: 'root'
})
export class MascotaAjaxService {

    sUrl: string = API_URL + "/mascota";

    constructor(
        private oHttpClient: HttpClient,
        private oCconfirmationService: ConfirmationService
    ) { }

    getOne(id: number): Observable<IMascota> {
        return this.oHttpClient.get<IMascota>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IMascotaPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IMascotaPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }

    removeOne(id: number | undefined): Observable<number> {
        console.log('Removing pet with ID:', id);
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oMascota: IMascota): Observable<IMascota> {
        return this.oHttpClient.post<IMascota>(this.sUrl, oMascota);
    }

    updateOne(oMascota: IMascota): Observable<IMascota> {
        return this.oHttpClient.put<IMascota>(this.sUrl, oMascota);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }
}
