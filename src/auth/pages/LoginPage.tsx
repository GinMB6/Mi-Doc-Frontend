import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from 'lucide-react'

import '../styles/LoginPage.css'

type Rol =
  | 'ADMINISTRADOR'
  | 'DOCTOR'
  | 'RECEPCION'
  | 'PROMOTOR_BCP'
  | 'CLIENTE'

type Perfil =
  | 'Administrador'
  | 'Doctor'
  | 'Recepción'
  | 'Promotor BCP'
  | 'Cliente'

const perfilesPorRol: Record<Rol, Perfil[]> = {
  ADMINISTRADOR: ['Administrador', 'Recepción', 'Cliente'],
  DOCTOR: ['Doctor', 'Cliente'],
  RECEPCION: ['Recepción', 'Cliente'],
  PROMOTOR_BCP: ['Promotor BCP', 'Cliente'],
  CLIENTE: ['Cliente'],
}

function LoginPage() {
  const navigate = useNavigate()

  const [dni, setDni] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [rolDetectado, setRolDetectado] = useState<Rol | null>(null)

  const ingresar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!dni.trim() || !contrasena.trim()) {
      return
    }

    /*
      MOCK TEMPORAL:
      Más adelante Flask consultará al usuario y nos devolverá
      su rol real.

      Por ahora usamos ADMINISTRADOR para poder probar
      el selector de perfiles.
    */
    setRolDetectado('ADMINISTRADOR')
  }

const seleccionarPerfil = (perfil: Perfil) => {
  const rutasPorPerfil: Record<Perfil, string> = {
    Administrador: '/administrador/inicio',
    Doctor: '/doctor/inicio',
    Recepción: '/recepcion/inicio',
    'Promotor BCP': '/promotor/inicio',
    Cliente: '/cliente/inicio',
  }

  navigate(rutasPorPerfil[perfil])
}

  const perfilesDisponibles = rolDetectado
    ? perfilesPorRol[rolDetectado]
    : []

  return (
    <main className="login-page">
      {/* ================================================
          PANEL IZQUIERDO
          ================================================ */}

      <section className="login-panel">
        <div className="login-container">

          {/* Logo */}

          <div className="brand">
            <div className="brand-icon">
              <HeartPulse size={31} strokeWidth={2.2} />
            </div>

            <div>
              <div className="brand-name">
                Mi<span>Doc</span>
              </div>

              <p>Tu salud, más cerca de ti</p>
            </div>
          </div>

          {/* Encabezado */}

          <div className="login-heading">
            <span className="login-label">
              <Stethoscope size={17} />
              Portal MiDoc
            </span>

            <h1>Bienvenido de nuevo</h1>

            <p>
              Ingresa tus credenciales para continuar.
            </p>
          </div>

          {/* Formulario */}

          <form
            onSubmit={ingresar}
            className="login-form"
          >
            {/* DNI */}

            <div className="form-group">
              <label htmlFor="dni">
                DNI
              </label>

              <div className="input-container">
                <UserRound size={20} />

                <input
                  id="dni"
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="Ingresa tu DNI"
                  value={dni}
                  onChange={(event) =>
                    setDni(
                      event.target.value.replace(/\D/g, '')
                    )
                  }
                />
              </div>
            </div>

            {/* Contraseña */}

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="contrasena">
                  Contraseña
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="input-container">
                <LockKeyhole size={20} />

                <input
                  id="contrasena"
                  type={
                    mostrarContrasena
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Ingresa tu contraseña"
                  value={contrasena}
                  onChange={(event) =>
                    setContrasena(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setMostrarContrasena(
                      !mostrarContrasena
                    )
                  }
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {mostrarContrasena ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Ingresar */}

            <button
              type="submit"
              className="login-button"
            >
              Ingresar
              <ArrowRight size={20} />
            </button>
          </form>

          {/* ============================================
              SELECTOR DE PERFIL
              ============================================ */}

          {rolDetectado &&
            perfilesDisponibles.length > 1 && (
              <div className="profile-selector">
                <div className="profile-divider">
                  <span />

                  <p>
                    ¿Con qué perfil deseas ingresar?
                  </p>

                  <span />
                </div>

                <div className="profile-options">
                  {perfilesDisponibles.map(
                    (perfil) => (
                      <button
                        key={perfil}
                        type="button"
                        onClick={() =>
                          seleccionarPerfil(perfil)
                        }
                      >
                        {perfil}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Cliente */}

          {rolDetectado === 'CLIENTE' && (
            <div className="client-access">
              <button
                type="button"
                onClick={() =>
                  seleccionarPerfil('Cliente')
                }
              >
                Continuar como cliente
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Crear cuenta */}

          <div className="register-section">
            <span>
              ¿No tienes una cuenta?
            </span>

            <button
               type="button"
               onClick={() => navigate('/registro')}
            >
               Crear cuenta
            </button>
          </div>

          {/* Seguridad */}

          <div className="security-message">
            <ShieldCheck size={17} />

            <span>
              Tus datos están protegidos y seguros.
            </span>
          </div>
        </div>
      </section>

      {/* ================================================
          PANEL DERECHO
          ================================================ */}

      <section className="hero-panel">
        <div className="hero-overlay" />

        <div className="hero-content">

          <div className="hero-logo">
            <HeartPulse size={34} />
            <span>MiDoc</span>
          </div>

          <h2>
            Cuidamos de ti,
            <br />
            en cada etapa.
          </h2>

          <p>
            Gestiona tus consultas y citas médicas de
            forma sencilla, rápida y segura.
          </p>

          <div className="hero-features">

            <div>
              <span>
                <CalendarDays size={21} />
              </span>

              <p>
                <strong>
                  Agenda tus citas
                </strong>

                Consulta la disponibilidad médica
                fácilmente.
              </p>
            </div>

            <div>
              <span>
                <HeartPulse size={21} />
              </span>

              <p>
                <strong>
                  Gestiona tus consultas
                </strong>

                Revisa su estado y vigencia cuando lo
                necesites.
              </p>
            </div>

            <div>
              <span>
                <ShieldCheck size={21} />
              </span>

              <p>
                <strong>
                  Atención segura
                </strong>

                Accede únicamente a las funciones de
                tu perfil.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage