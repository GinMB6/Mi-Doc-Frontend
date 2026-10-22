import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react'

import type {
  DatosClienteRegistro,
} from '../../../types/registro'

interface DatosClienteProps {
  dni: string
  onContinuar: (datos: DatosClienteRegistro) => void
  onVolver: () => void
}

function DatosCliente({
  dni,
  onContinuar,
  onVolver,
}: DatosClienteProps) {
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [fechaNacimiento, setFechaNacimiento] =
    useState('')

  const [error, setError] = useState('')

  const continuar = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setError('')

    if (
      !nombres.trim() ||
      !apellidos.trim() ||
      !telefono.trim() ||
      !correo.trim() ||
      !fechaNacimiento
    ) {
      setError(
        'Completa todos los datos para continuar.'
      )
      return
    }

    if (telefono.length !== 9) {
      setError(
        'Ingresa un número de celular válido de 9 dígitos.'
      )
      return
    }

    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)

    if (!correoValido) {
      setError(
        'Ingresa un correo electrónico válido.'
      )
      return
    }

    onContinuar({
      dni,
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      telefono,
      correo: correo.trim().toLowerCase(),
      fechaNacimiento,
    })
  }

  return (
    <>
      <div className="register-progress">
        <div className="register-progress-number">
          2
        </div>

        <div>
          <span>Paso 2 de 4</span>
          <p>Datos personales</p>
        </div>
      </div>

      <div className="register-heading">
        <h1>Cuéntanos sobre ti</h1>

        <p>
          No encontramos información previa asociada
          a tu DNI. Completa tus datos para crear tu
          cuenta MiDoc.
        </p>
      </div>

      <form
        className="register-form"
        onSubmit={continuar}
      >
        <div className="register-form-group">
          <label>DNI</label>

          <div className="register-input register-input-disabled">
            <UserRound size={20} />

            <input
              type="text"
              value={dni}
              disabled
            />
          </div>
        </div>

        <div className="register-form-row">
          <div className="register-form-group">
            <label htmlFor="registro-nombres">
              Nombres
            </label>

            <div className="register-input">
              <UserRound size={20} />

              <input
                id="registro-nombres"
                type="text"
                autoComplete="given-name"
                placeholder="Tus nombres"
                value={nombres}
                onChange={(event) => {
                  setNombres(event.target.value)
                  setError('')
                }}
              />
            </div>
          </div>

          <div className="register-form-group">
            <label htmlFor="registro-apellidos">
              Apellidos
            </label>

            <div className="register-input">
              <UserRound size={20} />

              <input
                id="registro-apellidos"
                type="text"
                autoComplete="family-name"
                placeholder="Tus apellidos"
                value={apellidos}
                onChange={(event) => {
                  setApellidos(event.target.value)
                  setError('')
                }}
              />
            </div>
          </div>
        </div>

        <div className="register-form-row">
          <div className="register-form-group">
            <label htmlFor="registro-telefono">
              Celular
            </label>

            <div className="register-input">
              <Phone size={20} />

              <input
                id="registro-telefono"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={9}
                placeholder="987654321"
                value={telefono}
                onChange={(event) => {
                  setTelefono(
                    event.target.value.replace(/\D/g, '')
                  )
                  setError('')
                }}
              />
            </div>
          </div>

          <div className="register-form-group">
            <label htmlFor="registro-fecha">
              Fecha de nacimiento
            </label>

            <div className="register-input">
              <CalendarDays size={20} />

              <input
                id="registro-fecha"
                type="date"
                value={fechaNacimiento}
                onChange={(event) => {
                  setFechaNacimiento(event.target.value)
                  setError('')
                }}
              />
            </div>
          </div>
        </div>

        <div className="register-form-group">
          <label htmlFor="registro-correo">
            Correo electrónico
          </label>

          <div className="register-input">
            <Mail size={20} />

            <input
              id="registro-correo"
              type="email"
              autoComplete="email"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(event) => {
                setCorreo(event.target.value)
                setError('')
              }}
            />
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
            Continuar
            <ArrowRight size={19} />
          </button>
        </div>
      </form>
    </>
  )
}

export default DatosCliente