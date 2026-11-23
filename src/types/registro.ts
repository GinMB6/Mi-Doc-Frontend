
export type EstadoRegistro =
  | 'CUENTA_ACTIVA'
  | 'CLIENTE_PREEXISTENTE'
  | 'CLIENTE_NUEVO'

export interface ValidarDniRequest {
  dni: string
}

export interface ValidarDniResponse {
  mensaje: string
}

export interface DatosClienteRegistro {
  dni: string
  nombres: string
  apellidos: string
  telefono: string
  correo: string
  fechaNacimiento: string
}

export interface EnviarCodigoRequest {
  correo: string
  contrasena: string
}

export interface EnviarCodigoResponse {
  mensaje: string
}

export interface VerificarCodigoRequest {
  correo: string
  codigo: string
}

export interface VerificarCodigoResponse {
  verificado: boolean
  mensaje: string
  accessToken: string
}

export interface CrearCuentaRequest {
  accessToken: string
  datosCliente: DatosClienteRegistro
}

export interface CrearCuentaResponse {
  creado: boolean
  mensaje: string
}
