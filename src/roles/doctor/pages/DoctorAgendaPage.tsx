import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  UserRound,
} from 'lucide-react'

import DoctorLayout from '../components/DoctorLayout'
import '../styles/DoctorPages.css'

const agendaDemo = [
  {
    hora: '08:00 a. m.',
    paciente: 'Lucía Torres',
    especialidad: 'Cardiología',
    sede: 'Pro',
  },
  {
    hora: '09:30 a. m.',
    paciente: 'Diego Salazar',
    especialidad: 'Cardiología',
    sede: 'Pro',
  },
  {
    hora: '10:30 a. m.',
    paciente: 'María Fernanda López',
    especialidad: 'Cardiología',
    sede: 'Pro',
  },
  {
    hora: '12:00 p. m.',
    paciente: 'Ana García',
    especialidad: 'Cardiología',
    sede: 'Izaguirre',
  },
  {
    hora: '03:00 p. m.',
    paciente: 'José Mendoza',
    especialidad: 'Cardiología',
    sede: 'Izaguirre',
  },
]

function DoctorAgendaPage() {
  return (
    <DoctorLayout>
      <div className="doctor-page">
        <section className="doctor-heading">
          <div>
            <span>Agenda médica</span>
            <h1>Mi agenda</h1>
            <p>
              Consulta las citas que tienes asignadas según
              fecha y horario.
            </p>
          </div>

          <div className="doctor-heading-icon">
            <CalendarDays size={27} />
          </div>
        </section>

        <section className="doctor-section-card">
          <div className="agenda-toolbar">
            <button type="button" aria-label="Día anterior">
              <ChevronLeft size={18} />
            </button>

            <div>
              <span>Fecha seleccionada</span>
              <strong>Jueves, 22 de octubre de 2026</strong>
            </div>

            <button type="button" aria-label="Día siguiente">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="agenda-list">
            {agendaDemo.map((cita) => (
              <article
                key={`${cita.hora}-${cita.paciente}`}
                className="agenda-item"
              >
                <div className="agenda-time">
                  <Clock3 size={16} />
                  <strong>{cita.hora}</strong>
                </div>

                <div className="agenda-patient">
                  <div className="doctor-patient-avatar small">
                    <UserRound size={19} />
                  </div>

                  <div>
                    <strong>{cita.paciente}</strong>
                    <span>{cita.especialidad}</span>
                  </div>
                </div>

                <div className="agenda-location">
                  <MapPin size={15} />
                  Sede {cita.sede}
                </div>

                <span className="doctor-status pending">
                  Pendiente
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DoctorLayout>
  )
}

export default DoctorAgendaPage