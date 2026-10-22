import { useState } from 'react'
import {
  CalendarPlus,
  CheckCircle2,
  CreditCard,
  Search,
  ShoppingBag,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import PromotorLayout from '../components/PromotorLayout'
import '../styles/PromotorPages.css'

type EstadoPago = 'PAGADA' | 'PENDIENTE'

function PromotorComprasPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [dni, setDni] = useState(searchParams.get('dni') ?? '')
  const [clienteEncontrado, setClienteEncontrado] = useState(
    Boolean(searchParams.get('dni')),
  )

  const [estadoPago, setEstadoPago] =
    useState<EstadoPago>('PAGADA')

  const [registrado, setRegistrado] = useState(false)

  const buscarCliente = () => {
    if (!dni.trim()) return

    // DEMO VISUAL. Flask realizará la búsqueda real.
    setClienteEncontrado(true)
  }

  const registrarCompra = () => {
    /*
     * DEMO VISUAL TEMPORAL.
     *
     * Backend:
     * - validar cliente
     * - validar adquisición
     * - crear compra
     * - crear consulta asociada
     * - registrar estado de pago
     * - evitar duplicidad
     */
    setRegistrado(true)
  }

  if (registrado) {
    return (
      <PromotorLayout>
        <div className="promotor-page">
          <section className="promotor-success-card">
            <div className="promotor-success-icon">
              <CheckCircle2 size={34} />
            </div>

            <span>Registro completado</span>
            <h1>Consulta registrada correctamente</h1>

            <p>
              La consulta fue asociada al cliente con estado de pago{' '}
              <strong>
                {estadoPago === 'PAGADA' ? 'Pagada' : 'Pendiente'}
              </strong>
              .
            </p>

            <div className="promotor-success-actions">
              <button
                type="button"
                className="promotor-secondary-button"
                onClick={() => {
                  setRegistrado(false)
                  setClienteEncontrado(false)
                  setDni('')
                }}
              >
                Registrar otra compra
              </button>

              <button
                type="button"
                className="promotor-primary-button"
                onClick={() =>
                  navigate(
                    `/promotor/agendamiento?dni=${dni}&consulta=demo`,
                  )
                }
              >
                <CalendarPlus size={16} />
                Agendar ahora
              </button>
            </div>

            <small>
              Si el cliente no desea agendar ahora, podrá hacerlo
              posteriormente desde su perfil.
            </small>
          </section>
        </div>
      </PromotorLayout>
    )
  }

  return (
    <PromotorLayout>
      <div className="promotor-page">
        <section className="promotor-heading">
          <div>
            <span>Adquisición de consulta</span>
            <h1>Registrar compra</h1>
            <p>
              Registra una consulta adquirida y asóciala al cliente
              correspondiente.
            </p>
          </div>

          <div className="promotor-heading-icon">
            <ShoppingBag size={25} />
          </div>
        </section>

        <section className="promotor-section-card">
          <div className="promotor-section-heading">
            <span>Paso 1</span>
            <h2>Identificar cliente</h2>
          </div>

          <div className="promotor-dni-search compact">
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              placeholder="DNI del cliente"
              value={dni}
              onChange={(event) => {
                setDni(event.target.value.replace(/\D/g, ''))
                setClienteEncontrado(false)
              }}
            />

            <button type="button" onClick={buscarCliente}>
              <Search size={17} />
              Buscar cliente
            </button>
          </div>

          {clienteEncontrado && (
            <div className="promotor-client-found">
              <div>
                <span>Cliente encontrado</span>
                <strong>María Fernanda López García</strong>
                <p>DNI {dni}</p>
              </div>

              <CheckCircle2 size={22} />
            </div>
          )}
        </section>

        {clienteEncontrado && (
          <>
            <section className="promotor-section-card">
              <div className="promotor-section-heading">
                <span>Paso 2</span>
                <h2>Datos de la adquisición</h2>
              </div>

              <div className="promotor-form-grid">
                <label>
                  Canal de adquisición
                  <select defaultValue="BCP">
                    <option value="BCP">BCP</option>
                    <option value="CLINICA">Clínica</option>
                    <option value="WEB">Web</option>
                  </select>
                </label>

                <label>
                  Lugar / referencia
                  <input
                    type="text"
                    placeholder="Agencia o punto de atención"
                  />
                </label>

                <label>
                  Precio
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="S/ 0.00"
                  />
                </label>

                <label>
                  Fecha de adquisición
                  <input type="date" />
                </label>
              </div>
            </section>

            <section className="promotor-section-card">
              <div className="promotor-section-heading">
                <span>Paso 3</span>
                <h2>Estado del pago</h2>
              </div>

              <div className="promotor-payment-options">
                <button
                  type="button"
                  className={
                    estadoPago === 'PAGADA' ? 'selected paid' : ''
                  }
                  onClick={() => setEstadoPago('PAGADA')}
                >
                  <CheckCircle2 size={21} />

                  <div>
                    <strong>Pagada</strong>
                    <span>
                      La adquisición ya cuenta con pago registrado.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  className={
                    estadoPago === 'PENDIENTE'
                      ? 'selected pending'
                      : ''
                  }
                  onClick={() => setEstadoPago('PENDIENTE')}
                >
                  <CreditCard size={21} />

                  <div>
                    <strong>Pendiente</strong>
                    <span>
                      El pago aún se encuentra pendiente.
                    </span>
                  </div>
                </button>
              </div>

              <div className="promotor-purchase-note">
                La compra puede registrarse sin especialidad ni cita.
                El cliente podrá decidir posteriormente cuándo y con
                qué especialidad desea agendar.
              </div>
            </section>

            <div className="promotor-final-action">
              <button
                type="button"
                className="promotor-primary-button large"
                onClick={registrarCompra}
              >
                <ShoppingBag size={17} />
                Registrar consulta adquirida
              </button>
            </div>
          </>
        )}
      </div>
    </PromotorLayout>
  )
}

export default PromotorComprasPage