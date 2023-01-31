export interface ISaldoUsuario {
    cuentasUsuario: ISaldoCuenta[]
}

export interface ISaldoCuenta {
    idCuenta: number
    saldoReal: number
    saldoBeneficio: number
}