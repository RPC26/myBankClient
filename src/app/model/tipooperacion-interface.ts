
export interface ITipooperacion {
    id: number,
    nombre: string
}

export interface TipooperacionResponse{
    content:          ITipooperacion[];
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    numberOfElements: number;
    number:           number;
    first:            boolean;
    size:             number;
    empty:            boolean;
}