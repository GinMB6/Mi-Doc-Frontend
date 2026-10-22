import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import LoginPage from '../auth/pages/LoginPage'
import RegistroPage from '../auth/pages/RegistroPage'
import ClienteInicioPage from '../roles/cliente/pages/ClienteInicioPage'
import ClienteConsultasPage from '../roles/cliente/pages/ClienteConsultasPage'
import ClienteConsultaDetallePage from '../roles/cliente/pages/ClienteConsultaDetallePage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta inicial */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Autenticación */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registro"
          element={<RegistroPage />}
        />
        {/* Rutas temporales por perfil */}
        <Route
          path="/cliente/inicio"
          element={<ClienteInicioPage />}
        />

        <Route
          path="/doctor/inicio"
          element={<h1>Inicio Doctor</h1>}
        />

        <Route
          path="/recepcion/inicio"
          element={<h1>Inicio Recepción</h1>}
        />

        <Route
          path="/promotor/inicio"
          element={<h1>Inicio Promotor BCP</h1>}
        />

        <Route
          path="/administrador/inicio"
          element={<h1>Inicio Administrador</h1>}
        />

        <Route
         path="/cliente/consultas"
         element={<ClienteConsultasPage />}
        />
        {/* Ruta inexistente */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

        <Route
           path="/cliente/consultas/:id"
           element={<ClienteConsultaDetallePage />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter