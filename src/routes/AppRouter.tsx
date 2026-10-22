import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import LoginPage from '../auth/pages/LoginPage'

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

        {/* Rutas temporales por perfil */}
        <Route
          path="/cliente/inicio"
          element={<h1>Inicio Cliente</h1>}
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

        {/* Ruta inexistente */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter