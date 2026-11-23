
import type {
  CrearCuentaRequest,
  CrearCuentaResponse,
  EnviarCodigoRequest,
  EnviarCodigoResponse,
  ValidarDniRequest,
  ValidarDniResponse,
  VerificarCodigoRequest,
  VerificarCodigoResponse,
} from '../types/registro'

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

async function procesarRespuesta<T>(
  respuesta: Response
): Promise<T> {
  const resultado = await respuesta.json().catch(() => ({}))

  if (!respuesta.ok) {
    throw new Error(
      resultado.error ||
      resultado.mensaje ||
      'Ocurrió un error al comunicarse con MiDoc.'
    )
  }

  return resultado as T
}

async function post<T>(
  ruta: string,
  datos: unknown
): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })

  return procesarRespuesta<T>(respuesta)
}

// ==========================================
// VALIDAR DNI
// ==========================================

export async function validarDniRegistro(
  datos: ValidarDniRequest
): Promise<ValidarDniResponse> {
  return post<ValidarDniResponse>(
    '/api/auth/registro/validar-dni',
    datos
  )
}

// ==========================================
// INICIAR REGISTRO EN SUPABASE AUTH
// ==========================================

export async function enviarCodigoVerificacion(
  datos: EnviarCodigoRequest
): Promise<EnviarCodigoResponse> {
  return post<EnviarCodigoResponse>(
    '/api/auth/registro/enviar-codigo',
    datos
  )
}

// ==========================================
// VERIFICAR CORREO
// ==========================================

// Esta ruta permanece disponible por compatibilidad.
// El nuevo flujo confirmará el correo mediante
// el enlace enviado por Supabase.

export async function verificarCodigoRegistro(
  datos: VerificarCodigoRequest
): Promise<VerificarCodigoResponse> {
  return post<VerificarCodigoResponse>(
    '/api/auth/registro/verificar-codigo',
    datos
  )
}

// ==========================================
// CREAR PERFIL DEL CLIENTE
// ==========================================

export async function crearCuentaRegistro(
  datos: CrearCuentaRequest
): Promise<CrearCuentaResponse> {
  return post<CrearCuentaResponse>(
    '/api/auth/registro/crear-cuenta',
    datos
  )
}
