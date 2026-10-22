import { useMemo, useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Mail,
  Phone,
  Search,
  UserRound,
  X,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import RecepcionLayout from '../components/RecepcionLayout'
import '../styles/RecepcionPages.css'

type EstadoPago = 'PAGADA' | 'PENDIENTE'
type EstadoConsulta = 'DISPONIBLE' | 'AGENDADA' | 'UTILIZADA'

type ConsultaDemo = {
  id: string
  especialidad: string
  estadoPago: EstadoPago
  estadoConsulta: EstadoConsulta
  vencimiento: string
}

type ClienteDemo = {
  id: number
  dni: string
  nombres: string
  telefono: string
  correo: string
  consultas: ConsultaDemo[]
}

const clientesDemo: ClienteDemo[] = [
  {
    id: 1,
    dni: '74859621',
    nombres: 'María Fernanda López',
    telefono: '987654321',
    correo: 'maria.lopez@email.com',
    consultas: [
      {
        id: '003',
        especialidad: 'Cardiología',
        estadoPago: 'PAGADA',
        estadoConsulta: 'AGENDADA',
        vencimiento: '15/11/2026',
      },
      {
        id: '005',
        especialidad: 'Sin especialidad asignada',
        estadoPago: 'PENDIENTE',
        estadoConsulta: 'DISPONIBLE',
        vencimiento: '20/11/2026',
      },
    ],
  },
  {
    id: 2,
    dni: '70541236',
    nombres: 'Diego Salazar Mendoza',
    telefono: '912345678',
    correo: 'diego.salazar@email.com',
    consultas: [
      {
        id: '006',
        especialidad: 'Dermatología',
        estadoPago: 'PAGADA',
        estadoConsulta: 'DISPONIBLE',
        vencimiento: '18/11/2026',
      },
    ],
  },
  {
    id: 3,
    dni: '71652348',
    nombres: 'Lucía Torres García',
    telefono: '956321478',
    correo: 'lucia.torres@email.com',
    consultas: [],
  },
]

function RecepcionClientesPage() {
  const [searchParams] = useSearchParams()
  const dniInicial = searchParams.get('dni') ?? ''

  const [busqueda, setBusqueda] = useState(dniInicial)
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<ClienteDemo | null>(null)

  const clientesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    if (!termino) return clientesDemo

    return clientesDemo.filter(
      (cliente) =>
        cliente.dni.includes(termino) ||
        cliente.nombres.toLowerCase().includes(termino),
    )
  }, [busqueda])

  return (
    <RecepcionLayout>
      <div className="recepcion-page">
        <section className="recepcion-heading">
          <div>
            <span>Gestión de clientes</span>
            <h1>Clientes</h1>
            <p>
              Busca rápidamente a un cliente por DNI o nombre y consulta
              su información.
            </p>
          </div>

          <div className="recepcion-heading-icon">
            <UserRound size={27} />
          </div>
        </section>

        <section className="recepcion-section-card">
          <div className="recepcion-list-toolbar">
            <div className="recepcion-list-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Buscar por DNI o nombre..."
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
              />
            </div>
          </div>

          <div className="recepcion-table-wrapper">
            <table className="recepcion-table">
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Consultas</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>
                      <strong>{cliente.dni}</strong>
                    </td>

                    <td>{cliente.nombres}</td>

                    <td>{cliente.telefono}</td>

                    <td>{cliente.correo}</td>

                    <td>
                      <span className="recepcion-count-badge">
                        {cliente.consultas.length}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="recepcion-primary-small"
                        onClick={() =>
                          setClienteSeleccionado(cliente)
                        }
                      >
                        Ver cliente
                      </button>
                    </td>
                  </tr>
                ))}

                {clientesFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <div className="recepcion-empty">
                        <Search size={25} />
                        <strong>No encontramos ese cliente</strong>
                        <span>
                          Verifica el DNI o nombre ingresado.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {clienteSeleccionado && (
          <div className="recepcion-modal-backdrop">
            <section className="recepcion-modal large">
              <div className="recepcion-modal-heading">
                <div>
                  <span>Información del cliente</span>
                  <h2>{clienteSeleccionado.nombres}</h2>
                  <p>DNI {clienteSeleccionado.dni}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setClienteSeleccionado(null)}
                  aria-label="Cerrar"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="recepcion-client-info">
                <div>
                  <Phone size={16} />
                  <span>
                    Teléfono
                    <strong>{clienteSeleccionado.telefono}</strong>
                  </span>
                </div>

                <div>
                  <Mail size={16} />
                  <span>
                    Correo
                    <strong>{clienteSeleccionado.correo}</strong>
                  </span>
                </div>
              </div>

              <div className="recepcion-client-consultas">
                <div className="recepcion-subheading">
                  <div>
                    <span>Consultas adquiridas</span>
                    <h3>
                      Consultas del cliente (
                      {clienteSeleccionado.consultas.length})
                    </h3>
                  </div>
                </div>

                {clienteSeleccionado.consultas.length > 0 ? (
                  <div className="recepcion-consulta-list">
                    {clienteSeleccionado.consultas.map((consulta) => (
                      <article
                        key={consulta.id}
                        className="recepcion-consulta-item"
                      >
                        <div>
                          <span>Consulta #{consulta.id}</span>
                          <strong>{consulta.especialidad}</strong>
                        </div>

                        <div>
                          <span>Estado</span>
                          <strong>{consulta.estadoConsulta}</strong>
                        </div>

                        <div>
                          <span>Vigencia</span>
                          <strong>{consulta.vencimiento}</strong>
                        </div>

                        <div>
                          <span>Estado de pago</span>

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
                              <CreditCard size={13} />
                            )}

                            {consulta.estadoPago === 'PAGADA'
                              ? 'Pagada'
                              : 'Pendiente'}
                          </span>
                        </div>

                        {consulta.estadoPago === 'PENDIENTE' && (
                          <button
                            type="button"
                            className="recepcion-confirm-payment"
                          >
                            Confirmar pago
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="recepcion-empty compact">
                    <CalendarDays size={24} />
                    <strong>No tiene consultas registradas</strong>
                  </div>
                )}
              </div>

              <div className="recepcion-demo-notice">
                Los datos y acciones de esta pantalla son temporales para
                validar la interfaz. La confirmación real del pago se
                realizará mediante Flask y Supabase.
              </div>
            </section>
          </div>
        )}
      </div>
    </RecepcionLayout>
  )
}

export default RecepcionClientesPage