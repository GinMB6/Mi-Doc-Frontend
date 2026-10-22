import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react'

import ValidarDni from '../components/registro/ValidarDni'
import DatosCliente from '../components/registro/DatosCliente'
import VerificarCorreo from '../components/registro/VerificarCorreo'
import CrearCredenciales from '../components/registro/CrearCredenciales'

import {
  crearCuentaRegistro,
  enviarCodigoVerificacion,
} from '../../services/registroService'

import type {
  DatosClienteRegistro,
  EstadoRegistro,
  ValidarDniResponse,
} from '../../types/registro'

import '../styles/RegistroPage.css'

type PasoRegistro =
  | 'VALIDAR_DNI'
  | 'DATOS_CLIENTE'
  | 'VERIFICAR_CORREO'
  | 'CREAR_CREDENCIALES'
  | 'CUENTA_EXISTENTE'

function RegistroPage() {
  const navigate = useNavigate()

  const [paso, setPaso] =
    useState<PasoRegistro>('VALIDAR_DNI')

  const [dniRegistro, setDniRegistro] =
    useState('')

  const [estadoRegistro, setEstadoRegistro] =
    useState<EstadoRegistro | null>(null)

  const [correoEnmascarado, setCorreoEnmascarado] =
    useState('')

  const [datosCliente, setDatosCliente] =
    useState<DatosClienteRegistro | null>(null)

  const manejarDniValidado = async (
    dni: string,
    resultado: ValidarDniResponse
  ) => {
    setDniRegistro(dni)
    setEstadoRegistro(resultado.estado)

    setCorreoEnmascarado(
      resultado.correoEnmascarado ?? ''
    )

    switch (resultado.estado) {
      case 'CUENTA_ACTIVA':
        setPaso('CUENTA_EXISTENTE')
        break

      case 'CLIENTE_PREEXISTENTE':
        try {
          const respuesta =
            await enviarCodigoVerificacion({
              dni,
            })

          setCorreoEnmascarado(
            respuesta.correoEnmascarado
          )

          setPaso('VERIFICAR_CORREO')
        } catch (error) {
          console.error(
            'Error al enviar el código:',
            error
          )
        }

        break

      case 'CLIENTE_NUEVO':
        setPaso('DATOS_CLIENTE')
        break
    }
  }

  const manejarDatosCliente = async (
    datos: DatosClienteRegistro
  ) => {
    setDatosCliente(datos)

    try {
      const respuesta =
        await enviarCodigoVerificacion({
          dni: datos.dni,
          correo: datos.correo,
        })

      setCorreoEnmascarado(
        respuesta.correoEnmascarado
      )

      setPaso('VERIFICAR_CORREO')
    } catch (error) {
      console.error(
        'Error al enviar el código:',
        error
      )
    }
  }

  const manejarCorreoVerificado = () => {
    setPaso('CREAR_CREDENCIALES')
  }

const manejarCrearCuenta = async (
  contrasena: string
) => {
  try {
    const resultado = await crearCuentaRegistro({
      dni: dniRegistro,
      contrasena,
      datosCliente:
        estadoRegistro === 'CLIENTE_NUEVO'
          ? datosCliente ?? undefined
          : undefined,
    })

    if (!resultado.creado) {
      console.error(resultado.mensaje)
      return
    }

    navigate('/login', {
      state: {
        registroExitoso: true,
        mensaje: resultado.mensaje,
      },
    })
  } catch (error) {
    console.error(
      'Error al crear la cuenta:',
      error
    )
  }
}


  const volverDesdeVerificacion = () => {
    if (estadoRegistro === 'CLIENTE_NUEVO') {
      setPaso('DATOS_CLIENTE')
      return
    }

    setPaso('VALIDAR_DNI')
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

        {paso === 'VERIFICAR_CORREO' && (
          <VerificarCorreo
            dni={dniRegistro}
            correo={datosCliente?.correo ?? ''}
            correoEnmascarado={correoEnmascarado}
            onVerificado={manejarCorreoVerificado}
            onVolver={volverDesdeVerificacion}
          />
        )}

        {paso === 'CREAR_CREDENCIALES' && (
          <CrearCredenciales
            onCrearCuenta={manejarCrearCuenta}
           onVolver={() => setPaso('VERIFICAR_CORREO')}
         />
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

        {false && (
          <div>
            {dniRegistro}
            {estadoRegistro}
            {correoEnmascarado}
            {datosCliente?.correo}
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
            Tu información
            <br />
            ya puede estar con nosotros.
          </h2>

          <p>
            Si adquiriste una consulta anteriormente,
            MiDoc reconocerá tus datos para que no tengas
            que volver a registrarlos.
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
              <strong>Verifica tu información</strong>

              <p>
                Comprobaremos si ya tienes datos
                registrados.
              </p>
            </div>
          </div>

          <div className="register-visual-note">
            <span>03</span>

            <div>
              <strong>Confirma tu correo</strong>

              <p>
                Recibirás un código para verificar tu
                cuenta.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RegistroPage