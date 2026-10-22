import { useState, type ReactNode } from 'react'
import {
  Activity,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  UserCog,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/AdministradorLayout.css'

interface AdministradorLayoutProps {
  children: ReactNode
}

function AdministradorLayout({ children }: AdministradorLayoutProps) {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  const cerrarSesion = () => {
    // TODO BACKEND:
    // Aquí se cerrará la sesión real cuando conectemos autenticación.
    navigate('/login')
  }

  return (
    <div className="admin-shell">
      <button
        className="admin-mobile-menu"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
      >
        {menuAbierto ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuAbierto && (
        <div
          className="admin-sidebar-overlay"
          onClick={cerrarMenu}
        />
      )}

      <aside className={`admin-sidebar ${menuAbierto ? 'open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={22} />
          </div>

          <div>
            <strong>MiDoc</strong>
            <span>Administración</span>
          </div>
        </div>

        <div className="admin-profile">
          <div className="admin-profile-avatar">
            <UserCog size={19} />
          </div>

          <div>
            <span>Administrador</span>
            <strong>Panel del sistema</strong>
          </div>
        </div>

        <nav className="admin-nav">
          <span className="admin-nav-label">Menú principal</span>

          <NavLink
            to="/administrador/inicio"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <LayoutDashboard size={17} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/administrador/usuarios"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <UserCog size={17} />
            <span>Usuarios y roles</span>
          </NavLink>

          <NavLink
            to="/administrador/historial"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <History size={17} />
            <span>Historial</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-system-status">
            <Activity size={15} />

            <div>
              <strong>Sistema activo</strong>
              <span>MiDoc</span>
            </div>
          </div>

          <button
            className="admin-logout"
            onClick={cerrarSesion}
          >
            <LogOut size={16} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}

export default AdministradorLayout