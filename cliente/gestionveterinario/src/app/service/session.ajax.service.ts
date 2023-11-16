import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { API_URL } from 'src/environment/environment';
import { VeterinarioAjaxService } from './veterinario.ajax.service';


export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    name: string;
}

@Injectable()
export class SessionAjaxService {


    sUrl: string = API_URL + "/session";

    subjectSession = new Subject<SessionEvent>();

    constructor(
        private oHttpClient: HttpClient,
        private oVeterinarioAjaxService: VeterinarioAjaxService
    ) { }

    private parseJwt(token: string): IToken {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    login(sUsername: string, sPassword: string): Observable<string> {
        //const sUser: string = JSON.stringify({ username: sUsername, password: sPassword });
        return this.oHttpClient.post<string>(this.sUrl, { username: sUsername, password: sPassword });
    }

    setToken(sToken: string): void {
        localStorage.setItem('token', sToken);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isSessionActive(): Boolean {
        let strToken: string | null = localStorage.getItem('token');
        if (strToken) {
            let oDecodedToken: IToken = this.parseJwt(strToken);
            if (Date.now() >= oDecodedToken.exp * 1000) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    getUsername(): string {
        if (this.isSessionActive()) {
            let token: string | null = localStorage.getItem('token');
            if (!token) {
                return "";
            } else {
                return this.parseJwt(token).name;
            }
        } else {
            return "";
        }
    }

    on(): Observable<SessionEvent> {
        return this.subjectSession.asObservable();
    }

    emit(event: SessionEvent) {
        this.subjectSession.next(event);
    }
}
