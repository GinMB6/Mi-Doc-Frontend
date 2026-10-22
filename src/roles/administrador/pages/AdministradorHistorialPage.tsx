import { useMemo, useState } from 'react'
import {
  Activity,
  CheckCircle2,
  Eye,
  Filter,
  History,
  Search,
  ShieldCheck,
  X,
  XCircle,
} from 'lucide-react'
import AdministradorLayout from '../components/AdministradorLayout'
import '../styles/AdministradorPages.css'

type RolOperacion =
  | 'ADMINISTRADOR'
  | 'DOCTOR'
  | 'RECEPCION'
  | 'PROMOTOR_BCP'
  | 'CLIENTE'

type ResultadoOperacion = 'EXITOSO' | 'RECHAZADO'

interface Operacion {
  id: number
  fecha: string
  hora: string
  usuario: string
  dni: string
  rol: RolOperacion
  accion: string
  entidad: string
  referencia: string
  resultado: ResultadoOperacion
  detalle: string
}

const operacionesDemo: Operacion[] = [
  {
    id: 1,
    fecha: '22/10/2026',
    hora: '10:32 a. m.',
    usuario: 'Andrea Castro Vega',
    dni: '43521678',
    rol: 'RECEPCION',
    accion: 'Registro de cita',
    entidad: 'Cita',
    referencia: 'Consulta #003',
    resultado: 'EXITOSO',
    detalle:
      'Se registró una cita para la consulta #003 asociada a María Fernanda López.',
  },
  {
    id: 2,
    fecha: '22/10/2026',
    hora: '10:08 a. m.',
    usuario: 'Luis Mendoza Ruiz',
    dni: '46987521',
    rol: 'PROMOTOR_BCP',
    accion: 'Registro de consulta adquirida',
    entidad: 'Consulta',
    referencia: 'Consulta #005',
    resultado: 'EXITOSO',
    detalle:
      'Se registró una consulta adquirida para el cliente Diego Salazar Mendoza.',
  },
  {
    id: 3,
    fecha: '22/10/2026',
    hora: '09:45 a. m.',
    usuario: 'María Fernanda López García',
    dni: '74859621',
    rol: 'CLIENTE',
    accion: 'Reprogramación de cita',
    entidad: 'Cita',
    referencia: 'Consulta #003',
    resultado: 'EXITOSO',
    detalle:
      'El cliente reprogramó correctamente su cita. La operación consume una de sus reprogramaciones gratuitas.',
  },
  {
    id: 4,
    fecha: '22/10/2026',
    hora: '09:20 a. m.',
    usuario: 'Carlos Ramírez Soto',
    dni: '48271635',
    rol: 'DOCTOR',
    accion: 'Actualización de estado',
    entidad: 'Cita',
    referencia: 'Cita #018',
    resultado: 'EXITOSO',
    detalle:
      'El doctor actualizó el estado de la cita registrada a ATENDIDA.',
  },
  {
    id: 5,
    fecha: '21/10/2026',
    hora: '04:18 p. m.',
    usuario: 'Valeria Rojas Silva',
    dni: '42156387',
    rol: 'ADMINISTRADOR',
    accion: 'Actualización de usuario',
    entidad: 'Usuario',
    referencia: 'DNI 45871236',
    resultado: 'EXITOSO',
    detalle:
      'Se modificó el estado de acceso de la cuenta del usuario seleccionado.',
  },
  {
    id: 6,
    fecha: '21/10/2026',
    hora: '03:42 p. m.',
    usuario: 'María Fernanda López García',
    dni: '74859621',
    rol: 'CLIENTE',
    accion: 'Reprogramación de cita',
    entidad: 'Cita',
    referencia: 'Consulta #003',
    resultado: 'RECHAZADO',
    detalle:
      'La solicitud de reprogramación no pudo completarse porque el horario seleccionado dejó de estar disponible.',
  },
  {
    id: 7,
    fecha: '21/10/2026',
    hora: '01:15 p. m.',
    usuario: 'Andrea Castro Vega',
    dni: '43521678',
    rol: 'RECEPCION',
    accion: 'Confirmación de pago',
    entidad: 'Consulta',
    referencia: 'Consulta #002',
    resultado: 'EXITOSO',
    detalle:
      'Se confirmó el estado de pago de la consulta #002 y se actualizó a PAGADA.',
  },
]

const etiquetasRol: Record<RolOperacion, string> = {
  ADMINISTRADOR: 'Administrador',
  DOCTOR: 'Doctor',
  RECEPCION: 'Recepción',
  PROMOTOR_BCP: 'Promotor BCP',
  CLIENTE: 'Cliente',
}

function AdministradorHistorialPage() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroRol, setFiltroRol] = useState<'TODOS' | RolOperacion>('TODOS')
  const [filtroResultado, setFiltroResultado] = useState<
    'TODOS' | ResultadoOperacion
  >('TODOS')
  const [filtroAccion, setFiltroAccion] = useState('TODAS')
  const [operacionSeleccionada, setOperacionSeleccionada] =
    useState<Operacion | null>(null)

  const acciones = useMemo(
    () => [...new Set(operacionesDemo.map((operacion) => operacion.accion))],
    [],
  )

  const operacionesFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return operacionesDemo.filter((operacion) => {
      const coincideBusqueda =
        !termino ||
        operacion.usuario.toLowerCase().includes(termino) ||
        operacion.dni.includes(termino) ||
        operacion.entidad.toLowerCase().includes(termino) ||
        operacion.referencia.toLowerCase().includes(termino) ||
        operacion.accion.toLowerCase().includes(termino)

      const coincideRol =
        filtroRol === 'TODOS' || operacion.rol === filtroRol

      const coincideResultado =
        filtroResultado === 'TODOS' ||
        operacion.resultado === filtroResultado

      const coincideAccion =
        filtroAccion === 'TODAS' || operacion.accion === filtroAccion

      return (
        coincideBusqueda &&
        coincideRol &&
        coincideResultado &&
        coincideAccion
      )
    })
  }, [busqueda, filtroRol, filtroResultado, filtroAccion])

  return (
    <AdministradorLayout>
      <div className="admin-page">
        <header className="admin-heading">
          <div>
            <span>Trazabilidad del sistema</span>
            <h1>Historial de operaciones</h1>
            <p>
              Consulta las operaciones registradas en MiDoc para identificar
              quién realizó una acción, cuándo ocurrió y cuál fue su resultado.
            </p>
          </div>

          <div className="admin-heading-icon">
            <History size={22} />
          </div>
        </header>

        <section className="admin-summary-grid">
          <article>
            <div className="admin-summary-icon">
              <Activity size={20} />
            </div>

            <div>
              <span>Operaciones registradas</span>
              <strong>{operacionesDemo.length}</strong>
              <small>Registros de demostración</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Operaciones exitosas</span>
              <strong>
                {
                  operacionesDemo.filter(
                    (operacion) => operacion.resultado === 'EXITOSO',
                  ).length
                }
              </strong>
              <small>Procesadas correctamente</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <XCircle size={20} />
            </div>

            <div>
              <span>Operaciones rechazadas</span>
              <strong>
                {
                  operacionesDemo.filter(
                    (operacion) => operacion.resultado === 'RECHAZADO',
                  ).length
                }
              </strong>
              <small>Sin modificación aplicada</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <span>Modo de consulta</span>
              <strong>Solo lectura</strong>
              <small>Los registros no se modifican</small>
            </div>
          </article>
        </section>

        <section className="admin-section-card">
          <div className="admin-section-heading">
            <div>
              <span>Auditoría</span>
              <h2>Registro de actividad</h2>
            </div>
          </div>

          <div className="admin-history-toolbar">
            <div className="admin-search">
              <Search size={15} />

              <input
                type="text"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Buscar por usuario, DNI, acción o referencia..."
              />
            </div>

            <div className="admin-history-filters">
              <div className="admin-filter-select">
                <Filter size={13} />

                <select
                  value={filtroRol}
                  onChange={(event) =>
                    setFiltroRol(event.target.value as 'TODOS' | RolOperacion)
                  }
                >
                  <option value="TODOS">Todos los roles</option>
                  <option value="ADMINISTRADOR">Administrador</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="RECEPCION">Recepción</option>
                  <option value="PROMOTOR_BCP">Promotor BCP</option>
                  <option value="CLIENTE">Cliente</option>
                </select>
              </div>

              <select
                className="admin-simple-select"
                value={filtroAccion}
                onChange={(event) => setFiltroAccion(event.target.value)}
              >
                <option value="TODAS">Todas las acciones</option>

                {acciones.map((accion) => (
                  <option key={accion} value={accion}>
                    {accion}
                  </option>
                ))}
              </select>

              <select
                className="admin-simple-select"
                value={filtroResultado}
                onChange={(event) =>
                  setFiltroResultado(
                    event.target.value as
                      | 'TODOS'
                      | ResultadoOperacion,
                  )
                }
              >
                <option value="TODOS">Todos los resultados</option>
                <option value="EXITOSO">Exitoso</option>
                <option value="RECHAZADO">Rechazado</option>
              </select>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table admin-history-table">
              <thead>
                <tr>
                  <th>Fecha y hora</th>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Acción</th>
                  <th>Entidad</th>
                  <th>Resultado</th>
                  <th>Detalle</th>
                </tr>
              </thead>

              <tbody>
                {operacionesFiltradas.map((operacion) => (
                  <tr key={operacion.id}>
                    <td>
                      <div className="admin-history-date">
                        <strong>{operacion.fecha}</strong>
                        <span>{operacion.hora}</span>
                      </div>
                    </td>

                    <td>
                      <div className="admin-history-user">
                        <strong>{operacion.usuario}</strong>
                        <span>DNI {operacion.dni}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`admin-role-badge ${operacion.rol.toLowerCase()}`}
                      >
                        {etiquetasRol[operacion.rol]}
                      </span>
                    </td>

                    <td>{operacion.accion}</td>

                    <td>
                      <div className="admin-history-entity">
                        <strong>{operacion.entidad}</strong>
                        <span>{operacion.referencia}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`admin-operation-result ${operacion.resultado.toLowerCase()}`}
                      >
                        {operacion.resultado === 'EXITOSO'
                          ? 'Exitoso'
                          : 'Rechazado'}
                      </span>
                    </td>

                    <td>
                      <button
                        className="admin-icon-button"
                        onClick={() =>
                          setOperacionSeleccionada(operacion)
                        }
                        title="Ver detalle"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {operacionesFiltradas.length === 0 && (
            <div className="admin-empty">
              <History size={27} />
              <strong>No se encontraron operaciones</strong>
              <span>
                Prueba con otros criterios de búsqueda o filtros.
              </span>
            </div>
          )}

          <div className="admin-results-count">
            Mostrando {operacionesFiltradas.length} de{' '}
            {operacionesDemo.length} operaciones
          </div>
        </section>

        <div className="admin-audit-info">
          <ShieldCheck size={17} />

          <div>
            <strong>Historial de solo lectura</strong>
            <span>
              Las operaciones registradas se muestran como evidencia de
              trazabilidad y no pueden editarse ni eliminarse desde esta
              sección.
            </span>
          </div>
        </div>

        <div className="admin-demo-note">
          Los registros mostrados son temporales para la demostración visual.
          Posteriormente, esta sección consumirá mediante Flask los registros
          de auditoría almacenados en Supabase.
        </div>
      </div>

      {operacionSeleccionada && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={() => setOperacionSeleccionada(null)}
        >
          <div
            className="admin-modal admin-history-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="admin-modal-heading">
              <div>
                <span>Detalle de operación</span>
                <h2>{operacionSeleccionada.accion}</h2>
                <p>
                  Registro #{String(operacionSeleccionada.id).padStart(4, '0')}
                </p>
              </div>

              <button onClick={() => setOperacionSeleccionada(null)}>
                <X size={17} />
              </button>
            </div>

            <div
              className={`admin-operation-banner ${operacionSeleccionada.resultado.toLowerCase()}`}
            >
              {operacionSeleccionada.resultado === 'EXITOSO' ? (
                <CheckCircle2 size={18} />
              ) : (
                <XCircle size={18} />
              )}

              <div>
                <strong>
                  Operación{' '}
                  {operacionSeleccionada.resultado === 'EXITOSO'
                    ? 'exitosa'
                    : 'rechazada'}
                </strong>

                <span>
                  {operacionSeleccionada.fecha} ·{' '}
                  {operacionSeleccionada.hora}
                </span>
              </div>
            </div>

            <div className="admin-history-detail-grid">
              <article>
                <span>Usuario</span>
                <strong>{operacionSeleccionada.usuario}</strong>
              </article>

              <article>
                <span>DNI</span>
                <strong>{operacionSeleccionada.dni}</strong>
              </article>

              <article>
                <span>Rol</span>
                <strong>
                  {etiquetasRol[operacionSeleccionada.rol]}
                </strong>
              </article>

              <article>
                <span>Fecha y hora</span>
                <strong>
                  {operacionSeleccionada.fecha} ·{' '}
                  {operacionSeleccionada.hora}
                </strong>
              </article>

              <article>
                <span>Entidad afectada</span>
                <strong>{operacionSeleccionada.entidad}</strong>
              </article>

              <article>
                <span>Referencia</span>
                <strong>{operacionSeleccionada.referencia}</strong>
              </article>
            </div>

            <div className="admin-operation-description">
              <span>Descripción de la operación</span>
              <p>{operacionSeleccionada.detalle}</p>
            </div>

            <div className="admin-audit-readonly">
              <ShieldCheck size={16} />

              <div>
                <strong>Registro protegido</strong>
                <span>
                  Este historial se utiliza únicamente para consulta y
                  trazabilidad de las operaciones del sistema.
                </span>
              </div>
            </div>

            <div className="admin-modal-actions">
              <button
                className="admin-primary-button"
                onClick={() => setOperacionSeleccionada(null)}
              >
                Cerrar detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </AdministradorLayout>
  )
}

export default AdministradorHistorialPage