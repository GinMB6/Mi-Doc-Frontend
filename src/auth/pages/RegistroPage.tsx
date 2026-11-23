
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  HeartPulse,
  MailCheck,
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
} from 'lucide-react'

import ValidarDni from '../components/registro/ValidarDni'
import DatosCliente from '../components/registro/DatosCliente'
import CrearCredenciales from '../components/registro/CrearCredenciales'

import {
  enviarCodigoVerificacion,
  crearCuentaRegistro,
} from '../../services/registroService'

import {
  recuperarRegistro,
} from '../../services/recuperarRegistroService'

import type {
  DatosClienteRegistro,
  ValidarDniResponse,
} from '../../types/registro'

import '../styles/RegistroPage.css'

type PasoRegistro =
  | 'VALIDAR_DNI'
  | 'DATOS_CLIENTE'
  | 'CREAR_CREDENCIALES'
  | 'VERIFICAR_CORREO'
  | 'RECUPERAR_REGISTRO'
  | 'FINALIZADO'

interface RegistroPendiente {
  datos: DatosClienteRegistro
  vence: number
}

const CLAVE_REGISTRO = 'midoc_registro_pendiente'
const DURACION_REGISTRO = 30 * 60 * 1000

function guardarRegistro(datos: DatosClienteRegistro) {
  const pendiente: RegistroPendiente = {
    datos,
    vence: Date.now() + DURACION_REGISTRO,
  }

  localStorage.setItem(
    CLAVE_REGISTRO,
    JSON.stringify(pendiente)
  )
}

function obtenerRegistroPendiente(): DatosClienteRegistro | null {
  try {
    const guardado = localStorage.getItem(CLAVE_REGISTRO)

    if (!guardado) return null

    const pendiente = JSON.parse(
      guardado
    ) as RegistroPendiente

    if (
      !pendiente.datos ||
      !pendiente.vence ||
      Date.now() > pendiente.vence
    ) {
      localStorage.removeItem(CLAVE_REGISTRO)
      return null
    }

    return pendiente.datos
  } catch {
    localStorage.removeItem(CLAVE_REGISTRO)
    return null
  }
}

function RegistroPage() {
  const navigate = useNavigate()

  const [paso, setPaso] = useState<PasoRegistro>(
    'VALIDAR_DNI'
  )

  const [dniRegistro, setDniRegistro] = useState('')
  const [datosCliente, setDatosCliente] =
    useState<DatosClienteRegistro | null>(null)

  const [contrasenaRecuperacion, setContrasenaRecuperacion] =
    useState('')

  const [mostrarContrasena, setMostrarContrasena] =
    useState(false)

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const procesarConfirmacion = async () => {
      const fragmento = new URLSearchParams(
        window.location.hash.slice(1)
      )

      const parametros = new URLSearchParams(
        window.location.search
      )

      const token = fragmento.get('access_token')

      const errorAuth =
        fragmento.get('error_description') ||
        parametros.get('error_description')

      const pendiente = obtenerRegistroPendiente()

      if (pendiente) {
        setDatosCliente(pendiente)
        setDniRegistro(pendiente.dni)
      }

      // Evitamos dejar tokens o errores en la URL.
      if (token || errorAuth) {
        window.history.replaceState(
          {},
          '',
          window.location.pathname
        )
      }

      if (errorAuth) {
        setError(
          'El enlace no pudo utilizarse. ' +
          'Si ya confirmaste tu correo, puedes recuperar tu registro.'
        )

        setPaso(
          pendiente
            ? 'RECUPERAR_REGISTRO'
            : 'VALIDAR_DNI'
        )

        return
      }

      if (!token) {
        if (pendiente) {
          setPaso('VERIFICAR_CORREO')
        }

        return
      }

      if (!pendiente) {
        setError(
          'No encontramos los datos de tu registro pendiente.'
        )
        return
      }

      setPaso('VERIFICAR_CORREO')
      setCargando(true)

      try {
        const resultado = await crearCuentaRegistro({
          accessToken: token,
          datosCliente: pendiente,
        })

        if (!resultado.creado) {
          throw new Error(resultado.mensaje)
        }

        localStorage.removeItem(CLAVE_REGISTRO)

        setMensaje(resultado.mensaje)
        setPaso('FINALIZADO')
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'No se pudo completar el registro.'
        )

        setPaso('RECUPERAR_REGISTRO')
      } finally {
        setCargando(false)
      }
    }

    void procesarConfirmacion()
  }, [])

  const manejarDniValidado = (
    dni: string,
    _resultado: ValidarDniResponse
  ) => {
    setDniRegistro(dni)
    setError('')
    setPaso('DATOS_CLIENTE')
  }

  const manejarDatosCliente = (
    datos: DatosClienteRegistro
  ) => {
    setDatosCliente(datos)
    setError('')
    setPaso('CREAR_CREDENCIALES')
  }

  const manejarCrearCuenta = async (
    contrasena: string
  ) => {
    if (!datosCliente) {
      setError('Completa primero tus datos personales.')
      return
    }

    setCargando(true)
    setError('')

    try {
      guardarRegistro(datosCliente)

      const respuesta =
        await enviarCodigoVerificacion({
          correo: datosCliente.correo,
          contrasena,
        })

      setMensaje(respuesta.mensaje)
      setPaso('VERIFICAR_CORREO')
    } catch (err) {
      localStorage.removeItem(CLAVE_REGISTRO)

      const mensajeError =
        err instanceof Error
          ? err.message
          : 'No se pudo iniciar el registro.'

      setError(mensajeError)
      throw new Error(mensajeError)
    } finally {
      setCargando(false)
    }
  }

  const manejarRecuperacion = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!contrasenaRecuperacion) {
      setError('Ingresa tu contraseña.')
      return
    }

    setError('')
    setCargando(true)

    try {
      const resultado = await recuperarRegistro(
        contrasenaRecuperacion
      )

      setContrasenaRecuperacion('')
      setMensaje(resultado)
      setPaso('FINALIZADO')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo recuperar el registro.'
      )
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <button
          type="button"
          className="register-back"
          onClick={() => navigate('/login')}
        >
          <ArrowLeft size={18} />
          Volver al inicio de sesión
        </button>

        <div className="register-brand">
          <div className="register-brand-icon">
            <HeartPulse size={29} />
          </div>

          <div>
            <div className="register-brand-name">
              Mi<span>Doc</span>
            </div>
            <p>Tu salud, más cerca de ti</p>
          </div>
        </div>

        {error && (
          <p className="register-error" role="alert">
            {error}
          </p>
        )}

        {paso === 'VALIDAR_DNI' && (
          <ValidarDni
            onDniValidado={manejarDniValidado}
          />
        )}

        {paso === 'DATOS_CLIENTE' && (
          <DatosCliente
            dni={dniRegistro}
            onContinuar={manejarDatosCliente}
            onVolver={() => setPaso('VALIDAR_DNI')}
          />
        )}

        {paso === 'CREAR_CREDENCIALES' && (
          <CrearCredenciales
            onCrearCuenta={manejarCrearCuenta}
            onVolver={() => setPaso('DATOS_CLIENTE')}
          />
        )}

        {paso === 'VERIFICAR_CORREO' && (
          <div className="register-heading">
            <MailCheck size={44} />

            <h1>Verifica tu correo</h1>

            <p>
              {mensaje ||
                'Revisa tu correo y confirma tu cuenta MiDoc.'}
            </p>

            {datosCliente && (
              <p>
                Correo: {datosCliente.correo}
              </p>
            )}

            {cargando ? (
              <p>Activando tu cuenta...</p>
            ) : (
              <>
                <p>
                  ¿Ya confirmaste tu correo, pero tu cuenta
                  todavía no se activó?
                </p>

                <button
                  type="button"
                  className="register-continue"
                  onClick={() => {
                    setError('')
                    setPaso('RECUPERAR_REGISTRO')
                  }}
                >
                  Ya confirmé mi correo
                </button>
              </>
            )}
          </div>
        )}

        {paso === 'RECUPERAR_REGISTRO' && (
          <>
            <div className="register-heading">
              <ShieldCheck size={44} />

              <h1>Completa tu registro</h1>

              <p>
                Si ya confirmaste tu correo, ingresa
                la contraseña que creaste para terminar
                de activar tu cuenta MiDoc.
              </p>
            </div>

            <form
              className="register-form"
              onSubmit={manejarRecuperacion}
            >
              <div className="register-form-group">
                <label htmlFor="recuperar-password">
                  Contraseña
                </label>

                <div className="register-input">
                  <LockKeyhole size={20} />

                  <input
                    id="recuperar-password"
                    type={
                      mostrarContrasena
                        ? 'text'
                        : 'password'
                    }
                    placeholder="Tu contraseña de MiDoc"
                    autoComplete="current-password"
                    value={contrasenaRecuperacion}
                    disabled={cargando}
                    onChange={(event) =>
                      setContrasenaRecuperacion(
                        event.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="credentials-eye"
                    onClick={() =>
                      setMostrarContrasena(!mostrarContrasena)
                    }
                    aria-label="Mostrar u ocultar contraseña"
                  >
                    {mostrarContrasena ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="register-continue"
                disabled={cargando}
              >
                {cargando
                  ? 'Activando cuenta...'
                  : 'Completar mi registro'}
              </button>
            </form>
          </>
        )}

        {paso === 'FINALIZADO' && (
          <div className="register-heading">
            <ShieldCheck size={44} />

            <h1>¡Cuenta creada correctamente!</h1>

            <p>{mensaje}</p>

            <button
              type="button"
              className="register-continue"
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </button>
          </div>
        )}

        {paso !== 'FINALIZADO' && (
          <div className="register-login">
            <span>¿Ya tienes una cuenta?</span>

            <button
              type="button"
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </section>

      <section className="register-visual">
        <div className="register-visual-overlay" />

        <div className="register-visual-content">
          <div className="register-visual-badge">
            <ShieldCheck size={19} />
            Registro seguro
          </div>

          <h2>
            Tu salud,
            <br />
            nuestra prioridad.
          </h2>

          <p>
            Regístrate para gestionar tus consultas
            y citas médicas desde MiDoc.
          </p>

          <div className="register-visual-note">
            <span>01</span>
            <div>
              <strong>Identifícate</strong>
              <p>Ingresa tu DNI.</p>
            </div>
          </div>

          <div className="register-visual-note">
            <span>02</span>
            <div>
              <strong>Completa tus datos</strong>
              <p>Registra tu información personal.</p>
            </div>
          </div>

          <div className="register-visual-note">
            <span>03</span>
            <div>
              <strong>Confirma tu correo</strong>
              <p>Activa tu cuenta mediante el enlace.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RegistroPage
