import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types";
import { IUsuario } from "./usuario-interface";
import { ITipocuenta } from "./tipocuenta-interface";

export interface ICuenta {
    id: number,
    fechacreacion: Date,
    iban: string,
    usuario: IUsuario,
    tipocuenta: ITipocuenta
}

export interface ICuentaPage {
    content: ICuenta[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface ICuenta2Form {
    id: FormControl<number>;
    fechacreacion: FormControl<Date>;
    iban: FormControl<string>;
    id_usuario: FormControl<number>;
    id_tipocuenta: FormControl<number>;
}

export interface ICuentaUpdate {
    id: number,
    iban: string;
    fechacreacion: Date;
    tipocuenta:IEntity;
    usuario: IEntity;
}

export interface ICuentaCreate {
    id: number;
    fechacreacion: Date;
    iban: string;
    tipocuenta:IEntity;
    usuario: IEntity;
}