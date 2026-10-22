import { useState } from 'react'
import {
  ArrowRight,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { validarDniRegistro } from '../../../services/registroService'
import type {
  ValidarDniResponse,
} from '../../../types/registro'

interface ValidarDniProps {
  onDniValidado: (
    dni: string,
    resultado: ValidarDniResponse
  ) => void
}

function ValidarDni({
  onDniValidado,
}: ValidarDniProps) {
  const [dni, setDni] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const validarDni = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setError('')

    if (dni.length !== 8) {
      setError('Ingresa un DNI válido de 8 dígitos.')
      return
    }

    try {
      setCargando(true)

      const resultado = await validarDniRegistro({
        dni,
      })

      onDniValidado(dni, resultado)
    } catch (error) {
      console.error(error)

      setError(
        'No pudimos validar tu DNI en este momento. Inténtalo nuevamente.'
      )
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      <div className="register-progress">
        <div className="register-progress-number">
          1
        </div>

        <div>
          <span>Paso 1 de 4</span>
          <p>Identificación</p>
        </div>
      </div>

      <div className="register-heading">
        <h1>Crea tu cuenta</h1>

        <p>
          Primero necesitamos verificar si ya tienes
          información registrada en MiDoc.
        </p>
      </div>

      <form
        className="register-form"
        onSubmit={validarDni}
      >
        <div className="register-form-group">
          <label htmlFor="registro-dni">
            DNI
          </label>

          <div
            className={`register-input ${
              error ? 'register-input-error' : ''
            }`}
          >
            <UserRound size={20} />

            <input
              id="registro-dni"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={8}
              placeholder="Ingresa tu DNI"
              value={dni}
              disabled={cargando}
              onChange={(event) => {
                setDni(
                  event.target.value.replace(/\D/g, '')
                )

                if (error) {
                  setError('')
                }
              }}
            />
          </div>

          {error && (
            <p className="register-error">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="register-continue"
          disabled={cargando}
        >
          {cargando
            ? 'Verificando...'
            : 'Continuar'}

          {!cargando && (
            <ArrowRight size={19} />
          )}
        </button>
      </form>

      <div className="register-info">
        <ShieldCheck size={19} />

        <p>
          Usaremos tu DNI únicamente para comprobar
          si ya existe información asociada a ti en
          MiDoc.
        </p>
      </div>
    </>
  )
}

export default ValidarDni