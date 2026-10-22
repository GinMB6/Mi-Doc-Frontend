import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  CalendarDays,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

import '../styles/RecepcionLayout.css'

type RecepcionLayoutProps = {
  children: ReactNode
}

function RecepcionLayout({ children }: RecepcionLayoutProps) {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <div className="recepcion-shell">
      <button
        type="button"
        className="recepcion-mobile-menu"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
      >
        {menuAbierto ? <X size={21} /> : <Menu size={21} />}
      </button>

      {menuAbierto && (
        <button
          type="button"
          className="recepcion-overlay"
          onClick={cerrarMenu}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`recepcion-sidebar ${
          menuAbierto ? 'recepcion-sidebar-open' : ''
        }`}
      >
        <div className="recepcion-brand">
          <div className="recepcion-brand-icon">
            <Stethoscope size={22} />
          </div>

          <div>
            <strong>MiDoc</strong>
            <span>Portal de recepción</span>
          </div>
        </div>

        <nav className="recepcion-navigation">
          <NavLink
            to="/recepcion/inicio"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Home size={18} />
            Inicio
          </NavLink>

          <NavLink
            to="/recepcion/clientes"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Users size={18} />
            Clientes
          </NavLink>

          <NavLink
            to="/recepcion/consultas"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <ClipboardList size={18} />
            Consultas
          </NavLink>

          <NavLink
            to="/recepcion/citas"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <CalendarDays size={18} />
            Citas
          </NavLink>
        </nav>

        <div className="recepcion-profile">
          <div className="recepcion-profile-info">
            <div className="recepcion-profile-avatar">R</div>

            <div>
              <strong>Personal de recepción</strong>
              <span>MiDoc</span>
            </div>
          </div>

          <button type="button" onClick={() => navigate('/login')}>
            <LogOut size={17} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="recepcion-main">{children}</main>
    </div>
  )
}

export default RecepcionLayout