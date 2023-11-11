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
/*
export interface IThread extends IEntity {
    title: string,
    user: IVeterinario,
    replies: number
}

export interface IThreadPage extends IPage<IThread> {
}

export interface IReply extends IEntity {
    title: string,
    body: string,
    user: IVeterinario,
    thread: IThread
}

export interface IReplyPage extends IPage<IReply> {
}
*/
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