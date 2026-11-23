import { Link } from 'react-router-dom'
import type { ErrorDoctor } from '../../../services/doctorService'
import { nombresEstadoCita, type EstadoCita } from '../../../types/doctor'

export function EstadoCitaDoctor({ estado }: { estado: EstadoCita }) {
  return <span className={`doctor-status ${estado.toLowerCase()}`}>{nombresEstadoCita[estado]}</span>
}

type AvisoConsultaDoctorProps = {
  cargando: boolean
  error?: ErrorDoctor
  vacio?: string
  recargar: () => void
}

export function AvisoConsultaDoctor({ cargando, error, vacio, recargar }: AvisoConsultaDoctorProps) {
  if (cargando) return <p className="doctor-feedback" role="status">Cargando información…</p>

  if (error) {
    const accesoDenegado = error.estadoHttp === 401 || error.estadoHttp === 403
    return (
      <div className="doctor-feedback">
        <p role="alert">{error.message}</p>
        {accesoDenegado ? (
          <Link className="doctor-view-button" to="/login">Ir al inicio de sesión</Link>
        ) : (
          <button className="doctor-view-button" type="button" onClick={recargar}>
            Reintentar
          </button>
        )}
      </div>
    )
  }

  return vacio ? <p className="doctor-feedback" role="status">{vacio}</p> : null
}
