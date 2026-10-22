import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react'

import ValidarDni from '../components/registro/ValidarDni'
import type {
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

  const manejarDniValidado = (
    dni: string,
    resultado: ValidarDniResponse
  ) => {
    setDniRegistro(dni)
    setEstadoRegistro(resultado.estado)

    switch (resultado.estado) {
      case 'CUENTA_ACTIVA':
        setPaso('CUENTA_EXISTENTE')
        break

      case 'CLIENTE_PREEXISTENTE':
        setPaso('VERIFICAR_CORREO')
        break

      case 'CLIENTE_NUEVO':
        setPaso('DATOS_CLIENTE')
        break
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

        {paso === 'VALIDAR_DNI' && (
          <ValidarDni
            onDniValidado={manejarDniValidado}
          />
        )}

        {/*
          Los siguientes pasos se conectarán
          progresivamente:

          DATOS_CLIENTE
          → DatosCliente.tsx

          VERIFICAR_CORREO
          → VerificarCorreo.tsx

          CREAR_CREDENCIALES
          → CrearCredenciales.tsx

          CUENTA_EXISTENTE
          → Avisaremos que ya posee una cuenta
             y podrá ir al login.
        */}

        <div className="register-login">
          <span>¿Ya tienes una cuenta?</span>

          <button
            type="button"
            onClick={() => navigate('/login')}
          >
            Iniciar sesión
          </button>
        </div>

        {/*
          Estas variables ya quedan guardadas
          para los siguientes pasos.
        */}

        {false && (
          <div>
            {dniRegistro}
            {estadoRegistro}
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