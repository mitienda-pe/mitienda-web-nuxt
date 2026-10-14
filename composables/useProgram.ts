/**
 * Programa de convenio con el que llega la persona (?programa=TUEMPRESA).
 *
 * Se guarda en una cookie porque el enlace o el QR puede abrir cualquier página
 * y el registro ocurre después. El API valida el código: uno desconocido o
 * vencido deja la prueba gratis normal.
 */
const PROGRAMS: Record<string, { name: string; benefit: string }> = {
  TUEMPRESA: {
    name: 'Programa Tu Empresa — Ministerio de la Producción',
    benefit: 'Tu primer mes es gratis, y puedes ganar dos meses más: uno al configurar tu tienda y otro al conectar tu dominio propio.'
  }
}

export function useProgram() {
  const code = useCookie<string | null>('mt_programa', { maxAge: 60 * 60 * 24 * 60, sameSite: 'lax', default: () => null })

  function capture(value: unknown): void {
    const raw = Array.isArray(value) ? value[0] : value
    if (typeof raw !== 'string') return
    const normalized = raw.trim().toUpperCase()
    if (/^[A-Z0-9_-]{2,40}$/.test(normalized)) {
      code.value = normalized
    }
  }

  const program = computed(() => (code.value ? PROGRAMS[code.value] ?? null : null))

  return { code, program, capture }
}
