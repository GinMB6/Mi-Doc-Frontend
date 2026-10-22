export type EstadoRegistro =
  | 'CUENTA_ACTIVA'
  | 'CLIENTE_PREEXISTENTE'
  | 'CLIENTE_NUEVO'

export interface ValidarDniRequest {
  dni: string
}

export interface ValidarDniResponse {
  estado: EstadoRegistro

  /*
    Solo vendrá informado cuando el cliente
    ya exista previamente en MiDoc.
  */
  correoEnmascarado?: string
}

export interface DatosClienteRegistro {
  dni: string
  nombres: string
  apellidos: string
  telefono: string
  correo: string
  fechaNacimiento: string
}

/* =========================================================
   VERIFICACIÓN POR CORREO
   ========================================================= */

export interface EnviarCodigoRequest {
  dni: string

  /*
    Para un cliente NUEVO se enviará el correo
    que acaba de registrar.

    Para un cliente PREEXISTENTE no será necesario
    enviarlo desde React, porque Flask lo recuperará
    directamente de la BD.
  */
  correo?: string
}

export interface EnviarCodigoResponse {
  mensaje: string
  correoEnmascarado: string
}

export interface VerificarCodigoRequest {
  dni: string
  codigo: string
}

export interface VerificarCodigoResponse {
  verificado: boolean
  mensaje: string
}

/* =========================================================
   finalizar creacion cuenta
   ========================================================= */

export interface CrearCuentaRequest {
  dni: string
  contrasena: string
  datosCliente?: DatosClienteRegistro
}

export interface CrearCuentaResponse {
  creado: boolean
  mensaje: string
}