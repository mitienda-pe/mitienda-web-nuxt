<script setup lang="ts">
const { country, brandName, formatPrice, getAnnualPrice, isPeru } = useCountry()

useSeoMeta({
  title: () => `${brandName.value} - Crea tu tienda virtual`,
  ogTitle: () => `${brandName.value} - Crea tu tienda virtual`,
  description: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.',
  ogDescription: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.',
})

const isAnnual = ref(true)

function getPrice(monthly: number): string {
  if (isAnnual.value) {
    return formatPrice(getAnnualPrice(monthly))
  }
  return formatPrice(monthly)
}

function getPeriod(): string {
  return isAnnual.value ? 'por año' : 'por mes'
}

const paymentGatewaysText = computed(() => {
  const gateways = country.value.paymentGateways
  if (gateways.length <= 2) {
    return gateways.join(' y ')
  }
  return gateways.slice(0, -1).join(', ') + ', etc.'
})

const paymentMethodsDescription = computed(() => {
  if (isPeru.value) {
    return `Estamos integrados con mas de 10 pasarelas de pago y puedes usar la de tu preferencia: Mercadopago, Openpay, Culqi, Niubiz, Izipay, etc. Incluso te pueden pagar con Yape, Plin o en cuotas sin intereses.`
  }
  return `Estamos integrados con las principales pasarelas de pago: ${paymentGatewaysText.value}. Acepta tarjetas de crédito, débito y transferencias bancarias.`
})

onMounted(() => {
  const senjaScript = document.createElement('script')
  senjaScript.src = 'https://static.senja.io/dist/platform.js'
  senjaScript.async = true
  document.body.appendChild(senjaScript)

  const trustScript = document.createElement('script')
  trustScript.src = 'https://widget.senja.io/widget/467ea9c6-a179-418d-9f02-088b8721776d/platform.js'
  trustScript.async = true
  document.body.appendChild(trustScript)

  const liteYoutubeScript = document.createElement('script')
  liteYoutubeScript.src = 'https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js'
  liteYoutubeScript.type = 'module'
  document.body.appendChild(liteYoutubeScript)
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1>
                Crea tu propia tienda virtual y empieza a vender por internet
                ya!
              </h1>
              <p class="hero-subtitle">
                {{ brandName }} es la plataforma de comercio electrónico que te permite
                crear y gestionar tu propia tienda virtual de manera más fácil,
                rápida y económica.
              </p>
              <div class="hero-cta">
                <a href="#cta" class="btn btn-primary btn-lg me-3">Empezar a Vender</a>
                <a href="#features" class="btn btn-outline btn-lg">Ver Características</a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mx-auto">
            <ClientOnly>
              <lite-youtube videoid="M-lZPhA8kuw">
                <a class="lite-youtube-fallback" href="https://www.youtube.com/watch?v=M-lZPhA8kuw">
                  Ver en YouTube
                </a>
              </lite-youtube>
            </ClientOnly>
          </div>
        </div>

        <div class="trust-indicators">
          <p class="trust-text">
            Más de 2,000 emprendedores confían en {{ brandName }}
          </p>

          <div class="row justify-content-center">
            <div class="col-auto text-center">
              <div class="d-inline-block mx-auto">
                <ClientOnly>
                  <div class="senja-embed" data-id="467ea9c6-a179-418d-9f02-088b8721776d" data-mode="shadow"
                    data-lazyload="false" style="display: block"></div>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <div class="container">
        <h2 class="section-title">Todo lo que necesitas para vende en línea</h2>
        <p class="section-subtitle">
          Herramientas poderosas y fáciles de usar para hacer crear tu negocio.
        </p>

        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-icon">🎨</div>
              <h3>Es muy fácil, rápido y económico</h3>
              <p>
                No necesitas saber de diseño o programación para crear tu tienda virtual. La
                implementación es instantánea y no requiere de una gran
                inversión. Subes la imagen de tu producto, pones el precio y
                listo. Puedes probar gratis por 14 días. Personaliza tu tienda utilizando tu propio dominio, logo y
                colores. Crea promociones y cupones de descuento. Ahorra en diseño,
                hosting y mantenimiento.
              </p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card">
              <img src="/img/pasarelas-de-pago.webp" alt="Pasarelas de pago" class="img-fluid mx-auto mb-4" />
              <h3>Te pagan como quieras</h3>
              <p>{{ paymentMethodsDescription }}</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card">
              <video autoplay loop muted playsinline class="card-video mb-4">
                <source src="/mp4/inteligencia-artificial-comprimido-2.mp4" type="video/mp4">
              </video>
              <h3>Con el poder de la Inteligencia Artificial</h3>
              <p>
                Mejora la descripción de tus productos, crea descripciones atractivas que venden más y optimizadas para
                SEO con nuestro generador de descripciones impulsado por IA.
              </p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card">
              <img src="/img/estadisticas.webp" alt="Estadísticas" class="img-fluid mx-auto mb-4" />
              <h3>Los datos que necesitas</h3>
              <p>
                En {{ brandName }} encontrarás Reporte de Ventas, Ventas por Producto, Reporte de Clientes, Recuperación de
                Carritos Abandonados. Tambien puedes instalar Google Analytics y Facebook Pixel.
              </p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card">
              <img src="/img/app-banner.webp" alt="Aplicación móvil" class="img-fluid mx-auto mb-4" />
              <h3>En la palma de tu mano</h3>
              <p>
                {{ brandName }} cuenta con una app móvil para que puedas gestionar tu tienda desde cualquier lugar. Recibe
                notificaciones de nuevos pedidos, gestiona inventarios y actualiza precios sobre la marcha.
              </p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card">
              <img src="/img/pos-banner.webp" alt="Aplicación POS" class="img-fluid mx-auto mb-4" />
              <h3>Punto de Venta y Facturación Electrónica (Beta)</h3>
              <p>Con {{ brandName }} ahora también puedes vender de manera presencial. Registra ventas al instante, acepta
                pagos diferentes formas de pago, emite e imprime comprobantes sin complicaciones.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="pricing">
      <div class="container">
        <h2 class="section-title">Planes que se adaptan a tu negocio</h2>
        <p class="section-subtitle">
          Empieza gratis y escala según crezca tu negocio. Sin contratos,
          cancela cuando quieras.
        </p>

        <div class="d-flex justify-content-center align-items-center gap-3 mb-5">
          <span class="text-muted">Mensual</span>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="billingToggle" v-model="isAnnual" />
            <label class="form-check-label" for="billingToggle">
              Anual <span class="badge ms-1">Ahorra 20%</span>
            </label>
          </div>
        </div>

        <div class="row g-4 justify-content-center">
          <div v-for="plan in country.plans" :key="plan.name" class="col-lg-3 col-md-6">
            <div class="pricing-card" :class="{ featured: plan.featured }" :data-monthly="plan.monthly">
              <h3>{{ plan.name }}</h3>
              <div class="price">{{ getPrice(plan.monthly) }}</div>
              <div class="price-period">{{ getPeriod() }}</div>
              <div class="commission-info">
                {{ plan.commission }} de comisión<br />
                en ventas superiores a <span class="text-nowrap">{{ plan.threshold }}</span> al mes
              </div>
              <ul class="features-list">
                <li v-for="feature in plan.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
              <a href="#cta" class="btn w-100" :class="plan.featured ? 'btn-primary' : 'btn-outline'">
                Empezar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section id="testimonials" class="features">
      <div class="container">
        <div class="row">
          <div class="col">
            <h2 class="section-title">Testimonios</h2>
            <p class="text-center lead">
              Tenemos el mejor equipo de soporte y nuestros clientes están de
              acuerdo. Esto es lo que nuestros clientes dicen de nosotros:
            </p>
            <ClientOnly>
              <div class="senja-embed" data-id="46615bb9-0514-4270-aa00-2e6c11c0beef" data-lazyload="false"></div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="cta-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-xl-6 text-center">
            <h2>¿Listo para empezar a vender?</h2>
            <p>
              Únete a miles de emprendedores que ya están vendiendo con
              {{ brandName }}.<br />
              Prueba gratis por 14 días, sin tarjeta de crédito.
            </p>

            <div class="mt-4">
              <NuxtLink to="/prueba-gratis" class="btn btn-white btn-lg">
                Crear mi tienda gratis
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
lite-youtube {
  background-color: #000;
  position: relative;
  display: block;
  contain: content;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  max-width: 100%;
  border-radius: var(--rounded-lg);
  overflow: hidden;
}

lite-youtube::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQynLYZ5Q/AoAgABuV8MZBNJJsDq0GaGQpDGQFrxUCu4z4fxkPGRYKj4+cHPfp8K7p+4B5kd0WpyAAAAAbsJAQAADglmAAMIQmAPgAAAA4QCAAAAABAAAAABRJREFUGV/z7hwPMAAAAMBJ0gAAAAAAAAAAAANAnAAAAABmJLVnAAAAAElFTkSuQmCC);
  background-position: top;
  background-repeat: repeat-x;
  height: 60px;
  padding-bottom: 50px;
  width: 100%;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.commission-info {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}
</style>
