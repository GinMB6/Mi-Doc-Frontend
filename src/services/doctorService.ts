import type { ResultadoCita } from '../types/doctor'

const urlApi = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/+$/, '')

export class ErrorDoctor extends Error {
  readonly estadoHttp: number

  constructor(estadoHttp: number, mensaje: string) {
    super(mensaje)
    this.estadoHttp = estadoHttp
  }
}

async function solicitarDoctor<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const respuesta = await fetch(`${urlApi}/api/doctores${ruta}`, {
    ...opciones,
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...opciones?.headers,
    },
  })
  const datos = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    const mensaje = typeof datos?.error === 'string' ? datos.error : ''
    throw new ErrorDoctor(respuesta.status, mensaje || 'El servidor no pudo completar la solicitud.')
  }
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    throw new ErrorDoctor(502, 'El servidor devolvió una respuesta inválida.')
  }
  return datos as T
}

export function consultarDoctor<T>(ruta: string, signal: AbortSignal): Promise<T> {
  return solicitarDoctor<T>(ruta, { signal })
}

export async function registrarResultadoDoctor(idCita: string, estado: ResultadoCita) {
  const resultado = await solicitarDoctor<{ id_cita: string; estado: string; persistido: boolean }>(
    `/citas/${encodeURIComponent(idCita)}/estado`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    },
  )
  if (resultado.persistido !== true || resultado.id_cita !== idCita || resultado.estado !== estado) {
    throw new ErrorDoctor(502, 'El servidor no confirmó el registro de la cita.')
  }
}
