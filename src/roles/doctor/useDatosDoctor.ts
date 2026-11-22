import { useEffect, useState } from 'react'
import { consultarDoctor, ErrorDoctor } from '../../services/doctorService'

type Respuesta<T> =
  | { ruta: string; revision: number; datos: T; error?: never }
  | { ruta: string; revision: number; datos?: never; error: ErrorDoctor }

export function useDatosDoctor<T>(ruta: string) {
  const [respuesta, actualizarRespuesta] = useState<Respuesta<T>>()
  const [revision, cambiarRevision] = useState(0)

  useEffect(() => {
    const controlador = new AbortController()
    consultarDoctor<T>(ruta, controlador.signal)
      .then((datos) => {
        if (!controlador.signal.aborted) actualizarRespuesta({ ruta, revision, datos })
      })
      .catch((causa: unknown) => {
        if (controlador.signal.aborted) return
        const error = causa instanceof ErrorDoctor
          ? causa
          : new ErrorDoctor(0, 'No se pudo contactar con MiDoc. Intenta nuevamente.')
        actualizarRespuesta({ ruta, revision, error })
      })

    return () => controlador.abort()
  }, [ruta, revision])

  const vigente = respuesta?.ruta === ruta && respuesta.revision === revision ? respuesta : undefined
  return {
    cargando: !vigente,
    datos: vigente?.datos,
    error: vigente?.error,
    recargar: () => cambiarRevision((anterior) => anterior + 1),
  }
}
