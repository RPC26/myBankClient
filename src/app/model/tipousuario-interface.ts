export interface ITipoUsuario {
    id: number,
    nombre: string
}

export interface TipoUsuarioResponse{
    content:          ITipoUsuario[];
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    numberOfElements: number;
    number:           number;
    first:            boolean;
    size:             number;
    empty:            boolean;
}