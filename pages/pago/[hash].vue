<script setup lang="ts">
/**
 * Cobro de un link de pago de miTienda (los que crea el superadmin para cobrar
 * una renovación, un servicio, etc.). Reemplaza a
 * panel.mitienda.host/pagos/tarjeta/<hash> del panel legacy.
 *
 * Todo pasa en el navegador y directo contra api2: el límite de intentos del
 * cobro es por IP, y un proxy por el servidor de la landing pondría a todos los
 * clientes detrás de la misma.
 */
import { authenticate3DS, openCardCheckout, prepare3DS } from '~/utils/culqiPay'

useSeoMeta({
  title: 'Pago - miTienda',
  robots: 'noindex, nofollow',
})

const API = 'https://api2.mitienda.pe/api/v1/platform-pay'

interface PayLink {
  concept: string
  amount: number
  currency: string
  first_name: string
  email_hint: string
  paid: boolean
  created_at: string
  public_key: string
}

type ChargeResponse = {
  error: number
  status: 'paid' | 'already_paid' | 'needs_3ds' | 'declined' | 'busy' | 'not_found' | 'error'
  message: string
  charge_id?: string
}

const route = useRoute()
const hash = computed(() => String(route.params.hash || ''))

const link = ref<PayLink | null>(null)
const loading = ref(true)
const notFound = ref(false)
const paying = ref(false)
const paidNow = ref(false)
const chargeId = ref('')
const errorMessage = ref('')

const amountText = computed(() => {
  if (!link.value) return ''
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: link.value.currency }).format(link.value.amount)
})

onMounted(async () => {
  try {
    const res = await $fetch<{ error: number; data: PayLink }>(`${API}/${hash.value}`)
    link.value = res.data
  } catch (e: any) {
    if (e?.statusCode === 404 || e?.status === 404) notFound.value = true
    else errorMessage.value = 'No pudimos cargar el link de pago. Recarga la página en unos minutos.'
  } finally {
    loading.value = false
  }
})

async function postCharge(body: Record<string, unknown>): Promise<ChargeResponse> {
  try {
    return await $fetch<ChargeResponse>(`${API}/${hash.value}/charge`, { method: 'POST', body })
  } catch (e: any) {
    if (e?.statusCode === 429 || e?.status === 429) {
      return { error: 1, status: 'error', message: 'Hiciste demasiados intentos. Espera un rato antes de volver a intentar.' }
    }
    return e?.data?.status ? e.data : { error: 1, status: 'error', message: 'No pudimos conectar con el servidor de pagos. Revisa tu conexión e intenta nuevamente.' }
  }
}

async function pay() {
  if (!link.value || paying.value) return
  errorMessage.value = ''
  paying.value = true

  try {
    const { public_key: publicKey, currency, amount, concept } = link.value
    const fingerprint = await prepare3DS(publicKey)

    const checkout = await openCardCheckout({ publicKey, title: concept, amount, currency })
    if (!checkout.ok) {
      if (checkout.message) errorMessage.value = checkout.message
      return
    }

    const base = { token: checkout.token, device_finger_print_id: fingerprint || '' }
    let res = await postCharge(base)

    if (res.status === 'needs_3ds') {
      const auth = await authenticate3DS({
        publicKey,
        token: checkout.token,
        amountCents: Math.round(amount * 100),
        currency,
        email: checkout.email,
      })
      if (!auth.ok) {
        errorMessage.value = auth.message
        return
      }
      res = await postCharge({ ...base, authentication_3DS: auth.parameters })
    }

    if (res.status === 'paid' || res.status === 'already_paid') {
      paidNow.value = true
      chargeId.value = res.charge_id || ''
      link.value = { ...link.value, paid: true }
      return
    }

    errorMessage.value = res.message || 'No se pudo procesar el pago. Intenta con otra tarjeta.'
  } catch {
    errorMessage.value = 'No pudimos abrir el formulario de pago. Desactiva el bloqueador de anuncios si tienes uno e intenta nuevamente.'
  } finally {
    paying.value = false
  }
}
</script>

<template>
  <div class="pago-link">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div v-if="loading" class="text-center py-5">
            <CommonLoadingSpinner />
          </div>

          <div v-else-if="notFound" class="card border-0 shadow-sm text-center">
            <div class="card-body p-5">
              <h1 class="h4 fw-bold mb-3">Este link de pago no existe</h1>
              <p class="text-muted mb-0">Revisa que lo hayas copiado completo o pide uno nuevo a quien te lo envió.</p>
            </div>
          </div>

          <div v-else-if="link" class="card border-0 shadow-sm">
            <div class="card-body p-4 p-lg-5">
              <p class="eyebrow mb-2">Pago a miTienda</p>

              <template v-if="link.paid">
                <h1 class="h3 fw-bold mb-3">{{ paidNow ? '¡Pago realizado!' : 'Este link ya fue pagado' }}</h1>
                <p class="text-muted">
                  {{ paidNow
                    ? 'Gracias. Culqi te enviará la constancia del cobro a tu correo.'
                    : 'No hay nada pendiente. Si crees que es un error, escríbenos.' }}
                </p>
                <dl class="detalle">
                  <dt>Concepto</dt><dd>{{ link.concept }}</dd>
                  <dt>Monto</dt><dd class="monto-chico">{{ amountText }}</dd>
                  <template v-if="chargeId"><dt>Operación</dt><dd class="font-monospace small">{{ chargeId }}</dd></template>
                </dl>
              </template>

              <template v-else>
                <h1 class="h3 fw-bold mb-1">Hola, {{ link.first_name }}</h1>
                <p class="text-muted mb-4">Este es el detalle del pago pendiente.</p>

                <dl class="detalle">
                  <dt>Concepto</dt><dd>{{ link.concept }}</dd>
                  <dt>Monto a pagar</dt><dd class="monto">{{ amountText }}</dd>
                  <template v-if="link.email_hint"><dt>Enviado a</dt><dd>{{ link.email_hint }}</dd></template>
                </dl>

                <CommonAlertMessage
                  v-if="errorMessage"
                  type="error"
                  :message="errorMessage"
                  class="mb-3"
                  @dismiss="errorMessage = ''"
                />

                <CommonAppButton variant="primary" size="lg" class="w-100" :loading="paying" :disabled="paying" @click="pay">
                  Pagar {{ amountText }} con tarjeta
                </CommonAppButton>

                <p class="seguro small text-muted mt-3 mb-0">
                  El pago lo procesa Culqi. miTienda no ve ni guarda los datos de tu tarjeta.
                </p>
              </template>
            </div>
          </div>

          <CommonAlertMessage v-else-if="errorMessage" type="error" :message="errorMessage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pago-link {
  background: var(--background-soft);
  min-height: 60vh;
}
.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--primary-color);
}
.detalle {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1.25rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
}
.detalle dt {
  color: var(--text-muted);
  font-weight: 500;
}
.detalle dd {
  margin: 0;
  color: var(--text-dark);
  overflow-wrap: anywhere;
}
.monto {
  font-size: 1.6rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text-dark);
}
.monto-chico {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>
