import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Stethoscope,
  UserRound,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import ClienteLayout from '../components/ClienteLayout'
import '../styles/ClienteDisponibilidadPage.css'

type MedicoDemo = {
  id: number
  nombre: string
  especialidad: string
  sede: string
  iniciales: string
  horario: string
  duracion: number
}

type FechaDemo = {
  id: number
  diaSemana: string
  dia: string
  mes: string
  disponible: boolean
}

type HorarioDemo = {
  hora: string
  disponible: boolean
}

/*
 * DATOS TEMPORALES DE DEMOSTRACIÓN.
 * Se eliminarán cuando conectemos el frontend con Flask.
 *
 * La disponibilidad REAL NO se calculará en React.
 * El backend obtendrá:
 * - horario mensual del médico
 * - duración de la especialidad
 * - citas ya ocupadas
 * y devolverá únicamente los horarios disponibles.
 */

const medicosDemo: MedicoDemo[] = [
  {
    id: 1,
    nombre: 'Dra. María López',
    especialidad: 'Dermatología',
    sede: 'Pro',
    iniciales: 'ML',
    horario: '9:00 a. m. - 5:00 p. m.',
    duracion: 30,
  },
  {
    id: 2,
    nombre: 'Dr. Carlos Ramírez',
    especialidad: 'Dermatología',
    sede: 'Pro',
    iniciales: 'CR',
    horario: '8:00 a. m. - 1:00 p. m.',
    duracion: 30,
  },
  {
    id: 3,
    nombre: 'Dra. Ana Torres',
    especialidad: 'Dermatología',
    sede: 'Pro',
    iniciales: 'AT',
    horario: '10:00 a. m. - 6:00 p. m.',
    duracion: 30,
  },
]

const fechasDemo: FechaDemo[] = [
  {
    id: 1,
    diaSemana: 'Lun',
    dia: '02',
    mes: 'nov.',
    disponible: true,
  },
  {
    id: 2,
    diaSemana: 'Mar',
    dia: '03',
    mes: 'nov.',
    disponible: true,
  },
  {
    id: 3,
    diaSemana: 'Mié',
    dia: '04',
    mes: 'nov.',
    disponible: true,
  },
  {
    id: 4,
    diaSemana: 'Jue',
    dia: '05',
    mes: 'nov.',
    disponible: true,
  },
  {
    id: 5,
    diaSemana: 'Vie',
    dia: '06',
    mes: 'nov.',
    disponible: true,
  },
]

const horariosDemo: HorarioDemo[] = [
  { hora: '8:00 a. m.', disponible: false },
  { hora: '8:30 a. m.', disponible: false },
  { hora: '9:00 a. m.', disponible: true },
  { hora: '9:30 a. m.', disponible: true },
  { hora: '10:00 a. m.', disponible: true },
  { hora: '10:30 a. m.', disponible: true },
  { hora: '11:00 a. m.', disponible: true },
  { hora: '11:30 a. m.', disponible: true },
  { hora: '12:00 p. m.', disponible: false },
  { hora: '12:30 p. m.', disponible: false },
  { hora: '3:00 p. m.', disponible: true },
  { hora: '3:30 p. m.', disponible: true },
  { hora: '4:00 p. m.', disponible: true },
  { hora: '4:30 p. m.', disponible: true },
  { hora: '5:00 p. m.', disponible: false },
  { hora: '5:30 p. m.', disponible: false },
]

function ClienteDisponibilidadPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const consultaId = searchParams.get('consulta')

  const [especialidad, setEspecialidad] = useState('Dermatología')
  const [sede, setSede] = useState('Pro')

  const [medicoSeleccionado, setMedicoSeleccionado] =
    useState<number>(1)

  const [fechaSeleccionada, setFechaSeleccionada] =
    useState<number>(3)

  const [horaSeleccionada, setHoraSeleccionada] =
    useState<string | null>(null)

  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState(false)

  const [citaConfirmada, setCitaConfirmada] =
    useState(false)

  const medicoActual =
    medicosDemo.find(
      (medico) => medico.id === medicoSeleccionado,
    ) ?? medicosDemo[0]

  const fechaActual =
    fechasDemo.find(
      (fecha) => fecha.id === fechaSeleccionada,
    ) ?? fechasDemo[0]

  const cambiarMedico = (idMedico: number) => {
    setMedicoSeleccionado(idMedico)
    setHoraSeleccionada(null)
  }

  const cambiarFecha = (idFecha: number) => {
    setFechaSeleccionada(idFecha)
    setHoraSeleccionada(null)
  }

  const continuarConfirmacion = () => {
    if (!horaSeleccionada) {
      return
    }

    setMostrarConfirmacion(true)
  }

  const volverDisponibilidad = () => {
    setMostrarConfirmacion(false)
  }

  const confirmarCita = () => {
    /*
     * FRONTEND TEMPORAL:
     *
     * Aquí NO creamos realmente la cita todavía.
     *
     * Cuando conectemos Flask:
     * 1. El backend volverá a validar que el horario siga libre.
     * 2. Creará la cita en PostgreSQL.
     * 3. Registrará la notificación.
     * 4. Enviará el correo de confirmación.
     * 5. Solo después de una respuesta exitosa mostraremos
     *    esta pantalla de éxito.
     */

    setCitaConfirmada(true)
  }

  if (citaConfirmada) {
    return (
      <ClienteLayout>
        <div className="disponibilidad-page">
          <section className="cita-exito-container">
            <div className="cita-exito-card">
              <div className="cita-exito-icon">
                <CheckCircle2 size={44} />
              </div>

              <span className="cita-exito-eyebrow">
                Agendamiento completado
              </span>

              <h1>¡Tu cita ha sido agendada!</h1>

              <p className="cita-exito-description">
                Tu cita médica quedó registrada correctamente.
              </p>

              <div className="cita-exito-resumen">
                {consultaId && (
                  <div className="exito-resumen-row">
                    <span>Consulta</span>
                    <strong>#{consultaId}</strong>
                  </div>
                )}

                <div className="exito-resumen-row">
                  <span>Especialidad</span>
                  <strong>{especialidad}</strong>
                </div>

                <div className="exito-resumen-row">
                  <span>Médico</span>
                  <strong>{medicoActual.nombre}</strong>
                </div>

                <div className="exito-resumen-row">
                  <span>Sede</span>
                  <strong>Sede {sede}</strong>
                </div>

                <div className="exito-resumen-row">
                  <span>Fecha</span>
                  <strong>
                    {fechaActual.diaSemana} {fechaActual.dia}{' '}
                    de noviembre de 2026
                  </strong>
                </div>

                <div className="exito-resumen-row">
                  <span>Hora</span>
                  <strong>{horaSeleccionada}</strong>
                </div>
              </div>

              <div className="cita-email-notice">
                <Mail size={20} />

                <div>
                  <strong>
                    Revisa tu correo electrónico
                  </strong>

                  <p>
                    Recibirás un mensaje de confirmación con
                    los datos de tu cita.
                  </p>
                </div>
              </div>

              <div className="cita-exito-actions">
                <button
                  type="button"
                  className="exito-secondary-button"
                  onClick={() =>
                    navigate('/cliente/consultas')
                  }
                >
                  Mis consultas
                </button>

                <button
                  type="button"
                  className="exito-primary-button"
                  onClick={() =>
                    navigate('/cliente/citas')
                  }
                >
                  Ver mis citas
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </ClienteLayout>
    )
  }

  if (mostrarConfirmacion) {
    return (
      <ClienteLayout>
        <div className="disponibilidad-page">
          <section className="disponibilidad-heading">
            <div>
              <span className="disponibilidad-eyebrow">
                {consultaId
                  ? `Agendando consulta #${consultaId}`
                  : 'Disponibilidad médica'}
              </span>

              <h1>Confirma tu cita</h1>

              <p>
                Revisa cuidadosamente los datos antes de
                confirmar el agendamiento.
              </p>
            </div>

            <div className="disponibilidad-heading-icon">
              <CheckCircle2 size={30} />
            </div>
          </section>

          <section className="disponibilidad-steps">
            <div className="disponibilidad-step completed">
              <span>
                <Check size={13} />
              </span>
              <strong>Especialidad</strong>
            </div>

            <div className="step-line completed" />

            <div className="disponibilidad-step completed">
              <span>
                <Check size={13} />
              </span>
              <strong>Sede</strong>
            </div>

            <div className="step-line completed" />

            <div className="disponibilidad-step completed">
              <span>
                <Check size={13} />
              </span>
              <strong>Médico</strong>
            </div>

            <div className="step-line completed" />

            <div className="disponibilidad-step completed">
              <span>
                <Check size={13} />
              </span>
              <strong>Fecha y horario</strong>
            </div>

            <div className="step-line completed" />

            <div className="disponibilidad-step active">
              <span>5</span>
              <strong>Confirmación</strong>
            </div>
          </section>

          <section className="confirmacion-wrapper">
            <div className="confirmacion-card">
              <div className="confirmacion-card-header">
                <div className="confirmacion-header-icon">
                  <CalendarDays size={24} />
                </div>

                <div>
                  <span>Resumen del agendamiento</span>
                  <h2>Tu próxima cita médica</h2>
                  <p>
                    Verifica que todos los datos sean
                    correctos.
                  </p>
                </div>
              </div>

              <div className="confirmacion-data-grid">
                {consultaId && (
                  <div className="confirmacion-data-item">
                    <span>Consulta</span>
                    <strong>#{consultaId}</strong>
                  </div>
                )}

                <div className="confirmacion-data-item">
                  <span>Especialidad</span>
                  <strong>{especialidad}</strong>
                </div>

                <div className="confirmacion-data-item">
                  <span>Médico</span>
                  <strong>{medicoActual.nombre}</strong>
                </div>

                <div className="confirmacion-data-item">
                  <span>Sede</span>
                  <strong>Sede {sede}</strong>
                </div>

                <div className="confirmacion-data-item">
                  <span>Fecha</span>
                  <strong>
                    {fechaActual.diaSemana} {fechaActual.dia}{' '}
                    de noviembre de 2026
                  </strong>
                </div>

                <div className="confirmacion-data-item">
                  <span>Hora</span>
                  <strong>{horaSeleccionada}</strong>
                </div>

                <div className="confirmacion-data-item">
                  <span>Duración</span>
                  <strong>
                    {medicoActual.duracion} minutos
                  </strong>
                </div>
              </div>

              <div className="confirmacion-medico-box">
                <div className="medico-avatar">
                  {medicoActual.iniciales}
                </div>

                <div>
                  <span>Serás atendido por</span>
                  <strong>{medicoActual.nombre}</strong>

                  <p>
                    {especialidad} · Sede {sede}
                  </p>
                </div>
              </div>

              <div className="confirmacion-email-box">
                <Mail size={19} />

                <div>
                  <strong>Confirmación por correo</strong>

                  <p>
                    Después de confirmar tu cita recibirás
                    un correo electrónico con los datos del
                    agendamiento.
                  </p>
                </div>
              </div>

              <div className="confirmacion-actions">
                <button
                  type="button"
                  className="confirmacion-back-button"
                  onClick={volverDisponibilidad}
                >
                  <ArrowLeft size={16} />
                  Volver y modificar
                </button>

                <button
                  type="button"
                  className="confirmacion-submit-button"
                  onClick={confirmarCita}
                >
                  <Check size={16} />
                  Confirmar cita
                </button>
              </div>
            </div>
          </section>
        </div>
      </ClienteLayout>
    )
  }

  return (
    <ClienteLayout>
      <div className="disponibilidad-page">
        <section className="disponibilidad-heading">
          <div>
            <span className="disponibilidad-eyebrow">
              {consultaId
                ? `Agendando consulta #${consultaId}`
                : 'Disponibilidad médica'}
            </span>

            <h1>Encuentra tu próxima cita</h1>

            <p>
              Consulta los médicos disponibles y selecciona
              la fecha y horario que prefieras.
            </p>
          </div>

          <div className="disponibilidad-heading-icon">
            <CalendarDays size={30} />
          </div>
        </section>

        <section className="disponibilidad-steps">
          <div className="disponibilidad-step active">
            <span>1</span>
            <strong>Especialidad</strong>
          </div>

          <div className="step-line" />

          <div className="disponibilidad-step active">
            <span>2</span>
            <strong>Sede</strong>
          </div>

          <div className="step-line" />

          <div className="disponibilidad-step active">
            <span>3</span>
            <strong>Médico</strong>
          </div>

          <div className="step-line" />

          <div className="disponibilidad-step active">
            <span>4</span>
            <strong>Fecha y horario</strong>
          </div>

          <div className="step-line" />

          <div className="disponibilidad-step">
            <span>5</span>
            <strong>Confirmación</strong>
          </div>
        </section>

        <div className="disponibilidad-content">
          <aside className="disponibilidad-filters-card">
            <div className="disponibilidad-filter-block">
              <div className="filter-title">
                <Stethoscope size={17} />

                <div>
                  <strong>Especialidad</strong>
                  <span>Tipo de atención</span>
                </div>
              </div>

              <select
                value={especialidad}
                onChange={(event) =>
                  setEspecialidad(event.target.value)
                }
              >
                <option value="Dermatología">
                  Dermatología
                </option>

                <option value="Cardiología">
                  Cardiología
                </option>

                <option value="Medicina General">
                  Medicina General
                </option>

                <option value="Oftalmología">
                  Oftalmología
                </option>
              </select>
            </div>

            <div className="filter-separator" />

            <div className="disponibilidad-filter-block">
              <div className="filter-title">
                <MapPin size={17} />

                <div>
                  <strong>Sede</strong>
                  <span>Lugar de atención</span>
                </div>
              </div>

              <select
                value={sede}
                onChange={(event) =>
                  setSede(event.target.value)
                }
              >
                <option value="Pro">Sede Pro</option>

                <option value="Izaguirre">
                  Sede Izaguirre
                </option>
              </select>
            </div>

            <div className="duracion-info">
              <Clock3 size={18} />

              <div>
                <strong>Duración de la consulta</strong>

                <p>
                  Cada atención de {especialidad} tiene una
                  duración definida por la clínica.
                </p>

                <span>
                  Ejemplo actual: {medicoActual.duracion}{' '}
                  minutos
                </span>
              </div>
            </div>

            <div className="rotacion-info">
              <CalendarDays size={18} />

              <div>
                <strong>Horarios del mes</strong>

                <p>
                  La disponibilidad corresponde al horario
                  asignado al médico durante el mes
                  seleccionado.
                </p>
              </div>
            </div>
          </aside>

          <section className="medicos-panel">
            <div className="panel-heading">
              <span>Médicos</span>

              <h2>Médicos disponibles</h2>

              <p>
                Selecciona un médico para consultar sus
                horarios.
              </p>
            </div>

            <div className="medicos-list">
              {medicosDemo.map((medico) => {
                const seleccionado =
                  medicoSeleccionado === medico.id

                return (
                  <button
                    key={medico.id}
                    type="button"
                    className={`medico-card ${
                      seleccionado ? 'selected' : ''
                    }`}
                    onClick={() =>
                      cambiarMedico(medico.id)
                    }
                  >
                    <div className="medico-card-top">
                      <div className="medico-avatar">
                        {medico.iniciales}
                      </div>

                      <div className="medico-info">
                        <strong>{medico.nombre}</strong>
                        <span>{medico.especialidad}</span>
                        <small>Sede {medico.sede}</small>
                      </div>

                      <div
                        className={`medico-radio ${
                          seleccionado ? 'selected' : ''
                        }`}
                      >
                        {seleccionado && (
                          <Check size={13} />
                        )}
                      </div>
                    </div>

                    <div className="medico-card-bottom">
                      <div>
                        <Clock3 size={15} />

                        <span>
                          <small>Horario del mes</small>
                          <strong>{medico.horario}</strong>
                        </span>
                      </div>

                      <div>
                        <Stethoscope size={15} />

                        <span>
                          <small>Duración</small>
                          <strong>
                            {medico.duracion} min
                          </strong>
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="horarios-panel">
            <div className="panel-heading horarios-heading">
              <div>
                <span>Disponibilidad</span>

                <h2>Selecciona fecha y horario</h2>

                <p>
                  Horarios disponibles de{' '}
                  <strong>{medicoActual.nombre}</strong>.
                </p>
              </div>

              <CalendarDays size={22} />
            </div>

            <div className="month-navigation">
              <button
                type="button"
                aria-label="Mes anterior"
              >
                <ChevronLeft size={17} />
              </button>

              <strong>Noviembre 2026</strong>

              <button
                type="button"
                aria-label="Mes siguiente"
              >
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="fechas-navigation">
              <button
                type="button"
                className="fecha-arrow"
                aria-label="Fechas anteriores"
              >
                <ChevronLeft size={17} />
              </button>

              <div className="fechas-list">
                {fechasDemo.map((fecha) => (
                  <button
                    key={fecha.id}
                    type="button"
                    disabled={!fecha.disponible}
                    className={`fecha-card ${
                      fechaSeleccionada === fecha.id
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() =>
                      cambiarFecha(fecha.id)
                    }
                  >
                    <span>{fecha.diaSemana}</span>
                    <strong>{fecha.dia}</strong>
                    <small>{fecha.mes}</small>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="fecha-arrow"
                aria-label="Fechas siguientes"
              >
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="horario-summary">
              <CalendarDays size={16} />

              <span>
                <small>Fecha seleccionada</small>

                <strong>
                  {fechaActual.diaSemana} {fechaActual.dia}{' '}
                  de noviembre
                </strong>
              </span>
            </div>

            <div className="horarios-grid">
              {horariosDemo.map((horario) => {
                const seleccionado =
                  horaSeleccionada === horario.hora

                return (
                  <button
                    key={horario.hora}
                    type="button"
                    disabled={!horario.disponible}
                    className={`horario-button ${
                      seleccionado ? 'selected' : ''
                    }`}
                    onClick={() =>
                      setHoraSeleccionada(horario.hora)
                    }
                  >
                    <strong>{horario.hora}</strong>

                    <span>
                      {horario.disponible
                        ? seleccionado
                          ? 'Seleccionado'
                          : 'Disponible'
                        : 'No disponible'}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="disponibilidad-footer">
              {horaSeleccionada ? (
                <div className="seleccion-resumen">
                  <Check size={16} />

                  <div>
                    <span>Horario seleccionado</span>

                    <strong>
                      {fechaActual.dia}/11/2026 ·{' '}
                      {horaSeleccionada}
                    </strong>
                  </div>
                </div>
              ) : (
                <div className="seleccion-resumen empty">
                  <Clock3 size={16} />

                  <div>
                    <span>Selecciona un horario</span>

                    <strong>
                      Elige una hora disponible para
                      continuar
                    </strong>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="continuar-button"
                disabled={!horaSeleccionada}
                onClick={continuarConfirmacion}
              >
                Continuar
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </div>

        <div className="disponibilidad-legend">
          <span>
            <i className="legend-dot disponible" />
            Disponible
          </span>

          <span>
            <i className="legend-dot seleccionado" />
            Seleccionado
          </span>

          <span>
            <i className="legend-dot ocupado" />
            No disponible
          </span>

          <span className="legend-note">
            <UserRound size={14} />
            Los horarios pueden variar cada mes según la
            programación de cada médico.
          </span>
        </div>

        {consultaId && (
          <button
            type="button"
            className="volver-consulta-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={15} />
            Volver a la consulta
          </button>
        )}
      </div>
    </ClienteLayout>
  )
}

export default ClienteDisponibilidadPage