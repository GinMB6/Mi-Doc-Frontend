import { useMemo, useState } from 'react'
import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  Search,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import PromotorLayout from '../components/PromotorLayout'
import '../styles/PromotorPages.css'

type EstadoPago = 'PAGADA' | 'PENDIENTE'
type EstadoConsulta =
  | 'DISPONIBLE'
  | 'AGENDADA'
  | 'UTILIZADA'
  | 'VENCIDA'

type ConsultaDemo = {
  id: string
  dni: string
  cliente: string
  especialidad: string | null
  fechaCompra: string
  vencimiento: string
  precio: number
  estadoPago: EstadoPago
  estadoConsulta: EstadoConsulta
  canal: 'BCP' | 'CLINICA' | 'WEB'
  lugar: string
}

const consultasDemo: ConsultaDemo[] = [
  {
    id: '001',
    dni: '74859621',
    cliente: 'María Fernanda López García',
    especialidad: null,
    fechaCompra: '20/10/2026',
    vencimiento: '20/11/2026',
    precio: 80,
    estadoPago: 'PAGADA',
    estadoConsulta: 'DISPONIBLE',
    canal: 'BCP',
    lugar: 'Agencia BCP Centro Cívico',
  },
  {
    id: '002',
    dni: '70541236',
    cliente: 'Diego Salazar Mendoza',
    especialidad: 'Dermatología',
    fechaCompra: '18/10/2026',
    vencimiento: '18/11/2026',
    precio: 100,
    estadoPago: 'PENDIENTE',
    estadoConsulta: 'DISPONIBLE',
    canal: 'WEB',
    lugar: 'Plataforma web',
  },
  {
    id: '003',
    dni: '74859621',
    cliente: 'María Fernanda López García',
    especialidad: 'Cardiología',
    fechaCompra: '10/10/2026',
    vencimiento: '10/11/2026',
    precio: 120,
    estadoPago: 'PAGADA',
    estadoConsulta: 'AGENDADA',
    canal: 'BCP',
    lugar: 'Agencia BCP Centro Cívico',
  },
  {
    id: '004',
    dni: '71652348',
    cliente: 'Lucía Torres García',
    especialidad: 'Medicina General',
    fechaCompra: '02/09/2026',
    vencimiento: '02/10/2026',
    precio: 70,
    estadoPago: 'PAGADA',
    estadoConsulta: 'UTILIZADA',
    canal: 'CLINICA',
    lugar: 'Sede Pro',
  },
]

function PromotorConsultasPage() {
  const navigate = useNavigate()

  const [busqueda, setBusqueda] = useState('')
  const [filtroPago, setFiltroPago] = useState('TODOS')
  const [filtroEstado, setFiltroEstado] = useState('TODOS')
  const [consultaSeleccionada, setConsultaSeleccionada] =
    useState<ConsultaDemo | null>(null)

  const consultasFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return consultasDemo.filter((consulta) => {
      const coincideBusqueda =
        !termino ||
        consulta.id.toLowerCase().includes(termino) ||
        consulta.dni.includes(termino) ||
        consulta.cliente.toLowerCase().includes(termino) ||
        consulta.especialidad?.toLowerCase().includes(termino)

      const coincidePago =
        filtroPago === 'TODOS' ||
        consulta.estadoPago === filtroPago

      const coincideEstado =
        filtroEstado === 'TODOS' ||
        consulta.estadoConsulta === filtroEstado

      return (
        coincideBusqueda &&
        coincidePago &&
        coincideEstado
      )
    })
  }, [busqueda, filtroPago, filtroEstado])

  const clasePago = (estado: EstadoPago) =>
    estado === 'PAGADA'
      ? 'promotor-status paid'
      : 'promotor-status pending'

  const claseConsulta = (estado: EstadoConsulta) =>
    `promotor-status ${estado.toLowerCase()}`

  return (
    <PromotorLayout>
      <div className="promotor-page">
        <section className="promotor-heading">
          <div>
            <span>Consultas adquiridas</span>
            <h1>Consultas</h1>
            <p>
              Consulta las adquisiciones registradas y brinda
              asistencia al cliente según su estado.
            </p>
          </div>
        </section>

        <section className="promotor-section-card">
          <div className="promotor-consultas-toolbar">
            <div className="promotor-list-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="DNI, cliente, consulta o especialidad..."
                value={busqueda}
                onChange={(event) =>
                  setBusqueda(event.target.value)
                }
              />
            </div>

            <div className="promotor-filter-group">
              <select
                value={filtroPago}
                onChange={(event) =>
                  setFiltroPago(event.target.value)
                }
              >
                <option value="TODOS">Todos los pagos</option>
                <option value="PAGADA">Pagadas</option>
                <option value="PENDIENTE">Pendientes</option>
              </select>

              <select
                value={filtroEstado}
                onChange={(event) =>
                  setFiltroEstado(event.target.value)
                }
              >
                <option value="TODOS">Todos los estados</option>
                <option value="DISPONIBLE">Disponibles</option>
                <option value="AGENDADA">Agendadas</option>
                <option value="UTILIZADA">Utilizadas</option>
                <option value="VENCIDA">Vencidas</option>
              </select>
            </div>
          </div>

          <div className="promotor-table-wrapper">
            <table className="promotor-table">
              <thead>
                <tr>
                  <th>Consulta</th>
                  <th>DNI</th>
                  <th>Cliente</th>
                  <th>Especialidad</th>
                  <th>Vigencia</th>
                  <th>Pago</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {consultasFiltradas.map((consulta) => (
                  <tr key={consulta.id}>
                    <td>
                      <strong>#{consulta.id}</strong>
                    </td>

                    <td>{consulta.dni}</td>

                    <td>{consulta.cliente}</td>

                    <td>
                      {consulta.especialidad ?? (
                        <span className="promotor-muted">
                          Por elegir
                        </span>
                      )}
                    </td>

                    <td>{consulta.vencimiento}</td>

                    <td>
                      <span
                        className={clasePago(
                          consulta.estadoPago,
                        )}
                      >
                        {consulta.estadoPago === 'PAGADA'
                          ? 'Pagada'
                          : 'Pendiente'}
                      </span>
                    </td>

                    <td>
                      <span
                        className={claseConsulta(
                          consulta.estadoConsulta,
                        )}
                      >
                        {consulta.estadoConsulta}
                      </span>
                    </td>

                    <td>
                      <div className="promotor-row-actions">
                        <button
                          type="button"
                          className="promotor-icon-action"
                          onClick={() =>
                            setConsultaSeleccionada(consulta)
                          }
                          title="Ver detalle"
                        >
                          <Eye size={15} />
                        </button>

                        {consulta.estadoConsulta ===
                          'DISPONIBLE' && (
                          <button
                            type="button"
                            className="promotor-table-action"
                            onClick={() =>
                              navigate(
                                `/promotor/agendamiento?consulta=${consulta.id}&dni=${consulta.dni}`,
                              )
                            }
                          >
                            <CalendarPlus size={14} />
                            Agendar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {consultasFiltradas.length === 0 && (
                  <tr>
                    <td colSpan={8}>
                      <div className="promotor-empty">
                        <Search size={28} />
                        <strong>
                          No encontramos consultas
                        </strong>
                        <span>
                          Prueba modificando la búsqueda o los
                          filtros seleccionados.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="promotor-demo-note">
          Los datos mostrados son temporales. Cuando conectemos Flask
          y Supabase, las consultas, pagos, vigencias y estados se
          obtendrán directamente de la base de datos.
        </div>

        {consultaSeleccionada && (
          <div className="promotor-modal-backdrop">
            <section className="promotor-modal">
              <div className="promotor-modal-heading">
                <div>
                  <span>
                    Consulta #{consultaSeleccionada.id}
                  </span>
                  <h2>Detalle de la consulta</h2>
                  <p>
                    Información de la adquisición asociada al
                    cliente.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setConsultaSeleccionada(null)
                  }
                  aria-label="Cerrar"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="promotor-detail-client">
                <div className="promotor-detail-icon">
                  <UserRound size={21} />
                </div>

                <div>
                  <span>Cliente</span>
                  <strong>
                    {consultaSeleccionada.cliente}
                  </strong>
                  <p>DNI {consultaSeleccionada.dni}</p>
                </div>
              </div>

              <div className="promotor-detail-grid">
                <article>
                  <Stethoscope size={17} />
                  <span>Especialidad</span>
                  <strong>
                    {consultaSeleccionada.especialidad ??
                      'Por elegir'}
                  </strong>
                </article>

                <article>
                  <CreditCard size={17} />
                  <span>Estado de pago</span>
                  <strong>
                    {consultaSeleccionada.estadoPago ===
                    'PAGADA'
                      ? 'Pagada'
                      : 'Pendiente'}
                  </strong>
                </article>

                <article>
                  <CalendarDays size={17} />
                  <span>Fecha de compra</span>
                  <strong>
                    {consultaSeleccionada.fechaCompra}
                  </strong>
                </article>

                <article>
                  <Clock3 size={17} />
                  <span>Vencimiento</span>
                  <strong>
                    {consultaSeleccionada.vencimiento}
                  </strong>
                </article>

                <article>
                  <CheckCircle2 size={17} />
                  <span>Estado</span>
                  <strong>
                    {consultaSeleccionada.estadoConsulta}
                  </strong>
                </article>

                <article>
                  <CreditCard size={17} />
                  <span>Precio</span>
                  <strong>
                    S/ {consultaSeleccionada.precio.toFixed(2)}
                  </strong>
                </article>
              </div>

              <div className="promotor-acquisition-detail">
                <span>Adquisición</span>
                <strong>
                  Canal {consultaSeleccionada.canal}
                </strong>
                <p>{consultaSeleccionada.lugar}</p>
              </div>

              <div className="promotor-modal-actions">
                <button
                  type="button"
                  className="promotor-secondary-button"
                  onClick={() =>
                    setConsultaSeleccionada(null)
                  }
                >
                  Cerrar
                </button>

                {consultaSeleccionada.estadoConsulta ===
                  'DISPONIBLE' && (
                  <button
                    type="button"
                    className="promotor-primary-button"
                    onClick={() =>
                      navigate(
                        `/promotor/agendamiento?consulta=${consultaSeleccionada.id}&dni=${consultaSeleccionada.dni}`,
                      )
                    }
                  >
                    <CalendarPlus size={15} />
                    Agendar consulta
                  </button>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </PromotorLayout>
  )
}

export default PromotorConsultasPage