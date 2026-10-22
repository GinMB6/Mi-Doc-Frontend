import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import LoginPage from '../auth/pages/LoginPage'
import RegistroPage from '../auth/pages/RegistroPage'
import RecepcionConsultasPage from '../roles/recepcion/pages/RecepcionConsultasPage'
import RecepcionCitasPage from '../roles/recepcion/pages/RecepcionCitasPage'
import ClienteInicioPage from '../roles/cliente/pages/ClienteInicioPage'
import ClienteConsultasPage from '../roles/cliente/pages/ClienteConsultasPage'
import ClienteConsultaDetallePage from '../roles/cliente/pages/ClienteConsultaDetallePage'
import ClienteDisponibilidadPage from '../roles/cliente/pages/ClienteDisponibilidadPage'
import ClienteCitasPage from '../roles/cliente/pages/ClienteCitasPage'
import RecepcionInicioPage from '../roles/recepcion/pages/RecepcionInicioPage'
import RecepcionClientesPage from '../roles/recepcion/pages/RecepcionClientesPage'
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

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta inicial */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        {/* Cliente */}
        <Route path="/cliente/inicio" element={<ClienteInicioPage />} />
        <Route path="/cliente/consultas" element={<ClienteConsultasPage />} />
        <Route path="/cliente/consultas/:id" element={<ClienteConsultaDetallePage />} />
        <Route path="/cliente/disponibilidad" element={<ClienteDisponibilidadPage />} />
        <Route path="/cliente/citas" element={<ClienteCitasPage />} />

        {/* Doctor */}
        <Route path="/doctor/inicio" element={<DoctorInicioPage />} />
        <Route path="/doctor/agenda" element={<DoctorAgendaPage />} />
        <Route path="/doctor/citas" element={<DoctorCitasPage />} />

        {/* Recepción */}
        <Route path="/recepcion/inicio" element={<RecepcionInicioPage />} />
        <Route path="/recepcion/clientes" element={<RecepcionClientesPage />} />
        <Route path="/recepcion/consultas" element={<RecepcionConsultasPage />} />
        <Route path="/recepcion/citas" element={<RecepcionCitasPage />} />
        
        {/* Promotor BCP */}
        <Route path="/promotor/inicio" element={<PromotorInicioPage />} />
        <Route path="/promotor/clientes" element={<PromotorClientesPage />} />
        <Route path="/promotor/compras" element={<PromotorComprasPage />} />
        <Route path="/promotor/consultas" element={<PromotorConsultasPage />} />
        <Route path="/promotor/agendamiento" element={<PromotorAgendamientoPage />} />
       
        <Route path="/administrador/inicio" element={<AdministradorInicioPage />} />
        <Route path="/administrador/usuarios" element={<AdministradorUsuariosPage />} />
        <Route path="/administrador/historial" element={<AdministradorHistorialPage />} />
       
        {/* Ruta inexistente */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter