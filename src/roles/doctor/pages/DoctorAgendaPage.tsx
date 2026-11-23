import { useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, UserRound } from 'lucide-react'

import DoctorLayout from '../components/DoctorLayout'
import { AvisoConsultaDoctor, EstadoCitaDoctor } from '../components/EstadoDoctor'
import { desplazarFechaDoctor, formatearFechaDoctor, formatearHoraDoctor, obtenerFechaLima } from '../fechasDoctor'
import { useDatosDoctor } from '../useDatosDoctor'
import type { AgendaDoctor } from '../../../types/doctor'
import '../styles/DoctorPages.css'

function DoctorAgendaPage() {
  const [fecha, cambiarFecha] = useState(obtenerFechaLima)
  const consulta = useDatosDoctor<AgendaDoctor>(`/agenda?fecha=${fecha}`)
  const citas = consulta.datos?.citas ?? []

  return (
    <DoctorLayout>
      <div className="doctor-page">
        <section className="doctor-heading">
          <div>
            <h1>Mi agenda</h1>
            <p>Citas asignadas por día.</p>
          </div>
          <div className="doctor-heading-icon"><CalendarDays size={27} /></div>
        </section>

        <section className="doctor-section-card" aria-label="Agenda del día">
          <div className="agenda-toolbar">
            <button
              type="button"
              aria-label="Día anterior"
              onClick={() => cambiarFecha((dia) => desplazarFechaDoctor(dia, -1))}
            >
              <ChevronLeft size={18} />
            </button>

            <div>
              <label htmlFor="fecha-agenda-doctor">Fecha de la agenda</label>
              <input
                id="fecha-agenda-doctor"
                type="date"
                value={fecha}
                min="0001-01-01"
                max="9999-12-31"
                onChange={(evento) => {
                  const nuevaFecha = evento.currentTarget.value
                  if (/^\d{4}-\d{2}-\d{2}$/.test(nuevaFecha)) cambiarFecha(nuevaFecha)
                }}
              />
              <strong>{formatearFechaDoctor(fecha)}</strong>
            </div>

            <button
              type="button"
              aria-label="Día siguiente"
              onClick={() => cambiarFecha((dia) => desplazarFechaDoctor(dia, 1))}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <AvisoConsultaDoctor
            {...consulta}
            vacio={citas.length === 0 ? 'No tienes citas asignadas para este día.' : undefined}
          />

          <div className="agenda-list">
            {citas.map((cita) => (
              <article key={cita.id_cita} className="agenda-item">
                <div className="agenda-time">
                  <Clock3 size={16} />
                  <time dateTime={cita.hora}>{formatearHoraDoctor(cita.hora)}</time>
                </div>
                <div className="agenda-patient">
                  <div className="doctor-patient-avatar small"><UserRound size={19} /></div>
                  <div>
                    <strong>{cita.paciente}</strong>
                    <span>{cita.especialidad}</span>
                  </div>
                </div>
                <div className="agenda-location">
                  <MapPin size={15} />
                  {cita.sede}
                </div>
                <EstadoCitaDoctor estado={cita.estado} />
              </article>
            ))}
          </div>
        </section>
      </div>
    </DoctorLayout>
  )
}

export default DoctorAgendaPage
