/**
 * Culqi en el navegador para la página de cobro de links de la plataforma
 * (`/pago/<hash>`). Es una versión reducida de
 * `mitienda-storefront-nuxt3/app/services/payment/culqi.ts`: Checkout Custom
 * solo con tarjeta + autenticación 3DS. Si se arregla algo de Culqi allá,
 * revisar si aplica aquí.
 *
 * Flujo:
 * 1. `prepare3DS()` → device fingerprint (va en el primer cargo y en el reintento).
 * 2. `openCardCheckout()` → token `tkn_…` de la tarjeta.
 * 3. El backend cobra. Si responde `needs_3ds`, `authenticate3DS()` abre el
 *    desafío del banco y se reintenta el cargo con `authentication_3DS`.
 */

type CulqiObject = { id: string; [key: string]: unknown }
type CulqiError = { user_message?: string; merchant_message?: string }

interface CulqiCheckoutInstance {
  culqi: () => void
  closeCheckout: () => void
  open: () => void
  close: () => void
  token?: CulqiObject | null
  error?: CulqiError | null
}

interface Culqi3DSNamespace {
  publicKey: string
  settings?: {
    charge: { totalAmount: number; returnUrl: string; currency?: string }
    card: { email: string }
  }
  options?: {
    showModal?: boolean
    showLoading?: boolean
    showIcon?: boolean
    closeModalAction?: () => void
    style?: { btnColor?: string; btnTextColor?: string }
  }
  generateDevice: () => Promise<string | undefined>
  initAuthentication: (tokenId: string) => Promise<void>
  reset?: () => void
}

declare global {
  interface Window {
    CulqiCheckout?: new (publicKey: string, config: Record<string, unknown>) => CulqiCheckoutInstance
    Culqi3DS?: Culqi3DSNamespace
  }
}

const PRIMARY = '#00b2a6'

function loadScript(id: string, src: string, ready: () => boolean): Promise<void> {
  if (ready()) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null
    const script = existing || document.createElement('script')
    script.addEventListener('load', () => (ready() ? resolve() : reject(new Error(`${src} no expuso su API`))), { once: true })
    script.addEventListener('error', () => reject(new Error(`No se pudo cargar ${src}`)), { once: true })
    if (!existing) {
      script.id = id
      script.src = src
      script.async = true
      document.body.appendChild(script)
    }
  })
}

// NO usar 'culqi-3ds' como id: la librería monta su app en un div con ese id y
// se salta el montaje si ya existe un elemento con él (ver storefront).
const load3DS = () => loadScript('culqi-3ds-sdk', 'https://3ds.culqi.com', () => !!window.Culqi3DS)
const loadCheckout = () => loadScript('culqi-checkout-custom', 'https://js.culqi.com/checkout-js', () => !!window.CulqiCheckout)

/** Nunca lanza: sin huella el cargo se intenta igual. */
export async function prepare3DS(publicKey: string): Promise<string | null> {
  try {
    const timeout = new Promise<null>(resolve => setTimeout(() => resolve(null), 5000))
    return await Promise.race([
      (async () => {
        await load3DS()
        window.Culqi3DS!.publicKey = publicKey
        return (await window.Culqi3DS!.generateDevice()) || null
      })(),
      timeout,
    ])
  } catch {
    return null
  }
}

/** `email` es el que el cliente escribió en el modal (va dentro del token). */
export type CheckoutResult = { ok: true; token: string; email: string } | { ok: false; message: string }

export async function openCardCheckout(params: {
  publicKey: string
  title: string
  amount: number
  currency: string
  /** Vacío: el cliente lo escribe en el modal (no exponemos el correo del link). */
  email?: string
}): Promise<CheckoutResult> {
  await loadCheckout()

  const config = {
    settings: {
      title: params.title.slice(0, 80) || 'Pago miTienda',
      currency: params.currency,
      amount: Math.round(params.amount * 100),
    },
    client: params.email ? { email: params.email } : {},
    options: {
      lang: 'auto',
      // El backend no manda `installments`: ofrecer cuotas cobraría en una sola.
      installments: false,
      modal: true,
      // Las seis llaves de Culqi: con una desconocida el modal no abre.
      paymentMethods: { tarjeta: true, yape: false, bancaMovil: false, agente: false, billetera: false, cuotealo: false },
      paymentMethodsSort: ['tarjeta'],
    },
    appearance: {
      theme: 'default',
      hiddenCulqiLogo: false,
      hiddenBannerContent: false,
      hiddenBanner: false,
      hiddenToolBarAmount: false,
      hiddenEmail: false,
      menuType: 'sidebar',
      buttonCardPayText: 'Pagar',
      logo: null,
      defaultStyle: {
        bannerColor: PRIMARY,
        buttonBackground: PRIMARY,
        menuColor: '#4b5563',
        linksColor: PRIMARY,
        buttonTextColor: '#ffffff',
        priceColor: '#111827',
      },
    },
  }

  return new Promise((resolve) => {
    let settled = false
    let lastError: CulqiError | null = null
    const instance = new window.CulqiCheckout!(params.publicKey, config)
    const finish = (r: CheckoutResult, close = true) => {
      if (settled) return
      settled = true
      resolve(r)
      if (close) {
        try { instance.close() } catch { /* ya cerrado */ }
      }
    }

    instance.culqi = () => {
      if (instance.token) {
        finish({ ok: true, token: instance.token.id, email: String(instance.token.email || params.email || '') })
      } else if (instance.error) {
        // Checkout Custom muestra el error dentro del modal y deja corregir.
        lastError = instance.error
      }
    }
    instance.closeCheckout = () => finish({ ok: false, message: lastError?.user_message || '' }, false)
    instance.open()
  })
}

export type ThreeDSResult =
  | { ok: true; parameters: Record<string, unknown> }
  | { ok: false; message: string }

export async function authenticate3DS(params: {
  publicKey: string
  token: string
  amountCents: number
  currency: string
  email: string
}): Promise<ThreeDSResult> {
  try {
    await load3DS()
  } catch {
    return { ok: false, message: 'No pudimos abrir la verificación de tu banco. Intenta nuevamente.' }
  }

  const lib = window.Culqi3DS!
  lib.publicKey = params.publicKey

  return new Promise((resolve) => {
    let settled = false
    const finish = (r: ThreeDSResult) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      window.removeEventListener('message', onMessage, false)
      resolve(r)
    }
    const timer = setTimeout(
      () => finish({ ok: false, message: 'La verificación de tu banco tardó demasiado. Intenta nuevamente.' }),
      10 * 60 * 1000,
    )
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      const data = event.data as { parameters3DS?: Record<string, unknown>; error?: string } | null
      if (!data || typeof data !== 'object') return
      if (data.parameters3DS) finish({ ok: true, parameters: data.parameters3DS })
      else if (data.error) finish({ ok: false, message: String(data.error) })
    }
    window.addEventListener('message', onMessage, false)

    lib.settings = {
      charge: { totalAmount: params.amountCents, returnUrl: window.location.href, currency: params.currency },
      card: { email: params.email },
    }
    lib.options = {
      showModal: true,
      showLoading: true,
      showIcon: true,
      closeModalAction: () => finish({ ok: false, message: 'Cerraste la verificación de tu banco. El pago no se realizó.' }),
      style: { btnColor: PRIMARY, btnTextColor: '#FFFFFF' },
    }

    lib.initAuthentication(params.token).catch(() =>
      finish({ ok: false, message: 'No pudimos verificar tu tarjeta con tu banco. Intenta nuevamente.' }),
    )
  })
}
