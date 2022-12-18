import { ITipoUsuario } from "./tipousuario-interface";

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