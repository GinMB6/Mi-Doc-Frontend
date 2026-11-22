
import { useState } from 'react'
import type { FormEvent } from 'react'
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

interface RespuestaLogin {
  mensaje: string
  accessToken: string
  refreshToken: string
  usuario: {
    idUsuario: number
    dni: string
    nombres: string
    apellidos: string
    rol: Rol
    perfiles: Rol[]
  }
}

const nombresPerfiles: Record<Rol, Perfil> = {
  ADMINISTRADOR: 'Administrador',
  DOCTOR: 'Doctor',
  RECEPCION: 'Recepción',
  PROMOTOR_BCP: 'Promotor BCP',
  CLIENTE: 'Cliente',
}

const rutasPorPerfil: Record<Perfil, string> = {
  Administrador: '/administrador/inicio',
  Doctor: '/doctor/inicio',
  Recepción: '/recepcion/inicio',
  'Promotor BCP': '/promotor/inicio',
  Cliente: '/cliente/inicio',
}

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

function LoginPage() {
  const navigate = useNavigate()

  const [dni, setDni] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mostrarContrasena, setMostrarContrasena] =
    useState(false)

  const [rolDetectado, setRolDetectado] =
    useState<Rol | null>(null)

  const [perfilesDisponibles, setPerfilesDisponibles] =
    useState<Perfil[]>([])

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const ingresar = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')
    setRolDetectado(null)
    setPerfilesDisponibles([])

    if (!/^\d{8}$/.test(dni)) {
      setError('Ingresa un DNI válido de 8 dígitos.')
      return
    }

    if (!contrasena) {
      setError('Ingresa tu contraseña.')
      return
    }

    setCargando(true)

    try {
      const respuesta = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dni,
            password: contrasena,
          }),
        }
      )

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        throw new Error(
          resultado.error ||
          'No se pudo iniciar sesión.'
        )
      }

      const datos = resultado as RespuestaLogin

      if (
        !datos.accessToken ||
        !datos.usuario ||
        !Array.isArray(datos.usuario.perfiles)
      ) {
        throw new Error(
          'La respuesta del servidor está incompleta.'
        )
      }

      // Sesión temporal en esta pestaña.
      // No guardamos la contraseña.
      sessionStorage.setItem(
        'midoc_auth',
        JSON.stringify({
          accessToken: datos.accessToken,
          refreshToken: datos.refreshToken,
          usuario: datos.usuario,
        })
      )

      setContrasena('')
      setRolDetectado(datos.usuario.rol)

      const perfiles = datos.usuario.perfiles
        .map((rol) => nombresPerfiles[rol])
        .filter((perfil): perfil is Perfil =>
          Boolean(perfil)
        )

      if (perfiles.length === 0) {
        throw new Error(
          'Tu cuenta no tiene perfiles disponibles.'
        )
      }

      setPerfilesDisponibles(perfiles)

    } catch (err) {
      sessionStorage.removeItem('midoc_auth')

      setError(
        err instanceof Error
          ? err.message
          : 'Error al iniciar sesión.'
      )
    } finally {
      setCargando(false)
    }
  }

  const seleccionarPerfil = (perfil: Perfil) => {
    if (!perfilesDisponibles.includes(perfil)) {
      setError('No tienes acceso a ese perfil.')
      return
    }

    const sesion = sessionStorage.getItem('midoc_auth')

    if (!sesion) {
      setError('Tu sesión no está disponible.')
      return
    }

    sessionStorage.setItem(
      'midoc_perfil_activo',
      perfil
    )

    navigate(rutasPorPerfil[perfil])
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-container">

          <div className="brand">
            <div className="brand-icon">
              <HeartPulse
                size={31}
                strokeWidth={2.2}
              />
            </div>

            <div>
              <div className="brand-name">
                Mi<span>Doc</span>
              </div>
              <p>Tu salud, más cerca de ti</p>
            </div>
          </div>

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

          <form
            onSubmit={ingresar}
            className="login-form"
          >
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
                  autoComplete="username"
                  value={dni}
                  disabled={cargando}
                  onChange={(event) => {
                    setDni(
                      event.target.value.replace(
                        /\D/g,
                        ''
                      )
                    )
                    setError('')
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="contrasena">
                  Contraseña
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setError(
                      'La recuperación de contraseña estará disponible próximamente.'
                    )
                  }
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
                  autoComplete="current-password"
                  value={contrasena}
                  disabled={cargando}
                  onChange={(event) => {
                    setContrasena(event.target.value)
                    setError('')
                  }}
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

            {error && (
              <p
                role="alert"
                style={{
                  color: '#c62828',
                  fontSize: '14px',
                  marginBottom: '12px',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={cargando}
            >
              {cargando
                ? 'Verificando...'
                : 'Ingresar'}

              <ArrowRight size={20} />
            </button>
          </form>

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

          {rolDetectado &&
            perfilesDisponibles.length === 1 && (
              <div className="client-access">
                <button
                  type="button"
                  onClick={() =>
                    seleccionarPerfil(
                      perfilesDisponibles[0]
                    )
                  }
                >
                  Continuar como{' '}
                  {perfilesDisponibles[0].toLowerCase()}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

          <div className="register-section">
            <span>
              ¿No tienes una cuenta?
            </span>

            <button
              type="button"
              onClick={() =>
                navigate('/registro')
              }
            >
              Crear cuenta
            </button>
          </div>

          <div className="security-message">
            <ShieldCheck size={17} />
            <span>
              Tus datos están protegidos y seguros.
            </span>
          </div>
        </div>
      </section>

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
            Gestiona tus consultas y citas médicas
            de forma sencilla, rápida y segura.
          </p>

          <div className="hero-features">
            <div>
              <span>
                <CalendarDays size={21} />
              </span>
              <p>
                <strong>Agenda tus citas</strong>
                Consulta la disponibilidad médica
                fácilmente.
              </p>
            </div>

            <div>
              <span>
                <HeartPulse size={21} />
              </span>
              <p>
                <strong>Gestiona tus consultas</strong>
                Revisa su estado y vigencia cuando
                lo necesites.
              </p>
            </div>

            <div>
              <span>
                <ShieldCheck size={21} />
              </span>
              <p>
                <strong>Atención segura</strong>
                Accede únicamente a las funciones
                de tu perfil.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
