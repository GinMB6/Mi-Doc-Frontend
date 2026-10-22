import { useState } from 'react'
import {
  ArrowRight,
  CalendarPlus,
  CheckCircle2,
  ClipboardList,
  Search,
  ShoppingBag,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import PromotorLayout from '../components/PromotorLayout'
import '../styles/PromotorPages.css'

function PromotorInicioPage() {
  const navigate = useNavigate()
  const [dni, setDni] = useState('')

  const buscarCliente = () => {
    if (!dni.trim()) return

    navigate(
      `/promotor/clientes?dni=${encodeURIComponent(dni.trim())}`,
    )
  }

  return (
    <PromotorLayout>
      <div className="promotor-page">
        <section className="promotor-heading">
          <div>
            <span>Portal Promotor BCP</span>
            <h1>Bienvenido a MiDoc</h1>
            <p>
              Registra clientes, compras de consultas y brinda asistencia
              para el agendamiento.
            </p>
          </div>
        </section>

        <section className="promotor-search-card">
          <div className="promotor-search-copy">
            <div className="promotor-search-icon">
              <Search size={23} />
            </div>

            <div>
              <span>Atención rápida</span>
              <h2>Buscar cliente por DNI</h2>
              <p>
                Comprueba si el cliente ya está registrado antes de
                registrar una nueva compra.
              </p>
            </div>
          </div>

          <div className="promotor-dni-search">
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              placeholder="DNI del cliente"
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

        <section className="promotor-summary-grid">
          <article>
            <Users size={20} />
            <div>
              <span>Clientes atendidos hoy</span>
              <strong>18</strong>
            </div>
          </article>

          <article>
            <ShoppingBag size={20} />
            <div>
              <span>Compras registradas</span>
              <strong>12</strong>
            </div>
          </article>

          <article>
            <CheckCircle2 size={20} />
            <div>
              <span>Consultas pagadas</span>
              <strong>9</strong>
            </div>
          </article>

          <article>
            <CalendarPlus size={20} />
            <div>
              <span>Agendadas hoy</span>
              <strong>7</strong>
            </div>
          </article>
        </section>

        <section className="promotor-section-card">
          <div className="promotor-section-heading">
            <span>Operaciones</span>
            <h2>Acciones rápidas</h2>
          </div>

          <div className="promotor-actions-grid">
            <button
              type="button"
              onClick={() => navigate('/promotor/clientes')}
            >
              <Users size={22} />
              <div>
                <strong>Buscar cliente</strong>
                <span>Consultar o registrar un cliente</span>
              </div>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/promotor/compras')}
            >
              <ShoppingBag size={22} />
              <div>
                <strong>Registrar compra</strong>
                <span>Registrar una consulta adquirida</span>
              </div>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/promotor/consultas')}
            >
              <ClipboardList size={22} />
              <div>
                <strong>Consultar adquisiciones</strong>
                <span>Revisar estado y pago</span>
              </div>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/promotor/agendamiento')}
            >
              <CalendarPlus size={22} />
              <div>
                <strong>Agendar consulta</strong>
                <span>Ayudar al cliente a programar su cita</span>
              </div>
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </div>
    </PromotorLayout>
  )
}

export default PromotorInicioPage