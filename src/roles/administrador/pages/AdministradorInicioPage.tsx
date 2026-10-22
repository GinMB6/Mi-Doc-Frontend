import {
  Activity,
  ArrowRight,
  CalendarDays,
  History,
  ShieldCheck,
  Stethoscope,
  UserCog,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdministradorLayout from '../components/AdministradorLayout'
import '../styles/AdministradorPages.css'

function AdministradorInicioPage() {
  const navigate = useNavigate()

  return (
    <AdministradorLayout>
      <div className="admin-page">
        <header className="admin-heading">
          <div>
            <span>Panel administrativo</span>
            <h1>Bienvenido, Administrador</h1>
            <p>
              Supervisa los usuarios y consulta la actividad registrada
              dentro del sistema MiDoc.
            </p>
          </div>

          <div className="admin-heading-icon">
            <ShieldCheck size={22} />
          </div>
        </header>

        <section className="admin-summary-grid">
          <article>
            <div className="admin-summary-icon">
              <Users size={20} />
            </div>

            <div>
              <span>Usuarios registrados</span>
              <strong>186</strong>
              <small>Total en el sistema</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <Stethoscope size={20} />
            </div>

            <div>
              <span>Doctores activos</span>
              <strong>12</strong>
              <small>Personal médico</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>Citas registradas</span>
              <strong>84</strong>
              <small>Actividad actual</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <Activity size={20} />
            </div>

            <div>
              <span>Usuarios activos</span>
              <strong>179</strong>
              <small>7 usuarios inactivos</small>
            </div>
          </article>
        </section>

        <div className="admin-home-grid">
          <section className="admin-section-card">
            <div className="admin-section-heading">
              <div>
                <span>Accesos rápidos</span>
                <h2>Administración del sistema</h2>
              </div>
            </div>

            <div className="admin-quick-actions">
              <button onClick={() => navigate('/administrador/usuarios')}>
                <div className="admin-quick-icon">
                  <UserCog size={21} />
                </div>

                <div>
                  <strong>Usuarios y roles</strong>
                  <span>
                    Consulta usuarios, roles asignados y estado de las cuentas.
                  </span>
                </div>

                <ArrowRight size={16} />
              </button>

              <button onClick={() => navigate('/administrador/historial')}>
                <div className="admin-quick-icon">
                  <History size={21} />
                </div>

                <div>
                  <strong>Historial de operaciones</strong>
                  <span>
                    Revisa las acciones registradas dentro del sistema.
                  </span>
                </div>

                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          <section className="admin-section-card">
            <div className="admin-section-heading">
              <div>
                <span>Actividad reciente</span>
                <h2>Últimas operaciones</h2>
              </div>

              <button
                className="admin-text-button"
                onClick={() => navigate('/administrador/historial')}
              >
                Ver historial
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="admin-activity-list">
              <article>
                <div className="admin-activity-marker" />

                <div>
                  <strong>Cita registrada</strong>
                  <span>Recepción · María Fernanda López</span>
                </div>

                <time>10:32 a. m.</time>
              </article>

              <article>
                <div className="admin-activity-marker" />

                <div>
                  <strong>Consulta adquirida registrada</strong>
                  <span>Promotor BCP · Diego Salazar</span>
                </div>

                <time>10:08 a. m.</time>
              </article>

              <article>
                <div className="admin-activity-marker" />

                <div>
                  <strong>Cita reprogramada</strong>
                  <span>Cliente · María Fernanda López</span>
                </div>

                <time>09:45 a. m.</time>
              </article>

              <article>
                <div className="admin-activity-marker" />

                <div>
                  <strong>Estado de cita actualizado</strong>
                  <span>Doctor · Carlos Ramírez</span>
                </div>

                <time>09:20 a. m.</time>
              </article>
            </div>
          </section>
        </div>

        <div className="admin-demo-note">
          Datos temporales para la demostración visual. Posteriormente,
          los indicadores y el historial serán obtenidos mediante la API Flask
          y Supabase.
        </div>
      </div>
    </AdministradorLayout>
  )
}

export default AdministradorInicioPage