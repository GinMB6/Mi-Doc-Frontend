import { useState } from 'react'
import { CalendarDays, MapPin, UserRound } from 'lucide-react'

import DoctorLayout from '../components/DoctorLayout'
import DetalleCitaDoctor from '../components/DetalleCitaDoctor'
import { AvisoConsultaDoctor, EstadoCitaDoctor } from '../components/EstadoDoctor'
import { formatearFechaDoctor, formatearHoraDoctor } from '../fechasDoctor'
import { useDatosDoctor } from '../useDatosDoctor'
import type { CitaDoctor, RespuestaCitasDoctor } from '../../../types/doctor'
import '../styles/DoctorPages.css'

function DoctorCitasPage() {
  const [pestana, cambiarPestana] = useState<'PENDIENTES' | 'HISTORIAL'>('PENDIENTES')
  const [seleccionada, seleccionar] = useState<CitaDoctor | null>(null)
  const [aviso, mostrarAviso] = useState<{ mensaje: string; error: boolean }>()
  const pendientes = pestana === 'PENDIENTES'
  const consulta = useDatosDoctor<RespuestaCitasDoctor>(pendientes ? '/citas?estado=AGENDADA' : '/citas')
  const citas = consulta.datos?.citas ?? []
  const visibles = pendientes ? citas : citas.filter((cita) => cita.estado !== 'AGENDADA').reverse()

  const actualizar = (mensaje: string, error: boolean) => {
    seleccionar(null)
    mostrarAviso({ mensaje, error })
    consulta.recargar()
  }

  return (
    <DoctorLayout>
      <div className="doctor-page">
        <section className="doctor-heading">
          <div>
            <h1>Mis citas</h1>
            <p>Revisa las citas pendientes y el historial.</p>
          </div>
          <div className="doctor-heading-icon"><CalendarDays size={27} /></div>
        </section>

        <div className="doctor-tabs" aria-label="Tipo de cita">
          <button
            type="button"
            aria-pressed={pendientes}
            className={pendientes ? 'active' : ''}
            onClick={() => cambiarPestana('PENDIENTES')}
          >
            Pendientes
          </button>
          <button
            type="button"
            aria-pressed={!pendientes}
            className={pendientes ? '' : 'active'}
            onClick={() => cambiarPestana('HISTORIAL')}
          >
            Historial
          </button>
        </div>

        {aviso && (
          <p className="doctor-feedback" role={aviso.error ? 'alert' : 'status'}>{aviso.mensaje}</p>
        )}

        <section className="doctor-section-card" aria-label={pendientes ? 'Citas pendientes' : 'Historial'}>
          <AvisoConsultaDoctor
            {...consulta}
            vacio={visibles.length === 0 ? 'No hay citas en esta sección.' : undefined}
          />
          <div className="doctor-citas-list">
            {visibles.map((cita) => (
              <article key={cita.id_cita} className="doctor-cita-row">
                <div className="doctor-patient-avatar"><UserRound size={21} /></div>
                <div className="doctor-cita-patient">
                  <strong>{cita.paciente}</strong>
                  <span>{cita.especialidad}</span>
                </div>
                <div className="doctor-cita-detail">
                  <CalendarDays size={14} />
                  <time dateTime={`${cita.fecha}T${cita.hora}-05:00`}>
                    {formatearFechaDoctor(cita.fecha)}
                    <strong>{formatearHoraDoctor(cita.hora)}</strong>
                  </time>
                </div>
                <div className="doctor-cita-detail">
                  <MapPin size={14} />
                  {cita.sede}
                </div>
                <EstadoCitaDoctor estado={cita.estado} />
                <button
                  type="button"
                  className="doctor-view-button"
                  aria-label={`Ver cita de ${cita.paciente} a las ${formatearHoraDoctor(cita.hora)}`}
                  onClick={() => {
                    mostrarAviso(undefined)
                    seleccionar(cita)
                  }}
                >
                  Ver cita
                </button>
              </article>
            ))}
          </div>
        </section>

        {seleccionada && (
          <DetalleCitaDoctor
            cita={seleccionada}
            cerrar={() => seleccionar(null)}
            actualizar={actualizar}
          />
        )}
      </div>
    </DoctorLayout>
  )
}

export default DoctorCitasPage
