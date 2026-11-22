import { useState } from 'react'
import { ArrowRight, CalendarCheck, CalendarDays, CheckCircle2, Clock3, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import DoctorLayout from '../components/DoctorLayout'
import { AvisoConsultaDoctor } from '../components/EstadoDoctor'
import { formatearFechaDoctor, formatearHoraDoctor, inicioCitaDoctor, obtenerFechaLima } from '../fechasDoctor'
import { useDatosDoctor } from '../useDatosDoctor'
import type { AgendaDoctor } from '../../../types/doctor'
import '../styles/DoctorPages.css'

function DoctorInicioPage() {
  const consulta = useDatosDoctor<AgendaDoctor>('/agenda')
  const citas = consulta.datos?.citas ?? []
  const [ahora] = useState(Date.now)
  const siguiente = citas.find((cita) =>
    cita.estado === 'AGENDADA' && inicioCitaDoctor(cita.fecha, cita.hora) >= ahora,
  )

  return (
    <DoctorLayout>
      <div className="doctor-page">
        <section className="doctor-heading">
          <div>
            <h1>Inicio</h1>
            <p>Resumen de tus citas de hoy.</p>
          </div>
          <div className="doctor-date">
            <CalendarDays size={18} />
            {formatearFechaDoctor(consulta.datos?.fecha ?? obtenerFechaLima())}
          </div>
        </section>

        <AvisoConsultaDoctor {...consulta} />

        {consulta.datos && (
          <>
            <section className="doctor-summary-grid" aria-label="Resumen de hoy">
              <article className="doctor-summary-card">
                <div className="doctor-summary-icon"><CalendarCheck size={20} /></div>
                <div><span>Citas de hoy</span><strong>{consulta.datos.total}</strong></div>
              </article>
              <article className="doctor-summary-card">
                <div className="doctor-summary-icon"><Clock3 size={20} /></div>
                <div>
                  <span>Próxima cita</span>
                  <strong>{siguiente ? formatearHoraDoctor(siguiente.hora) : 'Sin próximas citas'}</strong>
                </div>
              </article>
              <article className="doctor-summary-card">
                <div className="doctor-summary-icon"><CheckCircle2 size={20} /></div>
                <div>
                  <span>Atendidas hoy</span>
                  <strong>{citas.filter((cita) => cita.estado === 'ATENDIDA').length}</strong>
                </div>
              </article>
            </section>

            {siguiente && (
              <section className="doctor-section-card">
                <div className="doctor-section-heading">
                  <h2>Tu próxima cita</h2>
                  <Clock3 size={21} />
                </div>
                <div className="doctor-next-appointment">
                  <div className="doctor-patient-avatar"><UserRound size={23} /></div>
                  <div className="doctor-next-patient">
                    <span>{formatearHoraDoctor(siguiente.hora)}</span>
                    <strong>{siguiente.paciente}</strong>
                    <p>{siguiente.especialidad} · {siguiente.sede}</p>
                  </div>
                  <Link className="doctor-view-button" to="/doctor/citas">
                    Ver citas <ArrowRight size={15} />
                  </Link>
                </div>
              </section>
            )}
          </>
        )}

        <section className="doctor-section-card">
          <div className="doctor-section-heading"><h2>Accesos rápidos</h2></div>
          <div className="doctor-quick-grid">
            <Link to="/doctor/agenda">
              <CalendarDays size={22} />
              <div><strong>Mi agenda</strong><span>Consulta tus citas por día</span></div>
              <ArrowRight size={17} />
            </Link>
            <Link to="/doctor/citas">
              <CalendarCheck size={22} />
              <div><strong>Mis citas</strong><span>Revisa citas pendientes e historial</span></div>
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </DoctorLayout>
  )
}

export default DoctorInicioPage
