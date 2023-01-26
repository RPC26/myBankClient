
export interface ITipocuenta {
    id: number,
    porcentajebeneficio: number,
    nombre: string,
    maxnegativo: number,
}

export interface TipoCuentaResponse{
    content:          ITipocuenta[];
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    numberOfElements: number;
    number:           number;
    first:            boolean;
    size:             number;
    empty:            boolean;
}