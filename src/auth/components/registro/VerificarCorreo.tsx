import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'

import {
  enviarCodigoVerificacion,
  verificarCodigoRegistro,
} from '../../../services/registroService'

interface VerificarCorreoProps {
  dni: string
  correo: string
  correoEnmascarado?: string
  onVerificado: () => void
  onVolver: () => void
}

function VerificarCorreo({
  dni,
  correo,
  correoEnmascarado,
  onVerificado,
  onVolver,
}: VerificarCorreoProps) {
  const [codigo, setCodigo] = useState('')
  const [cargando, setCargando] = useState(false)
  const [reenviando, setReenviando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const correoVisible =
    correoEnmascarado || correo

  const verificarCodigo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')
    setMensaje('')

    if (codigo.length !== 6) {
      setError(
        'Ingresa el código de 6 dígitos enviado a tu correo.'
      )
      return
    }

    try {
      setCargando(true)

      const resultado =
        await verificarCodigoRegistro({
          dni,
          codigo,
        })

      if (!resultado.verificado) {
        setError(
          resultado.mensaje ||
            'El código ingresado no es válido.'
        )
        return
      }

      onVerificado()
    } catch (error) {
      console.error(error)

      setError(
        'No pudimos verificar el código. Inténtalo nuevamente.'
      )
    } finally {
      setCargando(false)
    }
  }

  const reenviarCodigo = async () => {
    setError('')
    setMensaje('')

    try {
      setReenviando(true)

      const resultado =
        await enviarCodigoVerificacion({
          dni,
          correo,
        })

      setMensaje(
        resultado.mensaje ||
          'Te enviamos un nuevo código.'
      )
    } catch (error) {
      console.error(error)

      setError(
        'No pudimos reenviar el código. Inténtalo nuevamente.'
      )
    } finally {
      setReenviando(false)
    }
  }

  return (
    <>
      <div className="register-progress">
        <div className="register-progress-number">
          3
        </div>

        <div>
          <span>Paso 3 de 4</span>
          <p>Verificación de correo</p>
        </div>
      </div>

      <div className="register-heading">
        <h1>Revisa tu correo</h1>

        <p>
          Enviamos un código de verificación de
          6 dígitos a:
        </p>
      </div>

      <div className="verification-email">
        <div className="verification-email-icon">
          <Mail size={21} />
        </div>

        <div>
          <span>Correo registrado</span>
          <strong>{correoVisible}</strong>
        </div>
      </div>

      <form
        className="register-form"
        onSubmit={verificarCodigo}
      >
        <div className="register-form-group">
          <label htmlFor="codigo-verificacion">
            Código de verificación
          </label>

          <div
            className={`register-input verification-code-input ${
              error ? 'register-input-error' : ''
            }`}
          >
            <ShieldCheck size={20} />

            <input
              id="codigo-verificacion"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              value={codigo}
              disabled={cargando}
              onChange={(event) => {
                setCodigo(
                  event.target.value.replace(/\D/g, '')
                )

                setError('')
                setMensaje('')
              }}
            />
          </div>
        </div>

        {error && (
          <p className="register-error">
            {error}
          </p>
        )}

        {mensaje && (
          <p className="verification-success">
            {mensaje}
          </p>
        )}

        <button
          type="submit"
          className="register-continue"
          disabled={cargando}
        >
          {cargando
            ? 'Verificando...'
            : 'Verificar código'}

          {!cargando && (
            <ArrowRight size={19} />
          )}
        </button>
      </form>

      <div className="verification-resend">
        <span>¿No recibiste el código?</span>

        <button
          type="button"
          onClick={reenviarCodigo}
          disabled={reenviando}
        >
          <RefreshCw size={14} />

          {reenviando
            ? 'Reenviando...'
            : 'Reenviar código'}
        </button>
      </div>

      <button
        type="button"
        className="verification-back"
        onClick={onVolver}
      >
        <ArrowLeft size={16} />
        Volver al paso anterior
      </button>
    </>
  )
}

export default VerificarCorreo