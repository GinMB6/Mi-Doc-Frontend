import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Clock3,
  Eye,
  MapPin,
  Search,
  UserRound,
  X,
} from 'lucide-react'

import RecepcionLayout from '../components/RecepcionLayout'
import '../styles/RecepcionPages.css'

type EstadoCita =
  | 'AGENDADA'
  | 'ATENDIDA'
  | 'CANCELADA'
  | 'NO_ASISTIO'

type CitaRecepcion = {
  id: number
  consultaId: string
  dni: string
  cliente: string
  especialidad: string
  doctor: string
  sede: 'Pro' | 'Izaguirre'
  fecha: string
  hora: string
  duracion: number
  estado: EstadoCita
  reprogramacionesCliente: number
}

const citasDemo: CitaRecepcion[] = [
  {
    id: 1,
    consultaId: '003',
    dni: '74859621',
    cliente: 'María Fernanda López',
    especialidad: 'Cardiología',
    doctor: 'Dr. Carlos Ramírez',
    sede: 'Pro',
    fecha: '28/10/2026',
    hora: '10:30 a. m.',
    duracion: 30,
    estado: 'AGENDADA',
    reprogramacionesCliente: 1,
  },
  {
    id: 2,
    consultaId: '006',
    dni: '70541236',
    cliente: 'Diego Salazar Mendoza',
    especialidad: 'Dermatología',
    doctor: 'Dra. Ana Torres',
    sede: 'Pro',
    fecha: '06/11/2026',
    hora: '11:00 a. m.',
    duracion: 30,
    estado: 'AGENDADA',
    reprogramacionesCliente: 2,
  },
  {
    id: 3,
    consultaId: '004',
    dni: '71652348',
    cliente: 'Lucía Torres García',
    especialidad: 'Medicina General',
    doctor: 'Dra. María López',
    sede: 'Izaguirre',
    fecha: '05/10/2026',
    hora: '09:00 a. m.',
    duracion: 30,
    estado: 'ATENDIDA',
    reprogramacionesCliente: 0,
  },
  {
    id: 4,
    consultaId: '008',
    dni: '72345681',
    cliente: 'Pedro Ramos Silva',
    especialidad: 'Cardiología',
    doctor: 'Dr. Carlos Ramírez',
    sede: 'Pro',
    fecha: '12/10/2026',
    hora: '03:00 p. m.',
    duracion: 30,
    estado: 'CANCELADA',
    reprogramacionesCliente: 1,
  },
  {
    id: 5,
    consultaId: '009',
    dni: '73452168',
    cliente: 'Andrea Mendoza Ruiz',
    especialidad: 'Dermatología',
    doctor: 'Dra. Ana Torres',
    sede: 'Izaguirre',
    fecha: '16/10/2026',
    hora: '04:30 p. m.',
    duracion: 30,
    estado: 'NO_ASISTIO',
    reprogramacionesCliente: 0,
  },
]

function RecepcionCitasPage() {
  const [busqueda, setBusqueda] = useState('')

  const [filtroEstado, setFiltroEstado] = useState<
    'TODOS' | EstadoCita
  >('TODOS')

  const [filtroSede, setFiltroSede] = useState<
    'TODAS' | 'Pro' | 'Izaguirre'
  >('TODAS')

  const [citaSeleccionada, setCitaSeleccionada] =
    useState<CitaRecepcion | null>(null)

  const citasFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return citasDemo.filter((cita) => {
      const coincideBusqueda =
        !termino ||
        cita.dni.includes(termino) ||
        cita.cliente.toLowerCase().includes(termino) ||
        cita.doctor.toLowerCase().includes(termino) ||
        cita.consultaId.includes(termino)

      const coincideEstado =
        filtroEstado === 'TODOS' ||
        cita.estado === filtroEstado

      const coincideSede =
        filtroSede === 'TODAS' ||
        cita.sede === filtroSede

      return (
        coincideBusqueda &&
        coincideEstado &&
        coincideSede
      )
    })
  }, [busqueda, filtroEstado, filtroSede])

  return (
    <RecepcionLayout>
      <div className="recepcion-page">
        <section className="recepcion-heading">
          <div>
            <span>Gestión de citas</span>
            <h1>Citas médicas</h1>
            <p>
              Busca y consulta las citas programadas de los
              clientes de MiDoc.
            </p>
          </div>

          <div className="recepcion-heading-icon">
            <CalendarDays size={27} />
          </div>
        </section>

        <section className="recepcion-section-card">
          <div className="recepcion-consultas-toolbar">
            <div className="recepcion-list-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Buscar por DNI, cliente, doctor o consulta..."
                value={busqueda}
                onChange={(event) =>
                  setBusqueda(event.target.value)
                }
              />
            </div>

            <div className="recepcion-filter-group">
              <select
                value={filtroSede}
                onChange={(event) =>
                  setFiltroSede(
                    event.target.value as
                      | 'TODAS'
                      | 'Pro'
                      | 'Izaguirre',
                  )
                }
              >
                <option value="TODAS">
                  Todas las sedes
                </option>
                <option value="Pro">Sede Pro</option>
                <option value="Izaguirre">
                  Sede Izaguirre
                </option>
              </select>

              <select
                value={filtroEstado}
                onChange={(event) =>
                  setFiltroEstado(
                    event.target.value as
                      | 'TODOS'
                      | EstadoCita,
                  )
                }
              >
                <option value="TODOS">
                  Todos los estados
                </option>
                <option value="AGENDADA">
                  Agendadas
                </option>
                <option value="ATENDIDA">
                  Atendidas
                </option>
                <option value="CANCELADA">
                  Canceladas
                </option>
                <option value="NO_ASISTIO">
                  No asistió
                </option>
              </select>
            </div>
          </div>

          <div className="recepcion-table-wrapper">
            <table className="recepcion-table">
              <thead>
                <tr>
                  <th>Fecha / Hora</th>
                  <th>DNI</th>
                  <th>Cliente</th>
                  <th>Especialidad</th>
                  <th>Doctor</th>
                  <th>Sede</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {citasFiltradas.map((cita) => (
                  <tr key={cita.id}>
                    <td>
                      <div className="recepcion-date-cell">
                        <CalendarDays size={14} />
                        <span>
                          <strong>{cita.fecha}</strong>
                          {cita.hora}
                        </span>
                      </div>
                    </td>

                    <td>
                      <strong>{cita.dni}</strong>
                    </td>

                    <td>{cita.cliente}</td>

                    <td>{cita.especialidad}</td>

                    <td>{cita.doctor}</td>

                    <td>
                      <div className="recepcion-sede-cell">
                        <MapPin size={13} />
                        {cita.sede}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`recepcion-cita-status ${cita.estado.toLowerCase()}`}
                      >
                        {cita.estado === 'AGENDADA'
                          ? 'Agendada'
                          : cita.estado === 'ATENDIDA'
                            ? 'Atendida'
                            : cita.estado ===
                                'NO_ASISTIO'
                              ? 'No asistió'
                              : 'Cancelada'}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="recepcion-icon-button"
                        title="Ver detalle"
                        onClick={() =>
                          setCitaSeleccionada(cita)
                        }
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}

                {citasFiltradas.length === 0 && (
                  <tr>
                    <td colSpan={8}>
                      <div className="recepcion-empty">
                        <Search size={25} />
                        <strong>
                          No encontramos citas
                        </strong>
                        <span>
                          Cambia la búsqueda o los filtros.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {citaSeleccionada && (
          <div className="recepcion-modal-backdrop">
            <section className="recepcion-modal">
              <div className="recepcion-modal-heading">
                <div>
                  <span>Detalle de cita</span>
                  <h2>{citaSeleccionada.cliente}</h2>
                  <p>
                    Consulta #
                    {citaSeleccionada.consultaId}
                  </p>
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

              <div className="recepcion-cita-patient">
                <div className="recepcion-patient-avatar">
                  <UserRound size={22} />
                </div>

                <div>
                  <span>Paciente</span>
                  <strong>
                    {citaSeleccionada.cliente}
                  </strong>
                  <p>DNI {citaSeleccionada.dni}</p>
                </div>
              </div>

              <div className="recepcion-detail-grid">
                <div>
                  <span>Especialidad</span>
                  <strong>
                    {citaSeleccionada.especialidad}
                  </strong>
                </div>

                <div>
                  <span>Doctor</span>
                  <strong>
                    {citaSeleccionada.doctor}
                  </strong>
                </div>

                <div>
                  <span>Sede</span>
                  <strong>
                    {citaSeleccionada.sede}
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
                  <span
                    className={`recepcion-cita-status ${citaSeleccionada.estado.toLowerCase()}`}
                  >
                    {citaSeleccionada.estado ===
                    'NO_ASISTIO'
                      ? 'No asistió'
                      : citaSeleccionada.estado}
                  </span>
                </div>

                <div>
                  <span>
                    Reprogramaciones del cliente
                  </span>
                  <strong>
                    {
                      citaSeleccionada.reprogramacionesCliente
                    }{' '}
                    de 2
                  </strong>
                </div>
              </div>

              {citaSeleccionada.estado ===
                'AGENDADA' && (
                <div className="recepcion-cita-note">
                  <Clock3 size={17} />

                  <div>
                    <strong>
                      Cita actualmente programada
                    </strong>
                    <p>
                      Los cambios realizados por la clínica
                      no consumen una de las 2
                      reprogramaciones gratuitas del
                      cliente.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </RecepcionLayout>
  )
}

export default RecepcionCitasPage