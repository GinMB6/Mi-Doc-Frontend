import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  Search,
  X,
} from 'lucide-react'

import RecepcionLayout from '../components/RecepcionLayout'
import '../styles/RecepcionPages.css'

type EstadoPago = 'PAGADA' | 'PENDIENTE'

type EstadoConsulta =
  | 'DISPONIBLE'
  | 'AGENDADA'
  | 'UTILIZADA'
  | 'VENCIDA'

type ConsultaRecepcion = {
  id: string
  dni: string
  cliente: string
  especialidad: string
  fechaCompra: string
  vencimiento: string
  estadoPago: EstadoPago
  fechaPago?: string
  estadoConsulta: EstadoConsulta
}

const consultasDemo: ConsultaRecepcion[] = [
  {
    id: '001',
    dni: '74859621',
    cliente: 'María Fernanda López',
    especialidad: 'Sin especialidad asignada',
    fechaCompra: '20/10/2026',
    vencimiento: '20/11/2026',
    estadoPago: 'PENDIENTE',
    estadoConsulta: 'DISPONIBLE',
  },
  {
    id: '002',
    dni: '70541236',
    cliente: 'Diego Salazar Mendoza',
    especialidad: 'Dermatología',
    fechaCompra: '18/10/2026',
    vencimiento: '18/11/2026',
    estadoPago: 'PAGADA',
    fechaPago: '18/10/2026',
    estadoConsulta: 'DISPONIBLE',
  },
  {
    id: '003',
    dni: '74859621',
    cliente: 'María Fernanda López',
    especialidad: 'Cardiología',
    fechaCompra: '15/10/2026',
    vencimiento: '15/11/2026',
    estadoPago: 'PAGADA',
    fechaPago: '15/10/2026',
    estadoConsulta: 'AGENDADA',
  },
  {
    id: '004',
    dni: '71652348',
    cliente: 'Lucía Torres García',
    especialidad: 'Medicina General',
    fechaCompra: '02/09/2026',
    vencimiento: '02/10/2026',
    estadoPago: 'PAGADA',
    fechaPago: '02/09/2026',
    estadoConsulta: 'UTILIZADA',
  },
  {
    id: '005',
    dni: '72345681',
    cliente: 'Pedro Ramos Silva',
    especialidad: 'Dermatología',
    fechaCompra: '01/09/2026',
    vencimiento: '01/10/2026',
    estadoPago: 'PENDIENTE',
    estadoConsulta: 'VENCIDA',
  },
]

function RecepcionConsultasPage() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroPago, setFiltroPago] = useState<
    'TODAS' | EstadoPago
  >('TODAS')

  const [filtroEstado, setFiltroEstado] = useState<
    'TODOS' | EstadoConsulta
  >('TODOS')

  const [consultaSeleccionada, setConsultaSeleccionada] =
    useState<ConsultaRecepcion | null>(null)

  const [consultaConfirmarPago, setConsultaConfirmarPago] =
    useState<ConsultaRecepcion | null>(null)

  const consultasFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return consultasDemo.filter((consulta) => {
      const coincideBusqueda =
        !termino ||
        consulta.dni.includes(termino) ||
        consulta.cliente.toLowerCase().includes(termino) ||
        consulta.id.includes(termino)

      const coincidePago =
        filtroPago === 'TODAS' ||
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

  const confirmarPago = () => {
    if (!consultaConfirmarPago) return

    /*
     * DEMO VISUAL TEMPORAL.
     *
     * La confirmación real será realizada por Flask.
     * El backend actualizará estado_pago, fecha_pago
     * y confirmado_por en Supabase.
     */
    console.log(
      'Confirmar pago de consulta:',
      consultaConfirmarPago.id,
    )

    setConsultaConfirmarPago(null)
  }

  return (
    <RecepcionLayout>
      <div className="recepcion-page">
        <section className="recepcion-heading">
          <div>
            <span>Gestión de consultas</span>
            <h1>Consultas adquiridas</h1>
            <p>
              Consulta rápidamente el estado, vigencia y pago
              de las consultas de los clientes.
            </p>
          </div>

          <div className="recepcion-heading-icon">
            <CreditCard size={27} />
          </div>
        </section>

        <section className="recepcion-section-card">
          <div className="recepcion-consultas-toolbar">
            <div className="recepcion-list-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Buscar por DNI, cliente o N.° de consulta..."
                value={busqueda}
                onChange={(event) =>
                  setBusqueda(event.target.value)
                }
              />
            </div>

            <div className="recepcion-filter-group">
              <select
                value={filtroPago}
                onChange={(event) =>
                  setFiltroPago(
                    event.target.value as
                      | 'TODAS'
                      | EstadoPago,
                  )
                }
              >
                <option value="TODAS">
                  Todos los pagos
                </option>
                <option value="PAGADA">Pagadas</option>
                <option value="PENDIENTE">
                  Pendientes
                </option>
              </select>

              <select
                value={filtroEstado}
                onChange={(event) =>
                  setFiltroEstado(
                    event.target.value as
                      | 'TODOS'
                      | EstadoConsulta,
                  )
                }
              >
                <option value="TODOS">
                  Todos los estados
                </option>
                <option value="DISPONIBLE">
                  Disponible
                </option>
                <option value="AGENDADA">
                  Agendada
                </option>
                <option value="UTILIZADA">
                  Utilizada
                </option>
                <option value="VENCIDA">
                  Vencida
                </option>
              </select>
            </div>
          </div>

          <div className="recepcion-table-wrapper">
            <table className="recepcion-table">
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

                    <td>
                      <strong>{consulta.dni}</strong>
                    </td>

                    <td>{consulta.cliente}</td>

                    <td>{consulta.especialidad}</td>

                    <td>{consulta.vencimiento}</td>

                    <td>
                      <span
                        className={`recepcion-payment-badge ${
                          consulta.estadoPago === 'PAGADA'
                            ? 'paid'
                            : 'pending'
                        }`}
                      >
                        {consulta.estadoPago === 'PAGADA' ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <Clock3 size={13} />
                        )}

                        {consulta.estadoPago === 'PAGADA'
                          ? 'Pagada'
                          : 'Pendiente'}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`recepcion-consulta-status ${consulta.estadoConsulta.toLowerCase()}`}
                      >
                        {consulta.estadoConsulta ===
                        'DISPONIBLE'
                          ? 'Disponible'
                          : consulta.estadoConsulta ===
                              'AGENDADA'
                            ? 'Agendada'
                            : consulta.estadoConsulta ===
                                'UTILIZADA'
                              ? 'Utilizada'
                              : 'Vencida'}
                      </span>
                    </td>

                    <td>
                      <div className="recepcion-actions">
                        <button
                          type="button"
                          className="recepcion-icon-button"
                          title="Ver detalle"
                          onClick={() =>
                            setConsultaSeleccionada(
                              consulta,
                            )
                          }
                        >
                          <Eye size={15} />
                        </button>

                        {consulta.estadoPago ===
                          'PENDIENTE' &&
                          consulta.estadoConsulta !==
                            'VENCIDA' && (
                            <button
                              type="button"
                              className="recepcion-pay-button"
                              onClick={() =>
                                setConsultaConfirmarPago(
                                  consulta,
                                )
                              }
                            >
                              <CreditCard size={14} />
                              Confirmar pago
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}

                {consultasFiltradas.length === 0 && (
                  <tr>
                    <td colSpan={8}>
                      <div className="recepcion-empty">
                        <Search size={25} />
                        <strong>
                          No encontramos consultas
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

        {/* DETALLE DE CONSULTA */}
        {consultaSeleccionada && (
          <div className="recepcion-modal-backdrop">
            <section className="recepcion-modal">
              <div className="recepcion-modal-heading">
                <div>
                  <span>Detalle de consulta</span>
                  <h2>
                    Consulta #{consultaSeleccionada.id}
                  </h2>
                  <p>{consultaSeleccionada.cliente}</p>
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

              <div className="recepcion-detail-grid">
                <div>
                  <span>DNI</span>
                  <strong>
                    {consultaSeleccionada.dni}
                  </strong>
                </div>

                <div>
                  <span>Especialidad</span>
                  <strong>
                    {consultaSeleccionada.especialidad}
                  </strong>
                </div>

                <div>
                  <span>Fecha de adquisición</span>
                  <strong>
                    {consultaSeleccionada.fechaCompra}
                  </strong>
                </div>

                <div>
                  <span>Vigencia</span>
                  <strong>
                    {consultaSeleccionada.vencimiento}
                  </strong>
                </div>

                <div>
                  <span>Estado de consulta</span>
                  <strong>
                    {consultaSeleccionada.estadoConsulta}
                  </strong>
                </div>

                <div>
                  <span>Estado de pago</span>

                  <span
                    className={`recepcion-payment-badge ${
                      consultaSeleccionada.estadoPago ===
                      'PAGADA'
                        ? 'paid'
                        : 'pending'
                    }`}
                  >
                    {consultaSeleccionada.estadoPago ===
                    'PAGADA'
                      ? 'Pagada'
                      : 'Pendiente'}
                  </span>
                </div>

                {consultaSeleccionada.fechaPago && (
                  <div>
                    <span>Fecha de pago</span>
                    <strong>
                      {consultaSeleccionada.fechaPago}
                    </strong>
                  </div>
                )}
              </div>

              {consultaSeleccionada.estadoPago ===
                'PENDIENTE' &&
                consultaSeleccionada.estadoConsulta !==
                  'VENCIDA' && (
                  <button
                    type="button"
                    className="recepcion-modal-primary"
                    onClick={() => {
                      setConsultaSeleccionada(null)
                      setConsultaConfirmarPago(
                        consultaSeleccionada,
                      )
                    }}
                  >
                    <CreditCard size={16} />
                    Confirmar pago
                  </button>
                )}
            </section>
          </div>
        )}

        {/* CONFIRMACIÓN DE PAGO */}
        {consultaConfirmarPago && (
          <div className="recepcion-modal-backdrop">
            <section className="recepcion-modal small">
              <div className="recepcion-modal-heading">
                <div>
                  <span>Confirmación</span>
                  <h2>Confirmar pago</h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setConsultaConfirmarPago(null)
                  }
                  aria-label="Cerrar"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="recepcion-payment-confirm">
                <div className="recepcion-payment-confirm-icon">
                  <CreditCard size={25} />
                </div>

                <p>
                  Vas a confirmar como pagada la consulta{' '}
                  <strong>
                    #{consultaConfirmarPago.id}
                  </strong>{' '}
                  de{' '}
                  <strong>
                    {consultaConfirmarPago.cliente}
                  </strong>
                  .
                </p>

                <div className="recepcion-payment-warning">
                  Esta acción deberá quedar registrada con
                  fecha y usuario que confirmó el pago.
                </div>
              </div>

              <div className="recepcion-modal-actions">
                <button
                  type="button"
                  className="recepcion-secondary-button"
                  onClick={() =>
                    setConsultaConfirmarPago(null)
                  }
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="recepcion-modal-primary"
                  onClick={confirmarPago}
                >
                  <CheckCircle2 size={16} />
                  Sí, confirmar pago
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </RecepcionLayout>
  )
}

export default RecepcionConsultasPage