const fechaLima = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'America/Lima',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const fechaVisible = new Intl.DateTimeFormat('es-PE', {
  timeZone: 'UTC',
  dateStyle: 'full',
})

const horaVisible = new Intl.DateTimeFormat('es-PE', {
  timeZone: 'UTC',
  hour: 'numeric',
  minute: '2-digit',
})

export function obtenerFechaLima() {
  return fechaLima.format(new Date())
}

export function formatearFechaDoctor(fecha: string) {
  const valor = new Date(`${fecha}T00:00:00Z`)
  return Number.isNaN(valor.getTime()) ? fecha : fechaVisible.format(valor)
}

export function formatearHoraDoctor(hora: string) {
  const valor = new Date(`2000-01-01T${hora}Z`)
  return Number.isNaN(valor.getTime()) ? hora : horaVisible.format(valor)
}

export function desplazarFechaDoctor(fecha: string, cantidad: number) {
  const valor = new Date(`${fecha}T00:00:00Z`)
  valor.setUTCDate(valor.getUTCDate() + cantidad)
  const anio = valor.getUTCFullYear()
  return anio >= 1 && anio <= 9999 ? valor.toISOString().slice(0, 10) : fecha
}

export function inicioCitaDoctor(fecha: string, hora: string) {
  return Date.parse(`${fecha}T${hora}-05:00`)
}
