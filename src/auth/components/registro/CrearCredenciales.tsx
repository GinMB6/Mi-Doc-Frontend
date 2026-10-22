import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'

interface CrearCredencialesProps {
  onCrearCuenta: (
    contrasena: string
  ) => void
  onVolver: () => void
}

function CrearCredenciales({
  onCrearCuenta,
  onVolver,
}: CrearCredencialesProps) {
  const [contrasena, setContrasena] =
    useState('')

  const [confirmarContrasena, setConfirmarContrasena] =
    useState('')

  const [mostrarContrasena, setMostrarContrasena] =
    useState(false)

  const [
    mostrarConfirmacion,
    setMostrarConfirmacion,
  ] = useState(false)

  const [error, setError] = useState('')

  const tieneLongitud =
    contrasena.length >= 8

  const tieneMayuscula =
    /[A-Z]/.test(contrasena)

  const tieneMinuscula =
    /[a-z]/.test(contrasena)

  const tieneNumero =
    /\d/.test(contrasena)

  const contrasenaValida =
    tieneLongitud &&
    tieneMayuscula &&
    tieneMinuscula &&
    tieneNumero

  const crearCuenta = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setError('')

    if (!contrasena || !confirmarContrasena) {
      setError(
        'Completa ambos campos de contraseña.'
      )
      return
    }

    if (!contrasenaValida) {
      setError(
        'La contraseña todavía no cumple todos los requisitos.'
      )
      return
    }

    if (contrasena !== confirmarContrasena) {
      setError(
        'Las contraseñas no coinciden.'
      )
      return
    }

    onCrearCuenta(contrasena)
  }

  return (
    <>
      <div className="register-progress">
        <div className="register-progress-number">
          4
        </div>

        <div>
          <span>Paso 4 de 4</span>
          <p>Seguridad de la cuenta</p>
        </div>
      </div>

      <div className="register-heading">
        <h1>Crea tu contraseña</h1>

        <p>
          Tu correo ya fue verificado. Ahora crea
          una contraseña segura para acceder a MiDoc.
        </p>
      </div>

      <div className="credentials-verified">
        <div className="credentials-verified-icon">
          <ShieldCheck size={20} />
        </div>

        <div>
          <strong>Correo verificado</strong>
          <span>
            Tu identidad fue confirmada correctamente.
          </span>
        </div>
      </div>

      <form
        className="register-form"
        onSubmit={crearCuenta}
      >
        <div className="register-form-group">
          <label htmlFor="registro-contrasena">
            Contraseña
          </label>

          <div
            className={`register-input ${
              error ? 'register-input-error' : ''
            }`}
          >
            <LockKeyhole size={20} />

            <input
              id="registro-contrasena"
              type={
                mostrarContrasena
                  ? 'text'
                  : 'password'
              }
              autoComplete="new-password"
              placeholder="Crea una contraseña"
              value={contrasena}
              onChange={(event) => {
                setContrasena(event.target.value)
                setError('')
              }}
            />

            <button
              type="button"
              className="credentials-eye"
              onClick={() =>
                setMostrarContrasena(
                  !mostrarContrasena
                )
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

        <div className="register-form-group">
          <label htmlFor="confirmar-contrasena">
            Confirmar contraseña
          </label>

          <div
            className={`register-input ${
              error ? 'register-input-error' : ''
            }`}
          >
            <LockKeyhole size={20} />

            <input
              id="confirmar-contrasena"
              type={
                mostrarConfirmacion
                  ? 'text'
                  : 'password'
              }
              autoComplete="new-password"
              placeholder="Repite tu contraseña"
              value={confirmarContrasena}
              onChange={(event) => {
                setConfirmarContrasena(
                  event.target.value
                )
                setError('')
              }}
            />

            <button
              type="button"
              className="credentials-eye"
              onClick={() =>
                setMostrarConfirmacion(
                  !mostrarConfirmacion
                )
              }
              aria-label="Mostrar u ocultar contraseña"
            >
              {mostrarConfirmacion ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        <div className="credentials-requirements">
          <p>Tu contraseña debe contener:</p>

          <div
            className={
              tieneLongitud
                ? 'requirement-ok'
                : ''
            }
          >
            <Check size={14} />
            Mínimo 8 caracteres
          </div>

          <div
            className={
              tieneMayuscula
                ? 'requirement-ok'
                : ''
            }
          >
            <Check size={14} />
            Una letra mayúscula
          </div>

          <div
            className={
              tieneMinuscula
                ? 'requirement-ok'
                : ''
            }
          >
            <Check size={14} />
            Una letra minúscula
          </div>

          <div
            className={
              tieneNumero
                ? 'requirement-ok'
                : ''
            }
          >
            <Check size={14} />
            Un número
          </div>
        </div>

        {error && (
          <p className="register-error">
            {error}
          </p>
        )}

        <div className="register-actions">
          <button
            type="button"
            className="register-secondary"
            onClick={onVolver}
          >
            <ArrowLeft size={18} />
            Volver
          </button>

          <button
            type="submit"
            className="register-continue"
          >
            Crear cuenta
            <ArrowRight size={19} />
          </button>
        </div>
      </form>
    </>
  )
}

export default CrearCredenciales