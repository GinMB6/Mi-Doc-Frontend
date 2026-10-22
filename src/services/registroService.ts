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

/* validamos numero dni */

export async function validarDniRegistro(
  datos: ValidarDniRequest
): Promise<ValidarDniResponse> {
  const respuesta = await fetch(
    `${API_URL}/api/auth/registro/validar-dni`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(datos),
    }
  )

  if (!respuesta.ok) {
    throw new Error(
      'No se pudo validar el DNI. Inténtalo nuevamente.'
    )
  }

  const resultado =
    (await respuesta.json()) as ValidarDniResponse

  return resultado
}

/* el envio de codigo para el correo */

export async function enviarCodigoVerificacion(
  datos: EnviarCodigoRequest
): Promise<EnviarCodigoResponse> {
  const respuesta = await fetch(
    `${API_URL}/api/auth/registro/enviar-codigo`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(datos),
    }
  )

  if (!respuesta.ok) {
    throw new Error(
      'No se pudo enviar el código de verificación.'
    )
  }

  const resultado =
    (await respuesta.json()) as EnviarCodigoResponse

  return resultado
}

/* verificar codigo empieza aqui */

export async function verificarCodigoRegistro(
  datos: VerificarCodigoRequest
): Promise<VerificarCodigoResponse> {
  const respuesta = await fetch(
    `${API_URL}/api/auth/registro/verificar-codigo`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(datos),
    }
  )

  if (!respuesta.ok) {
    throw new Error(
      'No se pudo verificar el código.'
    )
  }

  const resultado =
    (await respuesta.json()) as VerificarCodigoResponse

  return resultado
}

export async function crearCuentaRegistro(
  datos: CrearCuentaRequest
): Promise<CrearCuentaResponse> {
  const respuesta = await fetch(
    `${API_URL}/api/auth/registro/crear-cuenta`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    }
  )

  if (!respuesta.ok) {
    throw new Error(
      'No se pudo crear la cuenta. Inténtalo nuevamente.'
    )
  }

  return (await respuesta.json()) as CrearCuentaResponse
}