import type {
  ValidarDniRequest,
  ValidarDniResponse,
} from '../types/registro'

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

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