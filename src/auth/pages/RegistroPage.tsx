
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  HeartPulse,
  MailCheck,
  ShieldCheck,
} from 'lucide-react'

import ValidarDni from '../components/registro/ValidarDni'
import DatosCliente from '../components/registro/DatosCliente'
import CrearCredenciales from '../components/registro/CrearCredenciales'

import {
  enviarCodigoVerificacion,
  crearCuentaRegistro,
} from '../../services/registroService'

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
  | 'FINALIZADO'

interface RegistroPendiente {
  datos: DatosClienteRegistro
  vence: number
}

const CLAVE_REGISTRO = 'midoc_registro_pendiente'
const DURACION_REGISTRO = 30 * 60 * 1000

function guardarRegistro(
  datos: DatosClienteRegistro
) {
  const pendiente: RegistroPendiente = {
    datos,
    vence: Date.now() + DURACION_REGISTRO,
  }

  localStorage.setItem(
    CLAVE_REGISTRO,
    JSON.stringify(pendiente)
  )
}

function recuperarRegistro(): DatosClienteRegistro | null {
  try {
    const guardado = localStorage.getItem(
      CLAVE_REGISTRO
    )

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

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const confirmarRegistro = async () => {
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

      if (errorAuth) {
        setError(errorAuth)
        setPaso('VERIFICAR_CORREO')

        window.history.replaceState(
          {},
          '',
          window.location.pathname
        )
        return
      }

      const pendiente = recuperarRegistro()

      if (!token) {
        if (pendiente) {
          setDatosCliente(pendiente)
          setDniRegistro(pendiente.dni)
          setPaso('VERIFICAR_CORREO')
        }
        return
      }

      // Retiramos el token de la barra de direcciones.
      window.history.replaceState(
        {},
        '',
        window.location.pathname
      )

      if (!pendiente) {
        setError(
          'No encontramos los datos del registro ' +
          'o el registro ha expirado. ' +
          'Inicia el proceso nuevamente.'
        )
        setPaso('VERIFICAR_CORREO')
        return
      }

      setPaso('VERIFICAR_CORREO')
      setCargando(true)
      setError('')

      try {
        const resultado = await crearCuentaRegistro({
          accessToken: token,
          datosCliente: pendiente,
        })

        if (!resultado.creado) {
          throw new Error(resultado.mensaje)
        }

        localStorage.removeItem(CLAVE_REGISTRO)

        setDatosCliente(null)
        setMensaje(
          resultado.mensaje ||
          'Tu cuenta se creó correctamente.'
        )
        setPaso('FINALIZADO')
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'No se pudo completar tu registro.'
        )
      } finally {
        setCargando(false)
      }
    }

    void confirmarRegistro()
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
      setError(
        'Primero debes completar tus datos personales.'
      )
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
          : 'No se pudo enviar la confirmación.'

      setError(mensajeError)
      throw new Error(mensajeError)
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
            onVolver={() => {
              setError('')
              setPaso('VALIDAR_DNI')
            }}
          />
        )}

        {paso === 'CREAR_CREDENCIALES' && (
          <CrearCredenciales
            onCrearCuenta={manejarCrearCuenta}
            onVolver={() => {
              setError('')
              setPaso('DATOS_CLIENTE')
            }}
          />
        )}

        {paso === 'VERIFICAR_CORREO' && (
          <div className="register-heading">
            <MailCheck size={44} />

            <h1>Verifica tu correo</h1>

            <p>
              {mensaje ||
                'Revisa tu correo y abre el enlace de confirmación de MiDoc.'}
            </p>

            {datosCliente && (
              <p>
                Correo: {datosCliente.correo}
              </p>
            )}

            {cargando && (
              <p>Activando tu cuenta, espera...</p>
            )}

            <p>
              El enlace debe abrirse en este mismo
              navegador para completar el registro.
            </p>

            {!cargando && (
              <button
                type="button"
                className="register-secondary"
                onClick={() => {
                  localStorage.removeItem(CLAVE_REGISTRO)
                  setDatosCliente(null)
                  setError('')
                  setMensaje('')
                  setPaso('VALIDAR_DNI')
                }}
              >
                Iniciar un nuevo registro
              </button>
            )}
          </div>
        )}

        {paso === 'FINALIZADO' && (
          <div className="register-heading">
            <ShieldCheck size={44} />

            <h1>¡Cuenta creada correctamente!</h1>

            <p>
              {mensaje}
            </p>

            <button
              type="button"
              className="register-continue"
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </button>
          </div>
        )}

        <div className="register-login">
          <span>¿Ya tienes una cuenta?</span>

          <button
            type="button"
            onClick={() => navigate('/login')}
          >
            Iniciar sesión
          </button>
        </div>
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
