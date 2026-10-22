import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Mail,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import PromotorLayout from '../components/PromotorLayout'
import '../styles/PromotorPages.css'

type ClienteDemo = {
  id: number
  dni: string
  nombres: string
  apellidos: string
  telefono: string
  correo: string
  fechaNacimiento: string
  consultas: number
}

type FormularioCliente = {
  dni: string
  nombres: string
  apellidos: string
  telefono: string
  correo: string
  fechaNacimiento: string
}

const clientesDemo: ClienteDemo[] = [
  {
    id: 1,
    dni: '74859621',
    nombres: 'María Fernanda',
    apellidos: 'López García',
    telefono: '987654321',
    correo: 'maria.lopez@email.com',
    fechaNacimiento: '1998-04-15',
    consultas: 2,
  },
  {
    id: 2,
    dni: '70541236',
    nombres: 'Diego',
    apellidos: 'Salazar Mendoza',
    telefono: '912345678',
    correo: 'diego.salazar@email.com',
    fechaNacimiento: '1995-08-22',
    consultas: 1,
  },
  {
    id: 3,
    dni: '71652348',
    nombres: 'Lucía',
    apellidos: 'Torres García',
    telefono: '956321478',
    correo: 'lucia.torres@email.com',
    fechaNacimiento: '2001-02-10',
    consultas: 0,
  },
]

const formularioInicial: FormularioCliente = {
  dni: '',
  nombres: '',
  apellidos: '',
  telefono: '',
  correo: '',
  fechaNacimiento: '',
}

function PromotorClientesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const dniInicial = searchParams.get('dni') ?? ''

  const [busqueda, setBusqueda] = useState(dniInicial)
  const [mostrarRegistro, setMostrarRegistro] = useState(false)

  const [formulario, setFormulario] = useState<FormularioCliente>({
    ...formularioInicial,
    dni: /^\d{8}$/.test(dniInicial) ? dniInicial : '',
  })

  const clientesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    if (!termino) return clientesDemo

    return clientesDemo.filter(
      (cliente) =>
        cliente.dni.includes(termino) ||
        `${cliente.nombres} ${cliente.apellidos}`
          .toLowerCase()
          .includes(termino),
    )
  }, [busqueda])

  const abrirRegistro = () => {
    setFormulario({
      ...formularioInicial,
      dni: /^\d{8}$/.test(busqueda.trim())
        ? busqueda.trim()
        : '',
    })

    setMostrarRegistro(true)
  }

  const cerrarRegistro = () => {
    setMostrarRegistro(false)
    setFormulario(formularioInicial)
  }

  const actualizarCampo = (
    campo: keyof FormularioCliente,
    valor: string,
  ) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }))
  }

  const formularioCompleto =
    formulario.dni.length === 8 &&
    formulario.nombres.trim() !== '' &&
    formulario.apellidos.trim() !== '' &&
    formulario.correo.trim() !== '' &&
    formulario.fechaNacimiento !== ''

  const registrarCliente = () => {
    if (!formularioCompleto) return

    /*
     * El promotor NO crea aquí las credenciales de acceso
     * del cliente.
     */

    console.log('Registrar cliente - demo', formulario)

    setMostrarRegistro(false)

    navigate(
      `/promotor/compras?dni=${encodeURIComponent(formulario.dni)}`,
    )
  }

  return (
    <PromotorLayout>
      <div className="promotor-page">
        <section className="promotor-heading">
          <div>
            <span>Atención al cliente</span>
            <h1>Clientes</h1>
            <p>
              Busca primero al cliente por DNI antes de registrar una
              nueva adquisición.
            </p>
          </div>

          <button
            type="button"
            className="promotor-primary-button"
            onClick={abrirRegistro}
          >
            <Plus size={16} />
            Registrar cliente
          </button>
        </section>

        <section className="promotor-section-card">
          <div className="promotor-list-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Buscar por DNI o nombre..."
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>

          <div className="promotor-table-wrapper">
            <table className="promotor-table">
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

                    <td>
                      {cliente.nombres} {cliente.apellidos}
                    </td>

                    <td>{cliente.telefono}</td>

                    <td>{cliente.correo}</td>

                    <td>
                      <span className="promotor-count">
                        {cliente.consultas}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="promotor-table-action"
                        onClick={() =>
                          navigate(
                            `/promotor/compras?dni=${cliente.dni}`,
                          )
                        }
                      >
                        <ShoppingBag size={14} />
                        Registrar compra
                      </button>
                    </td>
                  </tr>
                ))}

                {clientesFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <div className="promotor-empty">
                        <UserRound size={28} />

                        <strong>Cliente no encontrado</strong>

                        <span>
                          No encontramos un cliente con los datos
                          ingresados. Regístralo para continuar con la
                          compra.
                        </span>

                        <button
                          type="button"
                          onClick={abrirRegistro}
                        >
                          <Plus size={15} />
                          Registrar cliente
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {mostrarRegistro && (
          <div className="promotor-modal-backdrop">
            <section className="promotor-modal">
              <div className="promotor-modal-heading">
                <div>
                  <span>Nuevo cliente</span>
                  <h2>Registrar cliente</h2>
                  <p>
                    Completa los datos del cliente para poder asociar
                    su adquisición.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={cerrarRegistro}
                  aria-label="Cerrar"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="promotor-form-grid">
                <label>
                  DNI *
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder="8 dígitos"
                    value={formulario.dni}
                    onChange={(event) =>
                      actualizarCampo(
                        'dni',
                        event.target.value.replace(/\D/g, ''),
                      )
                    }
                  />
                </label>

                <label>
                  Fecha de nacimiento *
                  <div className="promotor-input-icon">
                    <CalendarDays size={15} />

                    <input
                      type="date"
                      value={formulario.fechaNacimiento}
                      onChange={(event) =>
                        actualizarCampo(
                          'fechaNacimiento',
                          event.target.value,
                        )
                      }
                    />
                  </div>
                </label>

                <label>
                  Nombres *
                  <input
                    type="text"
                    placeholder="Nombres del cliente"
                    value={formulario.nombres}
                    onChange={(event) =>
                      actualizarCampo(
                        'nombres',
                        event.target.value,
                      )
                    }
                  />
                </label>

                <label>
                  Apellidos *
                  <input
                    type="text"
                    placeholder="Apellidos del cliente"
                    value={formulario.apellidos}
                    onChange={(event) =>
                      actualizarCampo(
                        'apellidos',
                        event.target.value,
                      )
                    }
                  />
                </label>

                <label>
                  Teléfono
                  <div className="promotor-input-icon">
                    <Phone size={15} />

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={9}
                      placeholder="Número de teléfono"
                      value={formulario.telefono}
                      onChange={(event) =>
                        actualizarCampo(
                          'telefono',
                          event.target.value.replace(/\D/g, ''),
                        )
                      }
                    />
                  </div>
                </label>

                <label>
                  Correo electrónico *
                  <div className="promotor-input-icon">
                    <Mail size={15} />

                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formulario.correo}
                      onChange={(event) =>
                        actualizarCampo(
                          'correo',
                          event.target.value,
                        )
                      }
                    />
                  </div>
                </label>
              </div>

              <div className="promotor-demo-note">
                El perfil será registrado automáticamente como
                <strong> CLIENTE</strong>. El promotor registra los
                datos necesarios para asociar la compra, pero no crea
                aquí las credenciales de acceso del cliente.
              </div>

              <div className="promotor-modal-actions">
                <button
                  type="button"
                  className="promotor-secondary-button"
                  onClick={cerrarRegistro}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="promotor-primary-button"
                  disabled={!formularioCompleto}
                  onClick={registrarCliente}
                  style={{
                    opacity: formularioCompleto ? 1 : 0.5,
                    cursor: formularioCompleto
                      ? 'pointer'
                      : 'not-allowed',
                  }}
                >
                  Registrar y continuar
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </PromotorLayout>
  )
}

export default PromotorClientesPage