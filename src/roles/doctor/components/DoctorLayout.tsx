import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  CalendarDays,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Stethoscope,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

import type { PerfilDoctor } from '../../../types/doctor'
import { useDatosDoctor } from '../useDatosDoctor'
import '../styles/DoctorLayout.css'

type DoctorLayoutProps = {
  children: ReactNode
}

function DoctorLayout({ children }: DoctorLayoutProps) {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { datos: perfil } = useDatosDoctor<PerfilDoctor>('/perfil')

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  return (
    <div className="doctor-shell">
      <button
        type="button"
        className="doctor-mobile-menu"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuAbierto}
      >
        {menuAbierto ? <X size={21} /> : <Menu size={21} />}
      </button>

      {menuAbierto && (
        <button
          type="button"
          className="doctor-overlay"
          onClick={cerrarMenu}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`doctor-sidebar ${
          menuAbierto ? 'doctor-sidebar-open' : ''
        }`}
      >
        <div className="doctor-brand">
          <div className="doctor-brand-icon">
            <Stethoscope size={22} />
          </div>

          <div>
            <strong>MiDoc</strong>
            <span>Portal médico</span>
          </div>
        </div>

        <nav className="doctor-navigation" aria-label="Portal Doctor">
          <NavLink
            to="/doctor/inicio"
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            <Home size={18} />
            Inicio
          </NavLink>

          <NavLink
            to="/doctor/agenda"
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            <CalendarDays size={18} />
            Mi agenda
          </NavLink>

          <NavLink
            to="/doctor/citas"
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            <ClipboardList size={18} />
            Mis citas
          </NavLink>
        </nav>

        <div className="doctor-profile">
          <div className="doctor-profile-info">
            <div className="doctor-profile-avatar"><Stethoscope size={17} /></div>

            <div>
              <strong>{perfil?.nombre ?? 'Perfil Doctor'}</strong>
              {perfil && <span>{perfil.especialidad} · {perfil.sede}</span>}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/login', { replace: true })}
          >
            <LogOut size={17} />
            Volver al acceso
          </button>
        </div>
      </aside>

      <main className="doctor-main">{children}</main>
    </div>
  )
}

export default DoctorLayout
