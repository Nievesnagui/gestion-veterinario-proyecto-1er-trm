import { HttpErrorResponse } from "@angular/common/http";

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}

export interface IEntity {
    id: number,
}

export interface IVeterinario extends IEntity {
    name: string,
    surname: string,
    email: string,    
    username: string,
    dni: string,
    phone: string,
    role: boolean,
    citas: number
}

export interface IVeterinarioPage extends IPage<IVeterinario> {
}

export interface IMascota extends IEntity {
    name: string,
    chip: string,
    propietario: string,    
    phone: string,
    email: string,
    citas: number
}

export interface IMascotaPage extends IPage<IMascota> {
}



export interface ICita extends IEntity {
    fecha: string,
    hora: string,
    vet: IVeterinario,
    pet: IMascota
}

export interface ICitaPage extends IPage<ICita> {
}

export type formOperation = 'EDIT' | 'NEW';

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