
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import type { ReactNode } from 'react'

import LoginPage from '../auth/pages/LoginPage'
import RegistroPage from '../auth/pages/RegistroPage'

import RecepcionConsultasPage from '../roles/recepcion/pages/RecepcionConsultasPage'
import RecepcionCitasPage from '../roles/recepcion/pages/RecepcionCitasPage'
import RecepcionInicioPage from '../roles/recepcion/pages/RecepcionInicioPage'
import RecepcionClientesPage from '../roles/recepcion/pages/RecepcionClientesPage'

import ClienteInicioPage from '../roles/cliente/pages/ClienteInicioPage'
import ClienteConsultasPage from '../roles/cliente/pages/ClienteConsultasPage'
import ClienteConsultaDetallePage from '../roles/cliente/pages/ClienteConsultaDetallePage'
import ClienteDisponibilidadPage from '../roles/cliente/pages/ClienteDisponibilidadPage'
import ClienteCitasPage from '../roles/cliente/pages/ClienteCitasPage'

import DoctorInicioPage from '../roles/doctor/pages/DoctorInicioPage'
import DoctorAgendaPage from '../roles/doctor/pages/DoctorAgendaPage'
import DoctorCitasPage from '../roles/doctor/pages/DoctorCitasPage'

import PromotorInicioPage from '../roles/promotor/pages/PromotorInicioPage'
import PromotorClientesPage from '../roles/promotor/pages/PromotorClientesPage'
import PromotorComprasPage from '../roles/promotor/pages/PromotorComprasPage'
import PromotorConsultasPage from '../roles/promotor/pages/PromotorConsultasPage'
import PromotorAgendamientoPage from '../roles/promotor/pages/PromotorAgendamientoPage'

import AdministradorInicioPage from '../roles/administrador/pages/AdministradorInicioPage'
import AdministradorUsuariosPage from '../roles/administrador/pages/AdministradorUsuariosPage'
import AdministradorHistorialPage from '../roles/administrador/pages/AdministradorHistorialPage'

type Rol =
  | 'ADMINISTRADOR'
  | 'DOCTOR'
  | 'RECEPCION'
  | 'PROMOTOR_BCP'
  | 'CLIENTE'

interface SesionMiDoc {
  accessToken: string
  usuario: {
    rol: Rol
    perfiles: Rol[]
  }
}

function obtenerSesion(): SesionMiDoc | null {
  try {
    const guardado = sessionStorage.getItem('midoc_auth')

    if (!guardado) {
      return null
    }

    const sesion = JSON.parse(guardado) as SesionMiDoc

    if (
      !sesion.accessToken ||
      !sesion.usuario ||
      !Array.isArray(sesion.usuario.perfiles)
    ) {
      return null
    }

    return sesion
  } catch {
    return null
  }
}

function RutaProtegida({
  perfil,
  children,
}: {
  perfil: Rol
  children: ReactNode
}) {
  const sesion = obtenerSesion()

  if (!sesion) {
    return <Navigate to="/login" replace />
  }

  if (!sesion.usuario.perfiles.includes(perfil)) {
    return <Navigate to="/login" replace />
  }

  const nombresPerfiles: Record<Rol, string> = {
    ADMINISTRADOR: 'Administrador',
    DOCTOR: 'Doctor',
    RECEPCION: 'Recepción',
    PROMOTOR_BCP: 'Promotor BCP',
    CLIENTE: 'Cliente',
  }

  const perfilActivo = sessionStorage.getItem(
    'midoc_perfil_activo'
  )

  if (perfilActivo !== nombresPerfiles[perfil]) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function proteger(
  perfil: Rol,
  componente: ReactNode
) {
  return (
    <RutaProtegida perfil={perfil}>
      {componente}
    </RutaProtegida>
  )
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* INICIO */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* AUTENTICACIÓN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registro"
          element={<RegistroPage />}
        />

        {/* CLIENTE */}
        <Route
          path="/cliente/inicio"
          element={proteger(
            'CLIENTE',
            <ClienteInicioPage />
          )}
        />

        <Route
          path="/cliente/consultas"
          element={proteger(
            'CLIENTE',
            <ClienteConsultasPage />
          )}
        />

        <Route
          path="/cliente/consultas/:id"
          element={proteger(
            'CLIENTE',
            <ClienteConsultaDetallePage />
          )}
        />

        <Route
          path="/cliente/disponibilidad"
          element={proteger(
            'CLIENTE',
            <ClienteDisponibilidadPage />
          )}
        />

        <Route
          path="/cliente/citas"
          element={proteger(
            'CLIENTE',
            <ClienteCitasPage />
          )}
        />

        {/* DOCTOR */}
        <Route
          path="/doctor/inicio"
          element={proteger(
            'DOCTOR',
            <DoctorInicioPage />
          )}
        />

        <Route
          path="/doctor/agenda"
          element={proteger(
            'DOCTOR',
            <DoctorAgendaPage />
          )}
        />

        <Route
          path="/doctor/citas"
          element={proteger(
            'DOCTOR',
            <DoctorCitasPage />
          )}
        />

        {/* RECEPCIÓN */}
        <Route
          path="/recepcion/inicio"
          element={proteger(
            'RECEPCION',
            <RecepcionInicioPage />
          )}
        />

        <Route
          path="/recepcion/clientes"
          element={proteger(
            'RECEPCION',
            <RecepcionClientesPage />
          )}
        />

        <Route
          path="/recepcion/consultas"
          element={proteger(
            'RECEPCION',
            <RecepcionConsultasPage />
          )}
        />

        <Route
          path="/recepcion/citas"
          element={proteger(
            'RECEPCION',
            <RecepcionCitasPage />
          )}
        />

        {/* PROMOTOR BCP */}
        <Route
          path="/promotor/inicio"
          element={proteger(
            'PROMOTOR_BCP',
            <PromotorInicioPage />
          )}
        />

        <Route
          path="/promotor/clientes"
          element={proteger(
            'PROMOTOR_BCP',
            <PromotorClientesPage />
          )}
        />

        <Route
          path="/promotor/compras"
          element={proteger(
            'PROMOTOR_BCP',
            <PromotorComprasPage />
          )}
        />

        <Route
          path="/promotor/consultas"
          element={proteger(
            'PROMOTOR_BCP',
            <PromotorConsultasPage />
          )}
        />

        <Route
          path="/promotor/agendamiento"
          element={proteger(
            'PROMOTOR_BCP',
            <PromotorAgendamientoPage />
          )}
        />

        {/* ADMINISTRADOR */}
        <Route
          path="/administrador/inicio"
          element={proteger(
            'ADMINISTRADOR',
            <AdministradorInicioPage />
          )}
        />

        <Route
          path="/administrador/usuarios"
          element={proteger(
            'ADMINISTRADOR',
            <AdministradorUsuariosPage />
          )}
        />

        <Route
          path="/administrador/historial"
          element={proteger(
            'ADMINISTRADOR',
            <AdministradorHistorialPage />
          )}
        />

        {/* RUTA INEXISTENTE */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
