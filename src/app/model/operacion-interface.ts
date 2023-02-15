import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types";
import { IUsuario } from "./usuario-interface";
import { ITipooperacion } from "./tipooperacion-interface";
import { ICuenta } from "./cuenta-interface";

export interface IOperacion {
    id: number,
    fechahoraoperacion: Date,
    cantidad: number,
    tipooperacion: ITipooperacion
    emisorCuentaEntity: ICuenta,
    receptorCuentaEntity: ICuenta,
}

export interface IOperacionPage {
    content: IOperacion[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface IOperacion2Form {
    id: FormControl<number>;
    fechahoraoperacion: FormControl<Date>;
    cantidad: FormControl<number>;
    tipooperacion: FormControl<number>;
    emisorCuentaEntity: FormControl<number>;
    receptorCuentaEntity?: FormControl<number>;
}

export interface IOperacionUpdate {
    id: number;
    fechahoraoperacion: Date;
    cantidad: number,
    tipooperacion: IEntity;
    emisorCuentaEntity:IEntity;
    receptorCuentaEntity?:IEntity;
}

export interface IOperacionCreate {
    id: number;
    fechahoraoperacion?: Date;
    cantidad: number,
    tipooperacion: IEntity;
    emisorCuentaEntity:IEntity;
    receptorCuentaEntity?:IEntity;
}