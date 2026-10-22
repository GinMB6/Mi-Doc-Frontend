import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import DoctorLayout from '../components/DoctorLayout'
import '../styles/DoctorPages.css'

function DoctorInicioPage() {
  const navigate = useNavigate()

  return (
    <DoctorLayout>
      <div className="doctor-page">
        <section className="doctor-heading">
          <div>
            <span>Portal médico</span>
            <h1>¡Buenos días, Dr. Carlos!</h1>
            <p>
              Aquí tienes un resumen de tus atenciones
              programadas para hoy.
            </p>
          </div>

          <div className="doctor-date">
            <CalendarDays size={18} />
            22 de octubre de 2026
          </div>
        </section>

        <section className="doctor-summary-grid">
          <article className="doctor-summary-card">
            <div className="doctor-summary-icon">
              <CalendarCheck size={20} />
            </div>

            <div>
              <span>Citas de hoy</span>
              <strong>5</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <div className="doctor-summary-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <span>Próxima cita</span>
              <strong>10:30 a. m.</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <div className="doctor-summary-icon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Atendidas hoy</span>
              <strong>2</strong>
            </div>
          </article>
        </section>

        <section className="doctor-section-card">
          <div className="doctor-section-heading">
            <div>
              <span>Siguiente atención</span>
              <h2>Tu próxima cita</h2>
            </div>

            <Clock3 size={21} />
          </div>

          <div className="doctor-next-appointment">
            <div className="doctor-patient-avatar">
              <UserRound size={23} />
            </div>

            <div className="doctor-next-patient">
              <span>10:30 a. m.</span>
              <strong>María Fernanda López</strong>
              <p>Consulta de Cardiología · Sede Pro</p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/doctor/citas')}
            >
              Ver citas
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <section className="doctor-section-card">
          <div className="doctor-section-heading">
            <div>
              <span>Navegación</span>
              <h2>Accesos rápidos</h2>
            </div>
          </div>

          <div className="doctor-quick-grid">
            <button
              type="button"
              onClick={() => navigate('/doctor/agenda')}
            >
              <CalendarDays size={22} />

              <div>
                <strong>Ver mi agenda</strong>
                <span>
                  Revisa tus citas asignadas por día
                </span>
              </div>

              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/doctor/citas')}
            >
              <CalendarCheck size={22} />

              <div>
                <strong>Mis citas</strong>
                <span>
                  Consulta próximas e historial
                </span>
              </div>

              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </div>
    </DoctorLayout>
  )
}

export default DoctorInicioPage