import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Search,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import RecepcionLayout from '../components/RecepcionLayout'
import '../styles/RecepcionPages.css'

function RecepcionInicioPage() {
  const navigate = useNavigate()
  const [dni, setDni] = useState('')

  const buscarCliente = () => {
    const dniLimpio = dni.trim()

    if (!dniLimpio) return

    navigate(
      `/recepcion/clientes?dni=${encodeURIComponent(dniLimpio)}`,
    )
  }

  return (
    <RecepcionLayout>
      <div className="recepcion-page">
        <section className="recepcion-heading">
          <div>
            <span>Portal de recepción</span>
            <h1>Bienvenido a MiDoc</h1>
            <p>
              Gestiona clientes, consultas adquiridas y citas médicas
              desde un solo lugar.
            </p>
          </div>

          <div className="recepcion-date">
            <CalendarDays size={18} />
            22 de octubre de 2026
          </div>
        </section>

        <section className="recepcion-search-card">
          <div className="recepcion-search-copy">
            <div className="recepcion-search-icon">
              <Search size={22} />
            </div>

            <div>
              <span>Búsqueda rápida</span>
              <h2>Buscar cliente por DNI</h2>
              <p>
                Consulta rápidamente sus datos, consultas adquiridas,
                estado de pago y citas.
              </p>
            </div>
          </div>

          <div className="recepcion-dni-search">
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              placeholder="Ingresa los 8 dígitos del DNI"
              value={dni}
              onChange={(event) =>
                setDni(event.target.value.replace(/\D/g, ''))
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') buscarCliente()
              }}
            />

            <button type="button" onClick={buscarCliente}>
              <Search size={17} />
              Buscar
            </button>
          </div>
        </section>

        <section className="recepcion-summary-grid">
          <article className="recepcion-summary-card">
            <div className="recepcion-summary-icon">
              <Users size={20} />
            </div>
            <div>
              <span>Clientes registrados</span>
              <strong>124</strong>
            </div>
          </article>

          <article className="recepcion-summary-card">
            <div className="recepcion-summary-icon">
              <ClipboardList size={20} />
            </div>
            <div>
              <span>Consultas adquiridas</span>
              <strong>56</strong>
            </div>
          </article>

          <article className="recepcion-summary-card">
            <div className="recepcion-summary-icon">
              <CalendarDays size={20} />
            </div>
            <div>
              <span>Citas programadas</span>
              <strong>32</strong>
            </div>
          </article>

          <article className="recepcion-summary-card">
            <div className="recepcion-summary-icon">
              <Clock3 size={20} />
            </div>
            <div>
              <span>Citas de hoy</span>
              <strong>8</strong>
            </div>
          </article>
        </section>

        <section className="recepcion-section-card">
          <div className="recepcion-section-heading">
            <div>
              <span>Acciones frecuentes</span>
              <h2>Accesos rápidos</h2>
            </div>
          </div>

          <div className="recepcion-quick-grid">
            <button
              type="button"
              onClick={() => navigate('/recepcion/clientes')}
            >
              <Users size={22} />
              <div>
                <strong>Gestionar clientes</strong>
                <span>Buscar y consultar información</span>
              </div>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/recepcion/consultas')}
            >
              <ClipboardList size={22} />
              <div>
                <strong>Ver consultas</strong>
                <span>Revisar consultas y estado de pago</span>
              </div>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/recepcion/citas')}
            >
              <CalendarDays size={22} />
              <div>
                <strong>Gestionar citas</strong>
                <span>Consultar las citas programadas</span>
              </div>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/recepcion/consultas')}
            >
              <CheckCircle2 size={22} />
              <div>
                <strong>Verificar pagos</strong>
                <span>Identificar pagos pendientes rápidamente</span>
              </div>
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </div>
    </RecepcionLayout>
  )
}

export default RecepcionInicioPage