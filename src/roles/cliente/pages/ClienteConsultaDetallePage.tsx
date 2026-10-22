import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  History,
  MapPin,
  Stethoscope,
  UserRound,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import ClienteLayout from '../components/ClienteLayout'
import '../styles/ClienteConsultaDetallePage.css'

type ConsultaDemo = {
  id: string
  especialidad: string | null
  estado: 'DISPONIBLE' | 'AGENDADA'
  pago: 'PAGADA' | 'PENDIENTE'
  adquirida: string
  vencimiento: string
  reprogramaciones: number
  cita?: {
    medico: string
    sede: string
    fecha: string
    hora: string
    estado: string
  }
}

const consultasDemo: Record<string, ConsultaDemo> = {
  '001': {
    id: '001',
    especialidad: null,
    estado: 'DISPONIBLE',
    pago: 'PAGADA',
    adquirida: '15/10/2026',
    vencimiento: '15/11/2026',
    reprogramaciones: 0,
  },

  '002': {
    id: '002',
    especialidad: 'Dermatología',
    estado: 'DISPONIBLE',
    pago: 'PAGADA',
    adquirida: '18/10/2026',
    vencimiento: '18/11/2026',
    reprogramaciones: 0,
  },

  '003': {
    id: '003',
    especialidad: 'Cardiología',
    estado: 'AGENDADA',
    pago: 'PAGADA',
    adquirida: '05/10/2026',
    vencimiento: '05/11/2026',
    reprogramaciones: 1,
    cita: {
      medico: 'Dr. Carlos Ramírez',
      sede: 'Pro',
      fecha: '28/10/2026',
      hora: '10:30 a. m.',
      estado: 'AGENDADA',
    },
  },
}

function ClienteConsultaDetallePage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const consulta = id ? consultasDemo[id] : undefined

  if (!consulta) {
    return (
      <ClienteLayout>
        <div className="consulta-detalle-page">
          <button
            type="button"
            className="detalle-back"
            onClick={() => navigate('/cliente/consultas')}
          >
            <ArrowLeft size={17} />
            Volver a mis consultas
          </button>

          <div className="detalle-not-found">
            <Stethoscope size={35} />

            <h1>Consulta no encontrada</h1>

            <p>
              No encontramos información para esta consulta.
            </p>

            <button
              type="button"
              onClick={() => navigate('/cliente/consultas')}
            >
              Ir a mis consultas
            </button>
          </div>
        </div>
      </ClienteLayout>
    )
  }

  const reprogramacionesRestantes =
    2 - consulta.reprogramaciones

  return (
    <ClienteLayout>
      <div className="consulta-detalle-page">
        <button
          type="button"
          className="detalle-back"
          onClick={() => navigate('/cliente/consultas')}
        >
          <ArrowLeft size={17} />
          Volver a mis consultas
        </button>

        <section className="detalle-heading">
          <div>
            <span className="detalle-eyebrow">
              Consulta #{consulta.id}
            </span>

            <h1>
              {consulta.especialidad ??
                'Especialidad por seleccionar'}
            </h1>

            <p>
              Revisa la información y el estado actual
              de tu consulta médica.
            </p>
          </div>

          <span
            className={`detalle-status ${
              consulta.estado === 'AGENDADA'
                ? 'agendada'
                : 'disponible'
            }`}
          >
            {consulta.estado === 'AGENDADA' ? (
              <CalendarDays size={15} />
            ) : (
              <CheckCircle2 size={15} />
            )}

            {consulta.estado === 'AGENDADA'
              ? 'Agendada'
              : 'Disponible'}
          </span>
        </section>

        <section className="detalle-card">
          <div className="detalle-section-title">
            <div className="detalle-section-icon">
              <Stethoscope size={19} />
            </div>

            <div>
              <h2>Información de la consulta</h2>
              <p>
                Datos relacionados con la consulta adquirida.
              </p>
            </div>
          </div>

          <div className="detalle-grid">
            <div className="detalle-data">
              <span>Especialidad</span>
              <strong>
                {consulta.especialidad ??
                  'Aún no seleccionada'}
              </strong>
            </div>

            <div className="detalle-data">
              <span>Estado de consulta</span>
              <strong>{consulta.estado}</strong>
            </div>

            <div className="detalle-data">
              <span>Fecha de adquisición</span>
              <strong>{consulta.adquirida}</strong>
            </div>

            <div className="detalle-data">
              <span>Vigente hasta</span>
              <strong>{consulta.vencimiento}</strong>
              <small>Vigencia de 1 mes</small>
            </div>
          </div>
        </section>

        <div className="detalle-two-columns">
          <section className="detalle-card">
            <div className="detalle-section-title">
              <div className="detalle-section-icon">
                <CircleDollarSign size={19} />
              </div>

              <div>
                <h2>Estado de pago</h2>
                <p>Información de la consulta adquirida.</p>
              </div>
            </div>

            <div className="detalle-payment">
              <div>
                <span>Estado</span>
                <strong>{consulta.pago}</strong>
              </div>

              <CheckCircle2 size={21} />
            </div>
          </section>

          <section className="detalle-card">
            <div className="detalle-section-title">
              <div className="detalle-section-icon">
                <History size={19} />
              </div>

              <div>
                <h2>Reprogramaciones</h2>
                <p>Máximo permitido por consulta.</p>
              </div>
            </div>

            <div className="detalle-reprogramaciones">
              <div className="detalle-counter">
                <strong>{consulta.reprogramaciones}</strong>
                <span>de 2 utilizadas</span>
              </div>

              <div className="detalle-progress">
                <div
                  style={{
                    width: `${
                      (consulta.reprogramaciones / 2) * 100
                    }%`,
                  }}
                />
              </div>

              <p>
                {reprogramacionesRestantes === 0
                  ? 'Has alcanzado el límite de reprogramaciones.'
                  : reprogramacionesRestantes === 1
                    ? 'Te queda 1 reprogramación disponible.'
                    : 'Te quedan 2 reprogramaciones disponibles.'}
              </p>
            </div>
          </section>
        </div>

        {consulta.cita ? (
          <section className="detalle-card detalle-cita-card">
            <div className="detalle-section-title">
              <div className="detalle-section-icon">
                <CalendarDays size={19} />
              </div>

              <div>
                <h2>Cita programada</h2>
                <p>
                  Información de tu próxima atención médica.
                </p>
              </div>
            </div>

            <div className="detalle-cita-grid">
              <div className="detalle-cita-item">
                <UserRound size={18} />

                <div>
                  <span>Médico</span>
                  <strong>{consulta.cita.medico}</strong>
                </div>
              </div>

              <div className="detalle-cita-item">
                <MapPin size={18} />

                <div>
                  <span>Sede</span>
                  <strong>{consulta.cita.sede}</strong>
                </div>
              </div>

              <div className="detalle-cita-item">
                <CalendarDays size={18} />

                <div>
                  <span>Fecha</span>
                  <strong>{consulta.cita.fecha}</strong>
                </div>
              </div>

              <div className="detalle-cita-item">
                <Clock3 size={18} />

                <div>
                  <span>Horario</span>
                  <strong>{consulta.cita.hora}</strong>
                </div>
              </div>
            </div>

            <div className="detalle-actions">
              {consulta.reprogramaciones < 2 && (
                <button
                  type="button"
                  className="detalle-primary-button"
                >
                  Reprogramar cita
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="detalle-empty-appointment">
            <div className="detalle-empty-icon">
              <CalendarDays size={25} />
            </div>

            <div>
              <h2>Aún no tienes una cita programada</h2>

              <p>
                {consulta.especialidad
                  ? `Puedes revisar la disponibilidad de ${consulta.especialidad} y elegir tu cita.`
                  : 'Primero selecciona la especialidad para continuar con el agendamiento.'}
              </p>
            </div>

            <button
              type="button"
              className="detalle-primary-button"
            >
              Agendar cita
            </button>
          </section>
        )}
      </div>
    </ClienteLayout>
  )
}

export default ClienteConsultaDetallePage