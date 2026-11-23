import { useEffect, useId, useRef, useState } from 'react'
import { CheckCircle2, X, XCircle } from 'lucide-react'

import { ErrorDoctor, registrarResultadoDoctor } from '../../../services/doctorService'
import { nombresEstadoCita, type CitaDoctor, type ResultadoCita } from '../../../types/doctor'
import { formatearFechaDoctor, formatearHoraDoctor, inicioCitaDoctor } from '../fechasDoctor'
import { EstadoCitaDoctor } from './EstadoDoctor'
import '../styles/DetalleCitaDoctor.css'

type DetalleCitaDoctorProps = {
  cita: CitaDoctor
  cerrar: () => void
  actualizar: (mensaje: string, error: boolean) => void
}

function DetalleCitaDoctor({ cita, cerrar, actualizar }: DetalleCitaDoctorProps) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const botonConfirmar = useRef<HTMLButtonElement>(null)
  const titulo = useId()
  const [resultado, elegirResultado] = useState<ResultadoCita>()
  const [guardando, cambiarGuardando] = useState(false)
  const [error, mostrarError] = useState('')
  const [apertura] = useState(Date.now)
  const puedeRegistrar = cita.estado === 'AGENDADA' && inicioCitaDoctor(cita.fecha, cita.hora) <= apertura

  useEffect(() => {
    const elemento = dialogo.current
    elemento?.showModal()
    return () => elemento?.close()
  }, [])

  useEffect(() => {
    if (resultado) botonConfirmar.current?.focus()
  }, [resultado])

  const confirmar = async () => {
    if (!resultado || guardando) return
    cambiarGuardando(true)
    mostrarError('')
    try {
      await registrarResultadoDoctor(cita.id_cita, resultado)
      actualizar(`Resultado guardado: ${nombresEstadoCita[resultado]}.`, false)
    } catch (causa) {
      const mensaje = causa instanceof ErrorDoctor
        ? causa.message
        : 'No se pudo confirmar el resultado. Puedes reintentar.'
      if (causa instanceof ErrorDoctor && [401, 403, 404, 409].includes(causa.estadoHttp)) {
        actualizar(mensaje, true)
      } else {
        mostrarError(mensaje)
      }
    } finally {
      cambiarGuardando(false)
    }
  }

  return (
    <dialog
      ref={dialogo}
      className="doctor-modal"
      aria-labelledby={titulo}
      onCancel={(evento) => {
        evento.preventDefault()
        if (!guardando) cerrar()
      }}
    >
      <div className="doctor-modal-heading">
        <div>
          <span>Detalle de cita</span>
          <h2 id={titulo}>{cita.paciente}</h2>
        </div>
        <button type="button" aria-label="Cerrar detalle" onClick={cerrar} disabled={guardando}>
          <X size={19} />
        </button>
      </div>

      <div className="doctor-modal-grid">
        <div><span>Especialidad</span><strong>{cita.especialidad}</strong></div>
        <div><span>Sede</span><strong>{cita.sede}</strong></div>
        <div><span>Fecha</span><strong>{formatearFechaDoctor(cita.fecha)}</strong></div>
        <div><span>Hora</span><strong>{formatearHoraDoctor(cita.hora)}</strong></div>
        <div><span>Duración</span><strong>{cita.duracion_minutos} minutos</strong></div>
        <div><span>Estado</span><EstadoCitaDoctor estado={cita.estado} /></div>
      </div>

      {puedeRegistrar && (
        <div className="doctor-attention-actions">
          {resultado ? (
            <>
              <p>Confirma el resultado de la cita como «{nombresEstadoCita[resultado]}».</p>
              <div className="doctor-attention-buttons">
                <button
                  ref={botonConfirmar}
                  type="button"
                  className="attended"
                  onClick={confirmar}
                  disabled={guardando}
                >
                  {guardando ? 'Guardando…' : 'Confirmar resultado'}
                </button>
                <button type="button" onClick={() => elegirResultado(undefined)} disabled={guardando}>
                  Volver
                </button>
              </div>
            </>
          ) : (
            <div className="doctor-attention-buttons">
              <button type="button" className="attended" onClick={() => elegirResultado('ATENDIDA')}>
                <CheckCircle2 size={17} /> Marcar como atendida
              </button>
              <button type="button" className="missed" onClick={() => elegirResultado('NO_ASISTIO')}>
                <XCircle size={17} /> Marcar como no asistió
              </button>
            </div>
          )}
        </div>
      )}

      {!puedeRegistrar && cita.estado === 'AGENDADA' && (
        <p className="doctor-feedback">El resultado se puede registrar desde el inicio de la cita.</p>
      )}
      {error && <p className="doctor-feedback" role="alert">{error}</p>}
    </dialog>
  )
}

export default DetalleCitaDoctor
