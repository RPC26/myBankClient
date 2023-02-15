import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types";
import { IUsuario } from "./usuario-interface";
import { ITipocuenta } from "./tipocuenta-interface";

export interface IEstadoCuentas {
    habilitadas: number
    deshabilitadas: number
}
export interface ICuenta {
    id: number,
    fechacreacion: Date,
    iban: string,
    activa: boolean,
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
    activa: FormControl<boolean>;
    id_usuario: FormControl<number>;
    id_tipocuenta: FormControl<number>;
}

export interface ICuentaUpdate {
    id: number,
    iban: string;
    activa: boolean;
    fechacreacion?: Date;
    tipocuenta:IEntity;
    usuario: IEntity;
}

export interface ICuentaCreate {
    id: number;
    fechacreacion: Date;
    iban: string;
    activa: boolean;
    tipocuenta:IEntity;
    usuario: IEntity;
}