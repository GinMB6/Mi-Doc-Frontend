import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  Home,
  LogOut,
  Menu,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react'

import '../styles/ClienteLayout.css'

import { useState } from 'react'

interface ClienteLayoutProps {
  children: ReactNode
}


function ClienteLayout({
  children,
}: ClienteLayoutProps) {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  const cerrarSesion = () => {
    /*
      Cuando conectemos autenticación:
      aquí se cerrará la sesión real.
    */

    navigate('/login')
  }

  return (
    <div className="cliente-layout">
      <aside
        className={`cliente-sidebar ${
          menuAbierto ? 'cliente-sidebar-open' : ''
        }`}
      >
        <div className="cliente-sidebar-header">
          <div className="cliente-logo">
            <div className="cliente-logo-icon">
              <HeartPulse size={25} />
            </div>

            <div>
              <strong>
                Mi<span>Doc</span>
              </strong>
              <p>Portal del cliente</p>
            </div>
          </div>

          <button
            type="button"
            className="cliente-close-menu"
            onClick={cerrarMenu}
            aria-label="Cerrar menú"
          >
            <X size={21} />
          </button>
        </div>

        <nav className="cliente-navigation">
          <span className="cliente-navigation-title">
            Menú principal
          </span>

          <NavLink
            to="/cliente/inicio"
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive
                ? 'cliente-nav-link cliente-nav-active'
                : 'cliente-nav-link'
            }
          >
            <Home size={19} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/cliente/consultas"
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive
                ? 'cliente-nav-link cliente-nav-active'
                : 'cliente-nav-link'
            }
          >
            <ClipboardList size={19} />
            <span>Mis consultas</span>
          </NavLink>

          <NavLink
            to="/cliente/disponibilidad"
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive
                ? 'cliente-nav-link cliente-nav-active'
                : 'cliente-nav-link'
            }
          >
            <Stethoscope size={19} />
            <span>Disponibilidad médica</span>
          </NavLink>

          <NavLink
            to="/cliente/citas"
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive
                ? 'cliente-nav-link cliente-nav-active'
                : 'cliente-nav-link'
            }
          >
            <CalendarDays size={19} />
            <span>Mis citas</span>
          </NavLink>
        </nav>

        <div className="cliente-sidebar-footer">
          <button
            type="button"
            className="cliente-profile"
          >
            <div className="cliente-avatar">
              <UserRound size={19} />
            </div>

            <div className="cliente-profile-info">
              <strong>Mi perfil</strong>
              <span>Cliente MiDoc</span>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className="cliente-logout"
            onClick={cerrarSesion}
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {menuAbierto && (
        <button
          type="button"
          className="cliente-sidebar-overlay"
          onClick={cerrarMenu}
          aria-label="Cerrar menú"
        />
      )}

      <section className="cliente-main">
        <header className="cliente-topbar">
          <button
            type="button"
            className="cliente-menu-button"
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>

          <div className="cliente-topbar-title">
            <HeartPulse size={21} />

            <span>
              Mi<strong>Doc</strong>
            </span>
          </div>

          <div className="cliente-topbar-user">
            <div>
              <strong>Cliente</strong>
              <span>Portal MiDoc</span>
            </div>

            <div className="cliente-topbar-avatar">
              <UserRound size={18} />
            </div>
          </div>
        </header>

        <div className="cliente-content">
          {children}
        </div>
      </section>
    </div>
  )
}

export default ClienteLayout