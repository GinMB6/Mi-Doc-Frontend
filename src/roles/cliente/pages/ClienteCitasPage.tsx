import { useState } from 'react'
import {
  CalendarDays,
  Clock3,
  History,
  Hourglass,
  Info,
  LockKeyhole,
  MapPin,
  Stethoscope,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import ClienteLayout from '../components/ClienteLayout'
import '../styles/ClienteCitasPage.css'

type CitaDemo = {
  id: string
  consultaId: string
  especialidad: string
  medico: string
  sede: string
  fecha: string
  fechaCorta: string
  hora: string
  duracion: number
  estado: 'AGENDADA' | 'ATENDIDA' | 'CANCELADA'
  reprogramacionesCliente: number
}

const citasProximasDemo: CitaDemo[] = [
  {
    id: 'CITA-003',
    consultaId: '003',
    especialidad: 'Cardiología',
    medico: 'Dr. Carlos Ramírez',
    sede: 'Pro',
    fecha: 'Miércoles, 28 de octubre de 2026',
    fechaCorta: '28/10/2026',
    hora: '10:30 a. m.',
    duracion: 30,
    estado: 'AGENDADA',
    reprogramacionesCliente: 1,
  },
  {
    id: 'CITA-004',
    consultaId: '004',
    especialidad: 'Dermatología',
    medico: 'Dra. Ana Torres',
    sede: 'Pro',
    fecha: 'Viernes, 06 de noviembre de 2026',
    fechaCorta: '06/11/2026',
    hora: '11:00 a. m.',
    duracion: 30,
    estado: 'AGENDADA',
    reprogramacionesCliente: 2,
  },
]

const historialDemo: CitaDemo[] = [
  {
    id: 'CITA-001',
    consultaId: '001',
    especialidad: 'Medicina General',
    medico: 'Dra. María López',
    sede: 'Izaguirre',
    fecha: 'Lunes, 05 de octubre de 2026',
    fechaCorta: '05/10/2026',
    hora: '9:00 a. m.',
    duracion: 30,
    estado: 'ATENDIDA',
    reprogramacionesCliente: 0,
  },
  {
    id: 'CITA-002',
    consultaId: '002',
    especialidad: 'Dermatología',
    medico: 'Dra. Ana Torres',
    sede: 'Pro',
    fecha: 'Lunes, 12 de octubre de 2026',
    fechaCorta: '12/10/2026',
    hora: '4:00 p. m.',
    duracion: 30,
    estado: 'CANCELADA',
    reprogramacionesCliente: 0,
  },
]

function ClienteCitasPage() {
  const navigate = useNavigate()

  const [pestanaActiva, setPestanaActiva] =
    useState<'proximas' | 'historial'>('proximas')

  const citas =
    pestanaActiva === 'proximas'
      ? citasProximasDemo
      : historialDemo

  const irAReprogramar = (consultaId: string) => {
    navigate(
      `/cliente/disponibilidad?consulta=${consultaId}&modo=reprogramar`,
    )
  }

  return (
    <ClienteLayout>
      <div className="cliente-citas-page">
        <section className="citas-heading">
          <div>
            <span>Mis citas</span>

            <h1>Mis citas médicas</h1>

            <p>
              Consulta, reprograma o revisa el historial de
              tus citas.
            </p>
          </div>

          <div className="citas-heading-icon">
            <CalendarDays size={30} />
          </div>
        </section>

        <section className="citas-tabs">
          <button
            type="button"
            className={
              pestanaActiva === 'proximas'
                ? 'active'
                : ''
            }
            onClick={() =>
              setPestanaActiva('proximas')
            }
          >
            <CalendarDays size={16} />

            Próximas citas
            <span>{citasProximasDemo.length}</span>
          </button>

          <button
            type="button"
            className={
              pestanaActiva === 'historial'
                ? 'active'
                : ''
            }
            onClick={() =>
              setPestanaActiva('historial')
            }
          >
            <History size={16} />

            Historial
            <span>{historialDemo.length}</span>
          </button>
        </section>

        <section className="citas-list">
          {citas.map((cita) => {
            const alcanzoLimite =
              cita.reprogramacionesCliente >= 2

            const reprogramacionesRestantes =
              2 - cita.reprogramacionesCliente

            return (
              <article
                key={cita.id}
                className="cita-card"
              >
                <div className="cita-card-header">
                  <div className="cita-title-area">
                    <div className="cita-specialty-icon">
                      <Stethoscope size={23} />
                    </div>

                    <div>
                      <span>
                        Consulta #{cita.consultaId}
                      </span>

                      <h2>{cita.especialidad}</h2>

                      <p>{cita.medico}</p>
                    </div>
                  </div>

                  <span
                    className={`cita-status ${cita.estado.toLowerCase()}`}
                  >
                    <i />

                    {cita.estado === 'AGENDADA'
                      ? 'Agendada'
                      : cita.estado === 'ATENDIDA'
                        ? 'Atendida'
                        : 'Cancelada'}
                  </span>
                </div>

                <div className="cita-data-row">
                  <div className="cita-data-item">
                    <CalendarDays size={20} />

                    <div>
                      <span>Fecha</span>
                      <strong>{cita.fecha}</strong>
                    </div>
                  </div>

                  <div className="cita-data-item">
                    <Clock3 size={20} />

                    <div>
                      <span>Hora</span>
                      <strong>{cita.hora}</strong>
                    </div>
                  </div>

                  <div className="cita-data-item">
                    <MapPin size={20} />

                    <div>
                      <span>Sede</span>
                      <strong>
                        Sede {cita.sede}
                      </strong>
                    </div>
                  </div>

                  <div className="cita-data-item">
                    <Hourglass size={20} />

                    <div>
                      <span>Duración</span>
                      <strong>
                        {cita.duracion} minutos
                      </strong>
                    </div>
                  </div>
                </div>

                {cita.estado === 'AGENDADA' && (
                  <>
                    <div className="reprogramaciones-row">
                      <span className="reprogramaciones-label">
                        Reprogramaciones
                      </span>

                      <div className="reprogramaciones-progress">
                        <span
                          className={
                            cita.reprogramacionesCliente >= 1
                              ? 'used'
                              : ''
                          }
                        />

                        <i />

                        <span
                          className={
                            cita.reprogramacionesCliente >= 2
                              ? 'used'
                              : ''
                          }
                        />
                      </div>

                      <div className="reprogramaciones-text">
                        <strong>
                          {cita.reprogramacionesCliente} de 2
                          utilizadas
                        </strong>

                        <span>
                          {alcanzoLimite
                            ? 'Has utilizado todas tus reprogramaciones gratuitas.'
                            : `Tienes ${reprogramacionesRestantes} reprogramación${
                                reprogramacionesRestantes === 1
                                  ? ''
                                  : 'es'
                              } gratuita${
                                reprogramacionesRestantes === 1
                                  ? ''
                                  : 's'
                              } restante${
                                reprogramacionesRestantes === 1
                                  ? ''
                                  : 's'
                              }.`}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`cita-policy ${
                        alcanzoLimite ? 'limit' : ''
                      }`}
                    >
                      {alcanzoLimite ? (
                        <LockKeyhole size={15} />
                      ) : (
                        <Info size={15} />
                      )}

                      <span>
                        {alcanzoLimite
                          ? 'Ya alcanzaste el límite de 2 reprogramaciones. Si necesitas realizar un cambio, comunícate con la clínica.'
                          : 'Puedes reprogramar tu cita según las condiciones establecidas por la clínica.'}
                      </span>
                    </div>
                  </>
                )}

                {cita.estado === 'ATENDIDA' && (
                  <div className="cita-policy history">
                    <Info size={15} />

                    <span>
                      Esta cita ya fue atendida y forma
                      parte de tu historial.
                    </span>
                  </div>
                )}

                {cita.estado === 'CANCELADA' && (
                  <div className="cita-policy cancelled">
                    <Info size={15} />

                    <span>
                      Esta cita fue cancelada. Si la
                      cancelación fue realizada por la
                      clínica, el cambio correspondiente no
                      consume una de las 2 reprogramaciones
                      gratuitas del cliente.
                    </span>
                  </div>
                )}

                {cita.estado === 'AGENDADA' && (
                  <div className="cita-card-actions">
                    <button
                      type="button"
                      className="cita-reprogram-button"
                      disabled={alcanzoLimite}
                      onClick={() =>
                        irAReprogramar(
                          cita.consultaId,
                        )
                      }
                    >
                      {alcanzoLimite ? (
                        <LockKeyhole size={15} />
                      ) : (
                        <CalendarDays size={15} />
                      )}

                      {alcanzoLimite
                        ? 'Límite alcanzado'
                        : 'Reprogramar'}
                    </button>
                  </div>
                )}
              </article>
            )
          })}
        </section>
      </div>
    </ClienteLayout>
  )
}

export default ClienteCitasPage