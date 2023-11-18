import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environment/environment';
import { ICita, ICitaPage } from '../model/model.interfaces';

@Injectable()
export class CitaAjaxService {
    sUrl: string = API_URL + "/cita";

    constructor(
        private oHttpClient: HttpClient,
    ) { }

    getOne(id: number): Observable<ICita> {
        return this.oHttpClient.get<ICita>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_veterinario: number, id_mascota: number): Observable<ICitaPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        let strUrlVet = "";
        if (id_veterinario > 0) {
            strUrlVet = "&veterinario=" + id_veterinario;
        }
        let strUrlPet = "";
        if (id_mascota > 0) {
            strUrlPet = "&mascota=" + id_mascota;
        }

        return this.oHttpClient.get<ICitaPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlVet + strUrlPet);
       
    }

    removeOne(id: number | undefined): Observable<number> {
        console.log('Removing appointment with ID:', id);
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oCita: ICita): Observable<ICita> {
        return this.oHttpClient.post<ICita>(this.sUrl, oCita);
    }

    updateOne(oCita: ICita): Observable<ICita> {
        return this.oHttpClient.put<ICita>(this.sUrl, oCita);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }
}
