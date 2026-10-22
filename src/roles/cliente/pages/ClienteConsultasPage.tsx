import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Search,
  Stethoscope,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import ClienteLayout from '../components/ClienteLayout'
import '../styles/ClienteConsultasPage.css'

function ClienteConsultasPage() {
  const navigate = useNavigate()

  return (
    <ClienteLayout>
      <div className="consultas-page">
        <section className="consultas-heading">
          <div>
            <span className="consultas-eyebrow">
              Mis consultas
            </span>

            <h1>Consultas adquiridas</h1>

            <p>
              Revisa tus consultas, su vigencia y el estado
              de tus citas médicas.
            </p>
          </div>

          <div className="consultas-heading-icon">
            <Stethoscope size={31} />
          </div>
        </section>

        <section className="consultas-filters">
          <div className="consultas-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Buscar consulta..."
            />
          </div>

          <select defaultValue="TODAS">
            <option value="TODAS">
              Todas las consultas
            </option>

            <option value="DISPONIBLE">
              Disponibles
            </option>

            <option value="AGENDADA">
              Agendadas
            </option>

            <option value="UTILIZADA">
              Utilizadas
            </option>

            <option value="VENCIDA">
              Vencidas
            </option>
          </select>
        </section>

        <section className="consultas-list">
          {/* ==========================================
              CASO 1: SIN ESPECIALIDAD Y SIN CITA
              DATOS TEMPORALES SOLO PARA EL FRONTEND
             ========================================== */}

          <article className="consulta-card">
            <div className="consulta-main">
              <div className="consulta-icon">
                <Stethoscope size={24} />
              </div>

              <div className="consulta-title">
                <div className="consulta-title-row">
                  <div>
                    <span className="consulta-number">
                      Consulta #001
                    </span>

                    <h2>
                      Especialidad por seleccionar
                    </h2>
                  </div>

                  <span className="consulta-status disponible">
                    <CheckCircle2 size={15} />
                    Disponible
                  </span>
                </div>

                <p>
                  Esta consulta aún no tiene una
                  especialidad seleccionada.
                </p>
              </div>
            </div>

            <div className="consulta-information-grid">
              <div className="consulta-information-item">
                <CalendarDays size={17} />

                <div>
                  <span>Adquirida</span>
                  <strong>15/10/2026</strong>
                </div>
              </div>

              <div className="consulta-information-item">
                <Clock3 size={17} />

                <div>
                  <span>Vigente hasta</span>
                  <strong>15/11/2026</strong>
                  <small>1 mes de vigencia</small>
                </div>
              </div>

              <div className="consulta-information-item">
                <CircleDollarSign size={17} />

                <div>
                  <span>Estado de pago</span>
                  <strong>Pagada</strong>
                </div>
              </div>

              <div className="consulta-information-item">
                <ArrowRight size={17} />

                <div>
                  <span>Reprogramaciones</span>
                  <strong>0 de 2</strong>
                </div>
              </div>
            </div>

            <div className="consulta-message">
              <div>
                <strong>
                  Primero elige tu especialidad
                </strong>

                <p>
                  Al agendar podrás seleccionar la
                  especialidad y posteriormente revisar
                  la disponibilidad médica.
                </p>
              </div>

              <div className="consulta-actions">
                <button
                  type="button"
                  className="consulta-secondary-button"
                  onClick={() =>
                    navigate('/cliente/consultas/001')
                  }
                >
                  Ver detalle
                </button>

                <button
                 type="button"
                  className="consulta-primary-button"
                  onClick={() =>
                   navigate('/cliente/disponibilidad?consulta=001')
                  }
                >
                  Agendar cita
               <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </article>

          {/* ==========================================
              CASO 2: CON ESPECIALIDAD, SIN CITA
              DATOS TEMPORALES SOLO PARA EL FRONTEND
             ========================================== */}

          <article className="consulta-card">
            <div className="consulta-main">
              <div className="consulta-icon">
                <Stethoscope size={24} />
              </div>

              <div className="consulta-title">
                <div className="consulta-title-row">
                  <div>
                    <span className="consulta-number">
                      Consulta #002
                    </span>

                    <h2>Dermatología</h2>
                  </div>

                  <span className="consulta-status disponible">
                    <CheckCircle2 size={15} />
                    Disponible
                  </span>
                </div>

                <p>
                  Tu especialidad ya está seleccionada.
                  Aún no tienes una cita programada.
                </p>
              </div>
            </div>

            <div className="consulta-information-grid">
              <div className="consulta-information-item">
                <CalendarDays size={17} />

                <div>
                  <span>Adquirida</span>
                  <strong>18/10/2026</strong>
                </div>
              </div>

              <div className="consulta-information-item">
                <Clock3 size={17} />

                <div>
                  <span>Vigente hasta</span>
                  <strong>18/11/2026</strong>
                  <small>1 mes de vigencia</small>
                </div>
              </div>

              <div className="consulta-information-item">
                <CircleDollarSign size={17} />

                <div>
                  <span>Estado de pago</span>
                  <strong>Pagada</strong>
                </div>
              </div>

              <div className="consulta-information-item">
                <ArrowRight size={17} />

                <div>
                  <span>Reprogramaciones</span>
                  <strong>0 de 2</strong>
                </div>
              </div>
            </div>

            <div className="consulta-message">
              <div>
                <strong>
                  Lista para programar
                </strong>

                <p>
                  Consulta la disponibilidad de
                  Dermatología y elige tu atención.
                </p>
              </div>

              <div className="consulta-actions">
                <button
                  type="button"
                  className="consulta-secondary-button"
                  onClick={() =>
                    navigate('/cliente/consultas/002')
                  }
                >
                  Ver detalle
                </button>

                <button
                  type="button"
                  className="consulta-primary-button"
                  onClick={() =>
                   navigate('/cliente/disponibilidad?consulta=002')
                 }
                >
                Agendar cita
                 <ArrowRight size={15} />
              </button>
              </div>
            </div>
          </article>

          {/* ==========================================
              CASO 3: CONSULTA CON CITA
              DATOS TEMPORALES SOLO PARA EL FRONTEND
             ========================================== */}

          <article className="consulta-card">
            <div className="consulta-main">
              <div className="consulta-icon">
                <CalendarDays size={24} />
              </div>

              <div className="consulta-title">
                <div className="consulta-title-row">
                  <div>
                    <span className="consulta-number">
                      Consulta #003
                    </span>

                    <h2>Cardiología</h2>
                  </div>

                  <span className="consulta-status agendada">
                    <CalendarDays size={15} />
                    Agendada
                  </span>
                </div>

                <p>
                  Esta consulta ya tiene una cita médica
                  programada.
                </p>
              </div>
            </div>

            <div className="consulta-information-grid">
              <div className="consulta-information-item">
                <CalendarDays size={17} />

                <div>
                  <span>Adquirida</span>
                  <strong>05/10/2026</strong>
                </div>
              </div>

              <div className="consulta-information-item">
                <Clock3 size={17} />

                <div>
                  <span>Vigente hasta</span>
                  <strong>05/11/2026</strong>
                  <small>1 mes de vigencia</small>
                </div>
              </div>

              <div className="consulta-information-item">
                <CircleDollarSign size={17} />

                <div>
                  <span>Estado de pago</span>
                  <strong>Pagada</strong>
                </div>
              </div>

              <div className="consulta-information-item">
                <ArrowRight size={17} />

                <div>
                  <span>Reprogramaciones</span>
                  <strong>1 de 2</strong>
                </div>
              </div>
            </div>

            <div className="consulta-appointment">
              <div className="consulta-appointment-header">
                <div>
                  <span>Próxima cita</span>
                  <h3>Cardiología</h3>
                </div>

                <CalendarDays size={20} />
              </div>

              <div className="consulta-appointment-data">
                <div>
                  <span>Médico</span>
                  <strong>Dr. Carlos Ramírez</strong>
                </div>

                <div>
                  <span>Sede</span>
                  <strong>Pro</strong>
                </div>

                <div>
                  <span>Fecha</span>
                  <strong>28/10/2026</strong>
                </div>

                <div>
                  <span>Horario</span>
                  <strong>10:30 a. m.</strong>
                </div>
              </div>
            </div>

            <div className="consulta-card-footer">
              <span className="consulta-reprogramacion-note">
                Te queda 1 reprogramación disponible
              </span>

              <div className="consulta-actions">
                <button
                  type="button"
                  className="consulta-secondary-button"
                  onClick={() =>
                    navigate('/cliente/consultas/003')
                  }
                >
                  Ver detalle
                </button>

                <button
                  type="button"
                  className="consulta-primary-button"
                >
                  Reprogramar
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </article>
        </section>
      </div>
    </ClienteLayout>
  )
}

export default ClienteConsultasPage