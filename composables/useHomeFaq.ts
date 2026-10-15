import { PLAN_ORDER } from '~/config/countries'
import type { ComparisonFeature, PlanLevel } from '~/config/countries'

export interface FaqLink {
  href: string
  label: string
}

export interface FaqItem {
  q: string
  a: string
  links?: FaqLink[]
}

/** Agenda de demos de 15 minutos (ver 22-agendar-demo.md del centro de ayuda). */
const DEMO_URL = 'https://tidycal.com/mitienda/reunion-de-15-minutos'

/** "A, B y C" */
function joinList(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`
}

/**
 * Preguntas frecuentes de la home, armadas a partir de las dudas más repetidas
 * en el chat de ventas/soporte. Todo dato de precio, cuota, pasarela, courier o
 * plan sale de `config/countries.ts` para que cada país muestre lo suyo; si una
 * función no existe en el país, la pregunta no se muestra.
 */
export function useHomeFaq() {
  const { country, brandName, isPeru, formatPrice, formatQuota, comparisonMatrix } = useCountry()

  const allFeatures = computed<ComparisonFeature[]>(() =>
    comparisonMatrix.value.flatMap(cat => cat.features)
  )

  function feature(key: string): ComparisonFeature | undefined {
    return allFeatures.value.find(f => f.key === key)
  }

  /** Primer plan (en orden Micro → Large) en que la función está incluida. */
  function firstPlanWith(features: ComparisonFeature[]): PlanLevel | undefined {
    return PLAN_ORDER.find(level => features.some(f => Boolean(f.values[level])))
  }

  function helpLink(path: string, label: string): FaqLink {
    return { href: `${country.value.helpUrl}${path}`, label }
  }

  const items = computed<FaqItem[]>(() => {
    const plans = country.value.plans
    const brand = brandName.value
    const tax = isPeru.value ? ` + ${country.value.taxName}` : ''
    const cheapest = plans[0]!
    const priciest = plans[plans.length - 1]!

    const list: FaqItem[] = []

    // 1. Marketplace vs. tienda propia
    list.push({
      q: `¿${brand} vende mis productos o me trae clientes?`,
      a: `No. ${brand} no es un marketplace: es la plataforma para crear tu propia tienda online, con tu marca, tus productos y tus precios. Tú cargas tu catálogo y compartes tu tienda en redes sociales, WhatsApp o Google para atraer a tus clientes.`,
    })

    // 2. Qué pasa al terminar la prueba
    list.push({
      q: '¿Cuánto pago cuando terminan los 14 días de prueba?',
      a: `Eliges un plan con pago mensual o anual (el anual tiene 20% de descuento): desde ${formatPrice(cheapest.monthly)}${tax} al mes en el plan ${cheapest.name} hasta ${formatPrice(priciest.monthly)}${tax} en ${priciest.name}. Además, cada plan cobra una comisión (de ${priciest.commission} a ${cheapest.commission}) solo sobre las ventas que superen un monto mensual. Si no activas tu suscripción, la tienda queda en pausa y tus productos y configuración se guardan.`,
      links: [{ href: '/planes', label: 'Comparar planes' }],
    })

    // 2b. Cómo se paga la suscripción (medios por país; Yape y comprobante solo en Perú)
    const sub = country.value.subscriptionPayment
    list.push({
      q: '¿Cómo pago la suscripción?',
      a: `Puedes pagarla con ${joinList(sub.methods)}. Si eliges el pago mensual, te recomendamos el cobro automático con tarjeta: tu plan se renueva solo cada mes, sin que tengas que acordarte. Si eliges el pago anual, lo recomendado es la transferencia bancaria.`
        + (sub.receipt ? ` Por cada pago te emitimos ${sub.receipt} electrónica, según el documento que nos indiques.` : ''),
      links: [helpLink('23-cuenta/01-pagar-y-renovar#medios-de-pago', 'Cómo pagar o renovar tu plan')],
    })

    // 3. Tarjeta para la prueba
    list.push({
      q: '¿Necesito tarjeta de crédito para la prueba gratis?',
      a: 'No. Para crear tu tienda solo te pedimos tus datos y los de tu negocio, y verificar tu correo y tu WhatsApp. No registras ninguna tarjeta ni medio de pago.',
    })

    // 4. Cancelación
    list.push({
      q: '¿Puedo cancelar cuando quiera?',
      a: 'Sí. No hay contrato de permanencia: puedes cancelar tu suscripción cuando quieras y tu tienda sigue activa hasta el final del período que ya pagaste. También puedes cambiar de plan en cualquier momento.',
    })

    // 6. Cuotas de productos
    const quotas = plans.map((p, i) => {
      const value = formatQuota(p.quotas.maxProducts)
      if (p.quotas.maxProducts === 0) return `${value.toLowerCase()}s en ${p.name}`
      return i === 0 ? `hasta ${value} productos en ${p.name}` : `${value} en ${p.name}`
    })
    const variants = feature('variantes')
    const variantsPlan = variants ? firstPlanWith([variants]) : undefined
    list.push({
      q: '¿Cuántos productos puedo subir?',
      a: `Depende del plan: ${joinList(quotas)}.`
        + (variantsPlan ? ` Las variantes (talla, color, etc.) están disponibles desde el plan ${variantsPlan}.` : ''),
      links: [{ href: '/planes', label: 'Ver qué incluye cada plan' }],
    })

    // 7. Medios de pago del comprador
    const manual: string[] = []
    if (feature('transferencia')) manual.push('transferencia o depósito bancario')
    if (feature('pago-contraentrega')) manual.push('pago contra entrega')
    list.push({
      q: '¿Qué medios de pago pueden usar mis clientes?',
      a: `En ${country.value.name} puedes cobrar en línea con ${joinList(country.value.paymentGateways)}`
        + (manual.length ? `, además de ${joinList(manual)}` : '')
        + '. Todas las pasarelas están disponibles en todos los planes, y cada una cobra su propia comisión por transacción.',
      links: [helpLink('21-pasarelas-pago-vendedor', 'Pasarelas por país')],
    })

    // 8. Envíos
    const couriers = country.value.extraFeatures
      .flatMap(cat => cat.features)
      .filter(f => f.key.startsWith('courier-'))
    const couriersPlan = firstPlanWith(couriers)
    // Solo unos pocos de ejemplo: la lista completa vive en /planes.
    const courierExamples = couriers.slice(0, 4).map(c => c.label)
    list.push({
      q: '¿Ustedes hacen los envíos?',
      a: 'No, el despacho lo haces tú o tu courier. Defines tus tarifas de envío por zona y puedes ofrecer recojo en tienda'
        + (couriers.length && couriersPlan
          ? `; desde el plan ${couriersPlan} también puedes conectar couriers integrados como ${joinList(courierExamples)}.`
          : '.'),
      links: [helpLink('10-envios', 'Cómo configurar los envíos')],
    })

    // 9. Dominio propio
    const domain = feature('dominio-propio')
    const domainPlan = domain ? firstPlanWith([domain]) : undefined
    if (domainPlan) {
      list.push({
        q: '¿Puedo usar mi propio dominio?',
        a: `Sí, desde el plan ${domainPlan}. Compras el dominio en cualquier registrador y lo conectas desde tu panel; el certificado SSL (https) se activa solo y sin costo. Mientras tanto, tu tienda funciona con un subdominio gratuito.`,
        links: [helpLink('12-configuracion/04-dominio', 'Cómo conectar tu dominio')],
      })
    }

    // 10. Facturación electrónica (solo donde la plataforma la ofrece)
    if (country.value.hasBillingElectronica) {
      const bizlinks = feature('invoice-bizlinks')
      const nubefact = feature('invoice-nubefact')
      const datil = feature('invoice-datil')
      const bizlinksPlan = bizlinks ? firstPlanWith([bizlinks]) : undefined
      const nubefactPlan = nubefact ? firstPlanWith([nubefact]) : undefined
      const datilPlan = datil ? firstPlanWith([datil]) : undefined
      if (datilPlan) {
        // Ecuador: comprobantes electrónicos autorizados por el SRI vía Dátil.
        list.push({
          q: '¿Puedo emitir facturas electrónicas?',
          a: `Sí, desde el plan ${datilPlan}: emites tus facturas electrónicas autorizadas por el SRI conectando tu cuenta de Dátil desde el panel.`,
        })
      } else if (bizlinksPlan || nubefactPlan) {
        const parts: string[] = []
        if (bizlinksPlan) {
          // La celda de la matriz trae el tope mensual como "100/mes".
          const docs = String(bizlinks!.values[bizlinksPlan]).match(/\d+/)?.[0]
          const limit = docs ? ` (hasta ${docs} documentos al mes)` : ''
          parts.push(`Sí, desde el plan ${bizlinksPlan}: la facturación electrónica con Bizlinks viene incluida en el plan para emitir boletas y facturas${limit}.`)
        }
        if (nubefactPlan) {
          parts.push(bizlinksPlan
            ? 'Si ya tienes una cuenta en Nubefact, también puedes conectarla.'
            : `Sí, desde el plan ${nubefactPlan} puedes emitir boletas y facturas electrónicas con Nubefact.`)
        }
        list.push({
          q: '¿Puedo emitir boletas y facturas electrónicas?',
          a: parts.join(' '),
        })
      }
    }

    // 11. Pedidos por WhatsApp
    list.push({
      q: '¿Puedo recibir pedidos por WhatsApp?',
      a: 'Sí. Puedes activar el botón «Pedir por WhatsApp» en la ficha de cada producto: abre un chat contigo con el nombre, el código y el precio del producto ya escritos. El carrito sigue disponible para los clientes que prefieran pagar en línea.',
    })

    // 12. Ayuda para armar la tienda
    const custom = feature('whitelabel')
    list.push({
      q: '¿Me ayudan a armar mi tienda?',
      a: 'Sí. En nuestro centro de ayuda tienes guías paso a paso, te atendemos por chat, correo y WhatsApp, y puedes agendar una demo gratuita de 15 minutos con nuestro equipo.'
        + (custom ? ' Si quieres un diseño 100% a medida, lo cotizamos aparte.' : ''),
      links: [
        { href: country.value.helpUrl, label: 'Ir al centro de ayuda' },
        { href: DEMO_URL, label: 'Agendar una demo' },
      ],
    })

    return list
  })

  return { items }
}
