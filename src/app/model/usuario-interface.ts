import { ITipoUsuario } from "./tipousuario-interface";
import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types";

export interface IUsuario {
    id: number,
    dni: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    login: string,
    email: string,
    tipousuario: ITipoUsuario
}

export interface IUsuarioPage {
    content: IUsuario[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface IUsuario2Form {
    id: FormControl<number>;
    dni: FormControl<string>;
    nombre: FormControl<string>;
    apellido1: FormControl<string>;
    apellido2: FormControl<string>;
    login: FormControl<string>;
    email: FormControl<string>;
    id_tipousuario: FormControl<number>;
}

export interface IUsuario2Send {
    id: number;
    dni: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    login: string;
    email: string;
    tipousuario: IEntity;
}