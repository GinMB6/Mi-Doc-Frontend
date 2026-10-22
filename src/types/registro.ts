export type EstadoRegistro =
  | 'CUENTA_ACTIVA'
  | 'CLIENTE_PREEXISTENTE'
  | 'CLIENTE_NUEVO'

export interface ValidarDniRequest {
  dni: string
}

export interface ValidarDniResponse {
  estado: EstadoRegistro
}