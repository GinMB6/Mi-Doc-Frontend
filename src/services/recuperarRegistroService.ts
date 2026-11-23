
import { createClient } from '@supabase/supabase-js'
import { crearCuentaRegistro } from './registroService'
import type { DatosClienteRegistro } from '../types/registro'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Faltan las variables públicas de Supabase.'
  )
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    detectSessionInUrl: false,
    autoRefreshToken: false,
  },
})

const CLAVE_REGISTRO = 'midoc_registro_pendiente'

interface RegistroPendiente {
  datos: DatosClienteRegistro
  vence: number
}

export async function recuperarRegistro(
  contrasena: string
): Promise<string> {
  const guardado = localStorage.getItem(CLAVE_REGISTRO)

  if (!guardado) {
    throw new Error('No encontramos el registro pendiente.')
  }

  let pendiente: RegistroPendiente

  try {
    pendiente = JSON.parse(guardado) as RegistroPendiente
  } catch {
    throw new Error('Los datos del registro no son válidos.')
  }

  if (
    !pendiente.datos?.correo ||
    !pendiente.vence ||
    Date.now() > pendiente.vence
  ) {
    throw new Error('El registro pendiente ha expirado.')
  }

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: pendiente.datos.correo,
      password: contrasena,
    })

  if (error || !data.session?.access_token) {
    throw new Error(
      'No se pudo iniciar sesión. Comprueba tu contraseña.'
    )
  }

  try {
    const resultado = await crearCuentaRegistro({
      accessToken: data.session.access_token,
      datosCliente: pendiente.datos,
    })

    if (!resultado.creado) {
      throw new Error(resultado.mensaje)
    }

    localStorage.removeItem(CLAVE_REGISTRO)

    return resultado.mensaje || 'Cuenta creada correctamente.'
  } finally {
    await supabase.auth.signOut()
  }
}
