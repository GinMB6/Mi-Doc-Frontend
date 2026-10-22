import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Eye,
  Filter,
  Search,
  ShieldCheck,
  UserCog,
  UserRound,
  X,
  XCircle,
} from 'lucide-react'
import AdministradorLayout from '../components/AdministradorLayout'
import '../styles/AdministradorPages.css'

type RolUsuario =
  | 'ADMINISTRADOR'
  | 'DOCTOR'
  | 'RECEPCION'
  | 'PROMOTOR_BCP'
  | 'CLIENTE'

interface Usuario {
  id: number
  dni: string
  nombres: string
  apellidos: string
  telefono: string
  correo: string
  rol: RolUsuario
  activo: boolean
  fechaRegistro: string
}

const usuariosDemo: Usuario[] = [
  {
    id: 1,
    dni: '74859621',
    nombres: 'María Fernanda',
    apellidos: 'López García',
    telefono: '987654321',
    correo: 'maria.lopez@correo.com',
    rol: 'CLIENTE',
    activo: true,
    fechaRegistro: '15/09/2026',
  },
  {
    id: 2,
    dni: '70541236',
    nombres: 'Diego',
    apellidos: 'Salazar Mendoza',
    telefono: '965874123',
    correo: 'diego.salazar@correo.com',
    rol: 'CLIENTE',
    activo: true,
    fechaRegistro: '18/09/2026',
  },
  {
    id: 3,
    dni: '71652348',
    nombres: 'Lucía',
    apellidos: 'Torres García',
    telefono: '954123687',
    correo: 'lucia.torres@correo.com',
    rol: 'CLIENTE',
    activo: true,
    fechaRegistro: '21/09/2026',
  },
  {
    id: 4,
    dni: '48271635',
    nombres: 'Carlos',
    apellidos: 'Ramírez Soto',
    telefono: '987412563',
    correo: 'carlos.ramirez@midoc.com',
    rol: 'DOCTOR',
    activo: true,
    fechaRegistro: '03/08/2026',
  },
  {
    id: 5,
    dni: '45127896',
    nombres: 'Ana',
    apellidos: 'Torres Mendoza',
    telefono: '965321478',
    correo: 'ana.torres@midoc.com',
    rol: 'DOCTOR',
    activo: true,
    fechaRegistro: '05/08/2026',
  },
  {
    id: 6,
    dni: '43521678',
    nombres: 'Andrea',
    apellidos: 'Castro Vega',
    telefono: '978456123',
    correo: 'andrea.castro@midoc.com',
    rol: 'RECEPCION',
    activo: true,
    fechaRegistro: '01/08/2026',
  },
  {
    id: 7,
    dni: '46987521',
    nombres: 'Luis',
    apellidos: 'Mendoza Ruiz',
    telefono: '941236587',
    correo: 'luis.mendoza@bcp.com',
    rol: 'PROMOTOR_BCP',
    activo: true,
    fechaRegistro: '12/08/2026',
  },
  {
    id: 8,
    dni: '42156387',
    nombres: 'Valeria',
    apellidos: 'Rojas Silva',
    telefono: '987123654',
    correo: 'valeria.rojas@midoc.com',
    rol: 'ADMINISTRADOR',
    activo: true,
    fechaRegistro: '01/07/2026',
  },
  {
    id: 9,
    dni: '45871236',
    nombres: 'Jorge',
    apellidos: 'Paredes Luna',
    telefono: '954781236',
    correo: 'jorge.paredes@midoc.com',
    rol: 'RECEPCION',
    activo: false,
    fechaRegistro: '16/07/2026',
  },
]

const etiquetasRol: Record<RolUsuario, string> = {
  ADMINISTRADOR: 'Administrador',
  DOCTOR: 'Doctor',
  RECEPCION: 'Recepción',
  PROMOTOR_BCP: 'Promotor BCP',
  CLIENTE: 'Cliente',
}

function AdministradorUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosDemo)

  const [busqueda, setBusqueda] = useState('')
  const [filtroRol, setFiltroRol] = useState<'TODOS' | RolUsuario>('TODOS')
  const [filtroEstado, setFiltroEstado] = useState<
    'TODOS' | 'ACTIVOS' | 'INACTIVOS'
  >('TODOS')

  const [usuarioSeleccionado, setUsuarioSeleccionado] =
    useState<Usuario | null>(null)

  const [modoEdicion, setModoEdicion] = useState(false)
  const [rolTemporal, setRolTemporal] = useState<RolUsuario>('CLIENTE')
  const [activoTemporal, setActivoTemporal] = useState(true)

  const usuariosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return usuarios.filter((usuario) => {
      const coincideBusqueda =
        !termino ||
        usuario.dni.includes(termino) ||
        usuario.nombres.toLowerCase().includes(termino) ||
        usuario.apellidos.toLowerCase().includes(termino) ||
        usuario.correo.toLowerCase().includes(termino)

      const coincideRol =
        filtroRol === 'TODOS' || usuario.rol === filtroRol

      const coincideEstado =
        filtroEstado === 'TODOS' ||
        (filtroEstado === 'ACTIVOS' && usuario.activo) ||
        (filtroEstado === 'INACTIVOS' && !usuario.activo)

      return coincideBusqueda && coincideRol && coincideEstado
    })
  }, [usuarios, busqueda, filtroRol, filtroEstado])

  const abrirDetalle = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario)
    setRolTemporal(usuario.rol)
    setActivoTemporal(usuario.activo)
    setModoEdicion(false)
  }

  const cerrarDetalle = () => {
    setUsuarioSeleccionado(null)
    setModoEdicion(false)
  }

  const cancelarEdicion = () => {
    if (!usuarioSeleccionado) return

    setRolTemporal(usuarioSeleccionado.rol)
    setActivoTemporal(usuarioSeleccionado.activo)
    setModoEdicion(false)
  }

  const guardarCambios = () => {
    if (!usuarioSeleccionado) return

    /*
      TODO BACKEND:
      El backend deberá:
      1. Verificar que el usuario autenticado sea ADMINISTRADOR.
      2. Verificar que el usuario objetivo exista.
      3. Validar el rol solicitado.
      4. Actualizar id_rol y/o activo.
      5. Registrar la operación en el historial/auditoría.
      6. Devolver el usuario actualizado.
    */

    const usuarioActualizado: Usuario = {
      ...usuarioSeleccionado,
      rol: rolTemporal,
      activo: activoTemporal,
    }

    setUsuarios((actuales) =>
      actuales.map((usuario) =>
        usuario.id === usuarioActualizado.id
          ? usuarioActualizado
          : usuario,
      ),
    )

    setUsuarioSeleccionado(usuarioActualizado)
    setModoEdicion(false)
  }

  return (
    <AdministradorLayout>
      <div className="admin-page">
        <header className="admin-heading">
          <div>
            <span>Gestión administrativa</span>
            <h1>Usuarios y roles</h1>
            <p>
              Consulta las cuentas registradas en MiDoc y administra el rol
              y estado de acceso de cada usuario.
            </p>
          </div>

          <div className="admin-heading-icon">
            <UserCog size={22} />
          </div>
        </header>

        <section className="admin-summary-grid">
          <article>
            <div className="admin-summary-icon">
              <UserRound size={20} />
            </div>

            <div>
              <span>Total usuarios</span>
              <strong>{usuarios.length}</strong>
              <small>Registros de demostración</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Usuarios activos</span>
              <strong>
                {usuarios.filter((usuario) => usuario.activo).length}
              </strong>
              <small>Con acceso habilitado</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <XCircle size={20} />
            </div>

            <div>
              <span>Usuarios inactivos</span>
              <strong>
                {usuarios.filter((usuario) => !usuario.activo).length}
              </strong>
              <small>Acceso deshabilitado</small>
            </div>
          </article>

          <article>
            <div className="admin-summary-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <span>Roles del sistema</span>
              <strong>5</strong>
              <small>Roles definidos en MiDoc</small>
            </div>
          </article>
        </section>

        <section className="admin-section-card">
          <div className="admin-section-heading">
            <div>
              <span>Directorio</span>
              <h2>Usuarios registrados</h2>
            </div>
          </div>

          <div className="admin-users-toolbar">
            <div className="admin-search">
              <Search size={15} />

              <input
                type="text"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Buscar por DNI, nombre o correo..."
              />
            </div>

            <div className="admin-filters">
              <div className="admin-filter-select">
                <Filter size={13} />

                <select
                  value={filtroRol}
                  onChange={(event) =>
                    setFiltroRol(
                      event.target.value as 'TODOS' | RolUsuario,
                    )
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
                value={filtroEstado}
                onChange={(event) =>
                  setFiltroEstado(
                    event.target.value as
                      | 'TODOS'
                      | 'ACTIVOS'
                      | 'INACTIVOS',
                  )
                }
              >
                <option value="TODOS">Todos los estados</option>
                <option value="ACTIVOS">Activos</option>
                <option value="INACTIVOS">Inactivos</option>
              </select>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <strong>{usuario.dni}</strong>
                    </td>

                    <td>
                      <div className="admin-user-cell">
                        <div className="admin-user-avatar">
                          {usuario.nombres.charAt(0)}
                          {usuario.apellidos.charAt(0)}
                        </div>

                        <div>
                          <strong>
                            {usuario.nombres} {usuario.apellidos}
                          </strong>

                          <span>{usuario.telefono}</span>
                        </div>
                      </div>
                    </td>

                    <td>{usuario.correo}</td>

                    <td>
                      <span
                        className={`admin-role-badge ${usuario.rol.toLowerCase()}`}
                      >
                        {etiquetasRol[usuario.rol]}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`admin-state-badge ${
                          usuario.activo ? 'active' : 'inactive'
                        }`}
                      >
                        {usuario.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>

                    <td>{usuario.fechaRegistro}</td>

                    <td>
                      <button
                        className="admin-icon-button"
                        onClick={() => abrirDetalle(usuario)}
                        title="Ver usuario"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {usuariosFiltrados.length === 0 && (
            <div className="admin-empty">
              <UserRound size={27} />
              <strong>No se encontraron usuarios</strong>
              <span>
                Prueba con otros criterios de búsqueda o filtros.
              </span>
            </div>
          )}

          <div className="admin-results-count">
            Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
          </div>
        </section>

        <div className="admin-demo-note">
          Datos y cambios temporales para la demostración visual. Cuando se
          conecte Flask con Supabase, la búsqueda, actualización de roles,
          activación e inactivación de usuarios y el registro de auditoría
          serán procesados por el backend.
        </div>
      </div>

      {usuarioSeleccionado && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={cerrarDetalle}
        >
          <div
            className="admin-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="admin-modal-heading">
              <div>
                <span>Detalle del usuario</span>
                <h2>
                  {usuarioSeleccionado.nombres}{' '}
                  {usuarioSeleccionado.apellidos}
                </h2>
                <p>DNI {usuarioSeleccionado.dni}</p>
              </div>

              <button onClick={cerrarDetalle}>
                <X size={17} />
              </button>
            </div>

            <div className="admin-user-detail-header">
              <div className="admin-large-avatar">
                {usuarioSeleccionado.nombres.charAt(0)}
                {usuarioSeleccionado.apellidos.charAt(0)}
              </div>

              <div>
                <strong>
                  {usuarioSeleccionado.nombres}{' '}
                  {usuarioSeleccionado.apellidos}
                </strong>

                <span>{usuarioSeleccionado.correo}</span>

                <div className="admin-detail-badges">
                  <span
                    className={`admin-role-badge ${usuarioSeleccionado.rol.toLowerCase()}`}
                  >
                    {etiquetasRol[usuarioSeleccionado.rol]}
                  </span>

                  <span
                    className={`admin-state-badge ${
                      usuarioSeleccionado.activo ? 'active' : 'inactive'
                    }`}
                  >
                    {usuarioSeleccionado.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>

            <div className="admin-detail-grid">
              <article>
                <span>DNI</span>
                <strong>{usuarioSeleccionado.dni}</strong>
              </article>

              <article>
                <span>Teléfono</span>
                <strong>{usuarioSeleccionado.telefono}</strong>
              </article>

              <article>
                <span>Correo electrónico</span>
                <strong>{usuarioSeleccionado.correo}</strong>
              </article>

              <article>
                <span>Fecha de registro</span>
                <strong>{usuarioSeleccionado.fechaRegistro}</strong>
              </article>
            </div>

            {modoEdicion ? (
              <div className="admin-edit-panel">
                <div className="admin-section-heading">
                  <div>
                    <span>Administración</span>
                    <h2>Modificar acceso</h2>
                  </div>
                </div>

                <div className="admin-edit-grid">
                  <label>
                    Rol del usuario

                    <select
                      value={rolTemporal}
                      onChange={(event) =>
                        setRolTemporal(event.target.value as RolUsuario)
                      }
                    >
                      <option value="ADMINISTRADOR">Administrador</option>
                      <option value="DOCTOR">Doctor</option>
                      <option value="RECEPCION">Recepción</option>
                      <option value="PROMOTOR_BCP">Promotor BCP</option>
                      <option value="CLIENTE">Cliente</option>
                    </select>
                  </label>

                  <label>
                    Estado de la cuenta

                    <select
                      value={activoTemporal ? 'ACTIVO' : 'INACTIVO'}
                      onChange={(event) =>
                        setActivoTemporal(event.target.value === 'ACTIVO')
                      }
                    >
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                    </select>
                  </label>
                </div>

                <div className="admin-warning-box">
                  <ShieldCheck size={17} />

                  <div>
                    <strong>Cambio administrativo</strong>
                    <span>
                      Los cambios de rol o estado deberán quedar registrados
                      en el historial de operaciones.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="admin-current-access">
                <div>
                  <span>Rol actual</span>
                  <strong>
                    {etiquetasRol[usuarioSeleccionado.rol]}
                  </strong>
                </div>

                <div>
                  <span>Estado de acceso</span>
                  <strong>
                    {usuarioSeleccionado.activo
                      ? 'Cuenta activa'
                      : 'Cuenta inactiva'}
                  </strong>
                </div>
              </div>
            )}

            <div className="admin-modal-actions">
              {modoEdicion ? (
                <>
                  <button
                    className="admin-secondary-button"
                    onClick={cancelarEdicion}
                  >
                    Cancelar
                  </button>

                  <button
                    className="admin-primary-button"
                    onClick={guardarCambios}
                  >
                    <CheckCircle2 size={14} />
                    Guardar cambios
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="admin-secondary-button"
                    onClick={cerrarDetalle}
                  >
                    Cerrar
                  </button>

                  <button
                    className="admin-primary-button"
                    onClick={() => setModoEdicion(true)}
                  >
                    <UserCog size={14} />
                    Administrar usuario
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </AdministradorLayout>
  )
}

export default AdministradorUsuariosPage