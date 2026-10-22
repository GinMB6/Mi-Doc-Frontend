import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Stethoscope,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import ClienteLayout from '../components/ClienteLayout'
import '../styles/ClienteInicioPage.css'

function ClienteInicioPage() {
  const navigate = useNavigate()

  return (
    <ClienteLayout>
      <div className="cliente-inicio">
        <section className="cliente-welcome">
          <div>
            <span className="cliente-welcome-label">
              Portal del cliente
            </span>

            <h1>Hola, bienvenido a MiDoc</h1>

            <p>
              Consulta el estado de tus consultas médicas,
              revisa tus citas y encuentra disponibilidad
              para agendar tu próxima atención.
            </p>
          </div>

          <div className="cliente-welcome-icon">
            <Stethoscope size={32} />
          </div>
        </section>

        <section className="cliente-summary-grid">
          <article className="cliente-summary-card">
            <div className="cliente-summary-icon">
              <Stethoscope size={22} />
            </div>

            <div>
              <span>Consultas disponibles</span>
              <strong>—</strong>
              <small>
                Consultas adquiridas pendientes de agendar
              </small>
            </div>
          </article>

          <article className="cliente-summary-card">
            <div className="cliente-summary-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span>Próxima cita</span>
              <strong>—</strong>
              <small>
                Revisa tus próximas atenciones médicas
              </small>
            </div>
          </article>

          <article className="cliente-summary-card">
            <div className="cliente-summary-icon">
              <Clock3 size={22} />
            </div>

            <div>
              <span>Por vencer</span>
              <strong>—</strong>
              <small>
                Consultas próximas a vencer
              </small>
            </div>
          </article>
        </section>

        <div className="cliente-dashboard-grid">
          <section className="cliente-dashboard-card cliente-next-card">
            <div className="cliente-card-heading">
              <div>
                <span>Atención médica</span>
                <h2>Tu próxima cita</h2>
              </div>

              <CalendarDays size={21} />
            </div>

            <div className="cliente-empty-state">
              <div className="cliente-empty-icon">
                <CalendarDays size={27} />
              </div>

              <h3>Aún no tienes una cita próxima</h3>

              <p>
                Cuando agendes una consulta, podrás revisar
                aquí la fecha y los datos de tu atención.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate('/cliente/consultas')
                }
              >
                Revisar mis consultas
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          <section className="cliente-dashboard-card">
            <div className="cliente-card-heading">
              <div>
                <span>Accesos rápidos</span>
                <h2>¿Qué deseas hacer?</h2>
              </div>
            </div>

            <div className="cliente-quick-actions">
              <button
                type="button"
                onClick={() =>
                  navigate('/cliente/consultas')
                }
              >
                <div className="cliente-action-icon">
                  <Stethoscope size={20} />
                </div>

                <div>
                  <strong>Mis consultas</strong>
                  <span>
                    Revisa tus consultas adquiridas
                  </span>
                </div>

                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate('/cliente/disponibilidad')
                }
              >
                <div className="cliente-action-icon">
                  <Clock3 size={20} />
                </div>

                <div>
                  <strong>
                    Disponibilidad médica
                  </strong>
                  <span>
                    Consulta horarios disponibles
                  </span>
                </div>

                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate('/cliente/citas')
                }
              >
                <div className="cliente-action-icon">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <strong>Mis citas</strong>
                  <span>
                    Consulta tus citas programadas
                  </span>
                </div>

                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        </div>

        <section className="cliente-information">
          <CheckCircle2 size={20} />

          <div>
            <strong>Recuerda</strong>

            <p>
              Tus consultas adquiridas tienen una vigencia
              determinada. Revisa su estado antes de
              programar o reprogramar una cita.
            </p>
          </div>
        </section>
      </div>
    </ClienteLayout>
  )
}

export default ClienteInicioPage