import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  CalendarPlus,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  ShoppingBag,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

import '../styles/PromotorLayout.css'

type PromotorLayoutProps = {
  children: ReactNode
}

function PromotorLayout({ children }: PromotorLayoutProps) {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <div className="promotor-shell">
      <button
        type="button"
        className="promotor-mobile-menu"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
      >
        {menuAbierto ? <X size={21} /> : <Menu size={21} />}
      </button>

      {menuAbierto && (
        <button
          type="button"
          className="promotor-overlay"
          onClick={cerrarMenu}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`promotor-sidebar ${
          menuAbierto ? 'promotor-sidebar-open' : ''
        }`}
      >
        <div className="promotor-brand">
          <div className="promotor-brand-icon">
            <Stethoscope size={22} />
          </div>

          <div>
            <strong>MiDoc</strong>
            <span>Portal Promotor BCP</span>
          </div>
        </div>

        <nav className="promotor-navigation">
          <NavLink
            to="/promotor/inicio"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Home size={18} />
            Inicio
          </NavLink>

          <NavLink
            to="/promotor/clientes"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Users size={18} />
            Clientes
          </NavLink>

          <NavLink
            to="/promotor/compras"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <ShoppingBag size={18} />
            Registrar compra
          </NavLink>

          <NavLink
            to="/promotor/consultas"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <ClipboardList size={18} />
            Consultas
          </NavLink>

          <NavLink
            to="/promotor/agendamiento"
            onClick={cerrarMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <CalendarPlus size={18} />
            Agendamiento
          </NavLink>
        </nav>

        <div className="promotor-profile">
          <div className="promotor-profile-info">
            <div className="promotor-profile-avatar">P</div>

            <div>
              <strong>Promotor BCP</strong>
              <span>MiDoc</span>
            </div>
          </div>

          <button type="button" onClick={() => navigate('/login')}>
            <LogOut size={17} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="promotor-main">{children}</main>
    </div>
  )
}

export default PromotorLayout