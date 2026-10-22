import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Search,
  Stethoscope,
  UserRound,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import PromotorLayout from '../components/PromotorLayout'
import '../styles/PromotorPages.css'

type Especialidad = {
  id: number
  nombre: string
  duracion: number
}

type Doctor = {
  id: number
  nombre: string
  especialidad: string
  sede: string
}

type Disponibilidad = {
  fecha: string
  dia: string
  fechaTexto: string
  horarios: string[]
}

const especialidades: Especialidad[] = [
  {
    id: 1,
    nombre: 'Medicina General',
    duracion: 30,
  },
  {
    id: 2,
    nombre: 'Cardiología',
    duracion: 30,
  },
  {
    id: 3,
    nombre: 'Dermatología',
    duracion: 30,
  },
]

const sedes = ['Pro', 'Izaguirre']

const doctores: Doctor[] = [
  {
    id: 1,
    nombre: 'Dra. María López',
    especialidad: 'Medicina General',
    sede: 'Izaguirre',
  },
  {
    id: 2,
    nombre: 'Dr. Carlos Ramírez',
    especialidad: 'Cardiología',
    sede: 'Pro',
  },
  {
    id: 3,
    nombre: 'Dra. Ana Torres',
    especialidad: 'Dermatología',
    sede: 'Pro',
  },
  {
    id: 4,
    nombre: 'Dr. Javier Mendoza',
    especialidad: 'Cardiología',
    sede: 'Izaguirre',
  },
]

/*
 * DEMO VISUAL TEMPORAL.
 *
 * En backend esta información NO estará escrita manualmente.
 *
 * Flask consultará:
 * - horario_medico del doctor
 * - vigencia del horario
 * - días de la semana en los que atiende
 * - hora de inicio y fin
 * - duración de la especialidad
 * - citas ya ocupadas
 *
 * Con eso devolverá únicamente las fechas y horarios
 * realmente disponibles.
 */
const disponibilidadDemo: Disponibilidad[] = [
  {
    fecha: '2026-11-03',
    dia: 'Martes',
    fechaTexto: '03 de noviembre',
    horarios: [
      '09:00 a.m.',
      '09:30 a.m.',
      '10:30 a.m.',
      '11:00 a.m.',
    ],
  },
  {
    fecha: '2026-11-05',
    dia: 'Jueves',
    fechaTexto: '05 de noviembre',
    horarios: [
      '03:00 p.m.',
      '03:30 p.m.',
      '04:00 p.m.',
      '04:30 p.m.',
    ],
  },
  {
    fecha: '2026-11-07',
    dia: 'Sábado',
    fechaTexto: '07 de noviembre',
    horarios: [
      '09:00 a.m.',
      '10:00 a.m.',
      '10:30 a.m.',
      '11:30 a.m.',
    ],
  },
  {
    fecha: '2026-11-10',
    dia: 'Martes',
    fechaTexto: '10 de noviembre',
    horarios: [
      '09:30 a.m.',
      '10:00 a.m.',
      '11:00 a.m.',
    ],
  },
  {
    fecha: '2026-11-12',
    dia: 'Jueves',
    fechaTexto: '12 de noviembre',
    horarios: [
      '03:00 p.m.',
      '03:30 p.m.',
      '04:30 p.m.',
    ],
  },
]

function PromotorAgendamientoPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const consultaInicial = searchParams.get('consulta') ?? ''
  const dniInicial = searchParams.get('dni') ?? ''

  const [consulta, setConsulta] = useState(consultaInicial)
  const [dni, setDni] = useState(dniInicial)

  const [clienteIdentificado, setClienteIdentificado] =
    useState(Boolean(consultaInicial && dniInicial))

  const [especialidad, setEspecialidad] = useState('')
  const [sede, setSede] = useState('')
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [confirmado, setConfirmado] = useState(false)

  const doctoresDisponibles = useMemo(() => {
    return doctores.filter(
      (item) =>
        item.especialidad === especialidad &&
        item.sede === sede,
    )
  }, [especialidad, sede])

  const especialidadSeleccionada = especialidades.find(
    (item) => item.nombre === especialidad,
  )

  const fechaSeleccionada = disponibilidadDemo.find(
    (item) => item.fecha === fecha,
  )

  const buscarConsulta = () => {
    if (!dni.trim() || !consulta.trim()) return

    /*
     * DEMO VISUAL.
     *
     * Backend verificará:
     * - existencia del cliente
     * - que la consulta pertenezca al cliente
     * - que esté DISPONIBLE
     * - que siga vigente
     * - reglas de pago aplicables
     */
    setClienteIdentificado(true)
  }

  const limpiarDesdeEspecialidad = (
    nuevaEspecialidad: string,
  ) => {
    setEspecialidad(nuevaEspecialidad)
    setSede('')
    setDoctor(null)
    setFecha('')
    setHora('')
  }

  const limpiarDesdeSede = (nuevaSede: string) => {
    setSede(nuevaSede)
    setDoctor(null)
    setFecha('')
    setHora('')
  }

  const seleccionarDoctor = (nuevoDoctor: Doctor) => {
    setDoctor(nuevoDoctor)
    setFecha('')
    setHora('')
  }

  const seleccionarHorario = (
    nuevaFecha: string,
    nuevaHora: string,
  ) => {
    setFecha(nuevaFecha)
    setHora(nuevaHora)
  }

  const confirmarAgendamiento = () => {
    if (
      !clienteIdentificado ||
      !especialidad ||
      !sede ||
      !doctor ||
      !fecha ||
      !hora
    ) {
      return
    }

    /*
     * BACKEND FUTURO:
     *
     * 1. Validar cliente y consulta.
     * 2. Validar que la consulta siga vigente.
     * 3. Validar nuevamente disponibilidad del doctor.
     * 4. Validar que el horario no haya sido ocupado.
     * 5. Crear cita.
     * 6. Cambiar consulta DISPONIBLE -> AGENDADA.
     * 7. Registrar quién realizó el agendamiento.
     * 8. Enviar correo de confirmación.
     *
     * La disponibilidad se vuelve a comprobar al confirmar
     * para evitar que dos personas reserven el mismo horario.
     */

    setConfirmado(true)
  }

  const nuevoAgendamiento = () => {
    setConfirmado(false)
    setConsulta('')
    setDni('')
    setClienteIdentificado(false)
    setEspecialidad('')
    setSede('')
    setDoctor(null)
    setFecha('')
    setHora('')
  }

  if (confirmado && doctor) {
    return (
      <PromotorLayout>
        <div className="promotor-page">
          <section className="promotor-success-card">
            <div className="promotor-success-icon">
              <CheckCircle2 size={34} />
            </div>

            <span>Agendamiento completado</span>

            <h1>Cita registrada correctamente</h1>

            <p>
              La consulta <strong>#{consulta}</strong> del cliente
              fue agendada correctamente.
            </p>

            <div className="promotor-confirmation-summary">
              <div>
                <Stethoscope size={16} />
                <span>Especialidad</span>
                <strong>{especialidad}</strong>
              </div>

              <div>
                <UserRound size={16} />
                <span>Médico</span>
                <strong>{doctor.nombre}</strong>
              </div>

              <div>
                <MapPin size={16} />
                <span>Sede</span>
                <strong>{sede}</strong>
              </div>

              <div>
                <CalendarDays size={16} />
                <span>Fecha</span>
                <strong>
                  {fechaSeleccionada
                    ? `${fechaSeleccionada.dia}, ${fechaSeleccionada.fechaTexto}`
                    : fecha}
                </strong>
              </div>

              <div>
                <Clock3 size={16} />
                <span>Hora</span>
                <strong>{hora}</strong>
              </div>

              <div>
                <Clock3 size={16} />
                <span>Duración</span>
                <strong>
                  {especialidadSeleccionada?.duracion ?? 30} min
                </strong>
              </div>
            </div>

            <div className="promotor-email-message">
              <Mail size={18} />

              <div>
                <strong>
                  Confirmación por correo electrónico
                </strong>

                <span>
                  El cliente recibirá los datos de su cita en el
                  correo registrado.
                </span>
              </div>
            </div>

            <div className="promotor-success-actions">
              <button
                type="button"
                className="promotor-secondary-button"
                onClick={() =>
                  navigate('/promotor/consultas')
                }
              >
                Ver consultas
              </button>

              <button
                type="button"
                className="promotor-primary-button"
                onClick={nuevoAgendamiento}
              >
                Nuevo agendamiento
              </button>
            </div>
          </section>
        </div>
      </PromotorLayout>
    )
  }

  return (
    <PromotorLayout>
      <div className="promotor-page">
        <section className="promotor-heading">
          <div>
            <span>Asistencia al cliente</span>

            <h1>Agendamiento</h1>

            <p>
              Programa una cita para una consulta adquirida por el
              cliente.
            </p>
          </div>
        </section>

        <div className="promotor-booking-layout">
          <div className="promotor-booking-main">
            <section className="promotor-section-card">
              <div className="promotor-step-heading">
                <div className="promotor-step-number">1</div>

                <div>
                  <span>Consulta adquirida</span>
                  <h2>Identificar consulta</h2>
                </div>
              </div>

              <div className="promotor-identify-grid">
                <label>
                  DNI del cliente

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    value={dni}
                    onChange={(event) => {
                      setDni(
                        event.target.value.replace(/\D/g, ''),
                      )
                      setClienteIdentificado(false)
                    }}
                    placeholder="8 dígitos"
                  />
                </label>

                <label>
                  Número de consulta

                  <input
                    type="text"
                    value={consulta}
                    onChange={(event) => {
                      setConsulta(event.target.value)
                      setClienteIdentificado(false)
                    }}
                    placeholder="Ej. 001"
                  />
                </label>

                <button
                  type="button"
                  className="promotor-primary-button"
                  onClick={buscarConsulta}
                >
                  <Search size={15} />
                  Buscar
                </button>
              </div>

              {clienteIdentificado && (
                <div className="promotor-client-found">
                  <div>
                    <span>Consulta disponible</span>

                    <strong>
                      María Fernanda López García
                    </strong>

                    <p>
                      DNI {dni} · Consulta #{consulta}
                    </p>
                  </div>

                  <CheckCircle2 size={22} />
                </div>
              )}
            </section>

            {clienteIdentificado && (
              <>
                <section className="promotor-section-card">
                  <div className="promotor-step-heading">
                    <div className="promotor-step-number">
                      2
                    </div>

                    <div>
                      <span>Atención médica</span>
                      <h2>Seleccionar especialidad</h2>
                    </div>
                  </div>

                  <div className="promotor-choice-grid">
                    {especialidades.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={
                          especialidad === item.nombre
                            ? 'selected'
                            : ''
                        }
                        onClick={() =>
                          limpiarDesdeEspecialidad(
                            item.nombre,
                          )
                        }
                      >
                        <Stethoscope size={19} />

                        <div>
                          <strong>{item.nombre}</strong>

                          <span>
                            Duración aproximada:{' '}
                            {item.duracion} min
                          </span>
                        </div>

                        {especialidad === item.nombre && (
                          <Check size={17} />
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                {especialidad && (
                  <section className="promotor-section-card">
                    <div className="promotor-step-heading">
                      <div className="promotor-step-number">
                        3
                      </div>

                      <div>
                        <span>Ubicación</span>
                        <h2>Seleccionar sede</h2>
                      </div>
                    </div>

                    <div className="promotor-choice-grid two">
                      {sedes.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className={
                            sede === item ? 'selected' : ''
                          }
                          onClick={() =>
                            limpiarDesdeSede(item)
                          }
                        >
                          <MapPin size={19} />

                          <div>
                            <strong>Sede {item}</strong>

                            <span>
                              Consultar médicos disponibles
                            </span>
                          </div>

                          {sede === item && (
                            <Check size={17} />
                          )}
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {especialidad && sede && (
                  <section className="promotor-section-card">
                    <div className="promotor-step-heading">
                      <div className="promotor-step-number">
                        4
                      </div>

                      <div>
                        <span>Profesional</span>
                        <h2>Seleccionar médico</h2>
                      </div>
                    </div>

                    {doctoresDisponibles.length > 0 ? (
                      <div className="promotor-doctor-grid">
                        {doctoresDisponibles.map(
                          (item) => (
                            <button
                              key={item.id}
                              type="button"
                              className={
                                doctor?.id === item.id
                                  ? 'selected'
                                  : ''
                              }
                              onClick={() =>
                                seleccionarDoctor(item)
                              }
                            >
                              <div className="promotor-doctor-avatar">
                                <UserRound size={20} />
                              </div>

                              <div>
                                <strong>
                                  {item.nombre}
                                </strong>

                                <span>
                                  {item.especialidad}
                                </span>

                                <small>
                                  Sede {item.sede}
                                </small>
                              </div>

                              {doctor?.id === item.id && (
                                <Check size={17} />
                              )}
                            </button>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="promotor-empty">
                        <UserRound size={27} />

                        <strong>
                          No hay médicos disponibles
                        </strong>

                        <span>
                          Prueba seleccionando otra sede.
                        </span>
                      </div>
                    )}
                  </section>
                )}

                {doctor && (
                  <section className="promotor-section-card">
                    <div className="promotor-step-heading">
                      <div className="promotor-step-number">
                        5
                      </div>

                      <div>
                        <span>
                          Disponibilidad del médico
                        </span>

                        <h2>
                          Seleccionar fecha y horario
                        </h2>
                      </div>
                    </div>

                    <div className="promotor-doctor-schedule-info">
                      <CalendarDays size={18} />

                      <div>
                        <strong>
                          Próximas fechas disponibles
                        </strong>

                        <span>
                          Se muestran únicamente los días en
                          los que {doctor.nombre} tiene
                          atención y cuenta con horarios
                          disponibles.
                        </span>
                      </div>
                    </div>

                    <div className="promotor-availability-list">
                      {disponibilidadDemo.map(
                        (disponibilidad) => (
                          <article
                            key={disponibilidad.fecha}
                            className={`promotor-availability-day ${
                              fecha ===
                              disponibilidad.fecha
                                ? 'selected'
                                : ''
                            }`}
                          >
                            <div className="promotor-availability-date">
                              <div className="promotor-date-box">
                                <span>
                                  {disponibilidad.dia.slice(
                                    0,
                                    3,
                                  )}
                                </span>

                                <strong>
                                  {disponibilidad.fechaTexto.slice(
                                    0,
                                    2,
                                  )}
                                </strong>
                              </div>

                              <div>
                                <strong>
                                  {disponibilidad.dia}
                                </strong>

                                <span>
                                  {
                                    disponibilidad.fechaTexto
                                  }
                                </span>
                              </div>
                            </div>

                            <div className="promotor-availability-times">
                              {disponibilidad.horarios.map(
                                (horarioDisponible) => {
                                  const seleccionado =
                                    fecha ===
                                      disponibilidad.fecha &&
                                    hora ===
                                      horarioDisponible

                                  return (
                                    <button
                                      key={
                                        horarioDisponible
                                      }
                                      type="button"
                                      className={
                                        seleccionado
                                          ? 'selected'
                                          : ''
                                      }
                                      onClick={() =>
                                        seleccionarHorario(
                                          disponibilidad.fecha,
                                          horarioDisponible,
                                        )
                                      }
                                    >
                                      <Clock3 size={13} />

                                      {
                                        horarioDisponible
                                      }
                                    </button>
                                  )
                                },
                              )}
                            </div>
                          </article>
                        ),
                      )}
                    </div>

                    <div className="promotor-demo-note">
                      Esta disponibilidad es temporal para el
                      diseño. En la versión final, Flask
                      consultará el horario vigente del médico
                      y excluirá automáticamente las citas que
                      ya estén ocupadas.
                    </div>
                  </section>
                )}
              </>
            )}
          </div>

          <aside className="promotor-booking-summary">
            <span>Resumen</span>

            <h2>Datos de la cita</h2>

            <div className="promotor-summary-line">
              <span>Consulta</span>

              <strong>
                {consulta ? `#${consulta}` : '—'}
              </strong>
            </div>

            <div className="promotor-summary-line">
              <span>DNI</span>
              <strong>{dni || '—'}</strong>
            </div>

            <div className="promotor-summary-line">
              <span>Especialidad</span>
              <strong>{especialidad || '—'}</strong>
            </div>

            <div className="promotor-summary-line">
              <span>Sede</span>
              <strong>{sede || '—'}</strong>
            </div>

            <div className="promotor-summary-line">
              <span>Médico</span>
              <strong>{doctor?.nombre || '—'}</strong>
            </div>

            <div className="promotor-summary-line">
              <span>Fecha</span>

              <strong>
                {fechaSeleccionada
                  ? `${fechaSeleccionada.dia}, ${fechaSeleccionada.fechaTexto}`
                  : '—'}
              </strong>
            </div>

            <div className="promotor-summary-line">
              <span>Hora</span>
              <strong>{hora || '—'}</strong>
            </div>

            <div className="promotor-summary-line">
              <span>Duración</span>

              <strong>
                {especialidadSeleccionada
                  ? `${especialidadSeleccionada.duracion} min`
                  : '—'}
              </strong>
            </div>

            <button
              type="button"
              className="promotor-primary-button large"
              disabled={
                !clienteIdentificado ||
                !especialidad ||
                !sede ||
                !doctor ||
                !fecha ||
                !hora
              }
              onClick={confirmarAgendamiento}
            >
              Confirmar agendamiento
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="promotor-back-button"
              onClick={() =>
                navigate('/promotor/consultas')
              }
            >
              <ArrowLeft size={14} />
              Volver a consultas
            </button>
          </aside>
        </div>
      </div>
    </PromotorLayout>
  )
}

export default PromotorAgendamientoPage