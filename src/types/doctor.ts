export const nombresEstadoCita = {
  AGENDADA: 'Agendada',
  ATENDIDA: 'Atendida',
  CANCELADA: 'Cancelada',
  NO_ASISTIO: 'No asistió',
} as const

export type EstadoCita = keyof typeof nombresEstadoCita
export type ResultadoCita = 'ATENDIDA' | 'NO_ASISTIO'

export type CitaDoctor = {
  id_cita: string
  id_doctor: string
  paciente: string
  especialidad: string
  sede: string
  fecha: string
  hora: string
  duracion_minutos: number
  estado: EstadoCita
}

export type PerfilDoctor = {
  id_doctor: string
  nombre: string
  especialidad: string
  sede: string
}

export type RespuestaCitasDoctor = {
  citas: CitaDoctor[]
  total: number
}

export type AgendaDoctor = RespuestaCitasDoctor & { fecha: string }
