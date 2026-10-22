import { useState } from 'react'
import {
  CalendarDays,
  Check,
  CheckCircle2,
  MapPin,
  UserRound,
  X,
  XCircle,
} from 'lucide-react'

import DoctorLayout from '../components/DoctorLayout'
import '../styles/DoctorPages.css'

type EstadoCita =
  | 'AGENDADA'
  | 'ATENDIDA'
  | 'CANCELADA'
  | 'NO_ASISTIO'

type CitaDoctorDemo = {
  id: number
  paciente: string
  dni: string
  correo: string
  especialidad: string
  sede: string
  fecha: string
  hora: string
  duracion: number
  estado: EstadoCita
}

const citasDemo: CitaDoctorDemo[] = [
  {
    id: 1,
    paciente: 'María Fernanda López',
    dni: '74859621',
    correo: 'maria.lopez@email.com',
    especialidad: 'Cardiología',
    sede: 'Pro',
    fecha: '22/10/2026',
    hora: '10:30 a. m.',
    duracion: 30,
    estado: 'AGENDADA',
  },
  {
    id: 2,
    paciente: 'Diego Salazar',
    dni: '70541236',
    correo: 'diego.salazar@email.com',
    especialidad: 'Cardiología',
    sede: 'Pro',
    fecha: '22/10/2026',
    hora: '12:00 p. m.',
    duracion: 30,
    estado: 'AGENDADA',
  },
  {
    id: 3,
    paciente: 'Lucía Torres',
    dni: '71652348',
    correo: 'lucia.torres@email.com',
    especialidad: 'Cardiología',
    sede: 'Pro',
    fecha: '22/10/2026',
    hora: '08:00 a. m.',
    duracion: 30,
    estado: 'ATENDIDA',
  },
  {
    id: 4,
    paciente: 'Pedro Ramos',
    dni: '72345681',
    correo: 'pedro.ramos@email.com',
    especialidad: 'Cardiología',
    sede: 'Izaguirre',
    fecha: '21/10/2026',
    hora: '04:00 p. m.',
    duracion: 30,
    estado: 'NO_ASISTIO',
  },
]

function DoctorCitasPage() {
  const [filtro, setFiltro] = useState<
    'PROXIMAS' | 'HISTORIAL'
  >('PROXIMAS')

  const [citaSeleccionada, setCitaSeleccionada] =
    useState<CitaDoctorDemo | null>(null)

  const citasFiltradas = citasDemo.filter((cita) =>
    filtro === 'PROXIMAS'
      ? cita.estado === 'AGENDADA'
      : cita.estado !== 'AGENDADA',
  )

  const registrarEstado = (
    nuevoEstado: 'ATENDIDA' | 'NO_ASISTIO',
  ) => {
    /*
     * TEMPORAL VISUAL.
     * Flask realizará la actualización real en la BD.
     */
    console.log(
      'Actualizar cita:',
      citaSeleccionada?.id,
      nuevoEstado,
    )

    setCitaSeleccionada(null)
  }

  return (
    <DoctorLayout>
      <div className="doctor-page">
        <section className="doctor-heading">
          <div>
            <span>Atenciones</span>
            <h1>Mis citas</h1>
            <p>
              Consulta tus próximas atenciones y el historial
              de citas asignadas.
            </p>
          </div>

          <div className="doctor-heading-icon">
            <CalendarDays size={27} />
          </div>
        </section>

        <div className="doctor-tabs">
          <button
            type="button"
            className={
              filtro === 'PROXIMAS' ? 'active' : ''
            }
            onClick={() => setFiltro('PROXIMAS')}
          >
            Próximas
          </button>

          <button
            type="button"
            className={
              filtro === 'HISTORIAL' ? 'active' : ''
            }
            onClick={() => setFiltro('HISTORIAL')}
          >
            Historial
          </button>
        </div>

        <section className="doctor-section-card">
          <div className="doctor-citas-list">
            {citasFiltradas.map((cita) => (
              <article
                key={cita.id}
                className="doctor-cita-row"
              >
                <div className="doctor-patient-avatar">
                  <UserRound size={21} />
                </div>

                <div className="doctor-cita-patient">
                  <strong>{cita.paciente}</strong>
                  <span>{cita.especialidad}</span>
                </div>

                <div className="doctor-cita-detail">
                  <CalendarDays size={14} />
                  <span>
                    {cita.fecha}
                    <strong>{cita.hora}</strong>
                  </span>
                </div>

                <div className="doctor-cita-detail">
                  <MapPin size={14} />
                  <span>Sede {cita.sede}</span>
                </div>

                <span
                  className={`doctor-status ${cita.estado.toLowerCase()}`}
                >
                  {cita.estado === 'AGENDADA'
                    ? 'Pendiente'
                    : cita.estado === 'ATENDIDA'
                      ? 'Atendida'
                      : cita.estado === 'NO_ASISTIO'
                        ? 'No asistió'
                        : 'Cancelada'}
                </span>

                <button
                  type="button"
                  className="doctor-view-button"
                  onClick={() =>
                    setCitaSeleccionada(cita)
                  }
                >
                  Ver
                </button>
              </article>
            ))}
          </div>
        </section>

        {citaSeleccionada && (
          <div className="doctor-modal-backdrop">
            <section className="doctor-modal">
              <div className="doctor-modal-heading">
                <div>
                  <span>Detalle de cita</span>
                  <h2>{citaSeleccionada.paciente}</h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCitaSeleccionada(null)
                  }
                  aria-label="Cerrar"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="doctor-modal-grid">
                <div>
                  <span>DNI</span>
                  <strong>
                    {citaSeleccionada.dni}
                  </strong>
                </div>

                <div>
                  <span>Correo</span>
                  <strong>
                    {citaSeleccionada.correo}
                  </strong>
                </div>

                <div>
                  <span>Especialidad</span>
                  <strong>
                    {citaSeleccionada.especialidad}
                  </strong>
                </div>

                <div>
                  <span>Sede</span>
                  <strong>
                    Sede {citaSeleccionada.sede}
                  </strong>
                </div>

                <div>
                  <span>Fecha</span>
                  <strong>
                    {citaSeleccionada.fecha}
                  </strong>
                </div>

                <div>
                  <span>Hora</span>
                  <strong>
                    {citaSeleccionada.hora}
                  </strong>
                </div>

                <div>
                  <span>Duración</span>
                  <strong>
                    {citaSeleccionada.duracion} minutos
                  </strong>
                </div>

                <div>
                  <span>Estado</span>
                  <strong>
                    {citaSeleccionada.estado}
                  </strong>
                </div>
              </div>

              {citaSeleccionada.estado === 'AGENDADA' && (
                <div className="doctor-attention-actions">
                  <div>
                    <span>Registrar atención</span>
                    <p>
                      Selecciona el resultado de esta cita.
                    </p>
                  </div>

                  <div className="doctor-attention-buttons">
                    <button
                      type="button"
                      className="attended"
                      onClick={() =>
                        registrarEstado('ATENDIDA')
                      }
                    >
                      <CheckCircle2 size={17} />
                      Marcar como atendida
                    </button>

                    <button
                      type="button"
                      className="missed"
                      onClick={() =>
                        registrarEstado('NO_ASISTIO')
                      }
                    >
                      <XCircle size={17} />
                      Marcar como no asistió
                    </button>
                  </div>
                </div>
              )}

              {citaSeleccionada.estado !== 'AGENDADA' && (
                <div className="doctor-history-notice">
                  <Check size={17} />
                  Esta cita ya forma parte del historial.
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </DoctorLayout>
  )
}

export default DoctorCitasPage