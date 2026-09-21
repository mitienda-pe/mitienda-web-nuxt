<script setup lang="ts">
import * as CookieConsent from 'vanilla-cookieconsent'

const { country, brandName } = useCountry()
const site = computed(() => `https://${country.value.landingDomain}`)

useSeoMeta({
  title: () => `Política de Cookies - ${brandName.value}`,
  description: () => `Política de cookies de ${brandName.value}`,
})

function openPreferences() {
  CookieConsent.showPreferences()
}
</script>

<template>
  <div class="politica-cookies">
    <div class="container texto_terminos py-5">
      <div class="row">
        <div class="col-md-12">
          <h2>Política de Cookies / {{ brandName }}</h2>
          <p>Última actualización: <time datetime="2026-09-21">21 de septiembre de 2026</time></p>
          <p>Esta Política de Cookies explica qué <em>cookies</em> y tecnologías similares utiliza el sitio web
            <a :href="site">{{ site }}</a>, operado por Tiendas Virtuales Latinoamérica SAC, para qué las usamos y
            cómo puede gestionarlas. Complementa nuestra
            <NuxtLink to="/politicas-de-privacidad">Política de Privacidad</NuxtLink>.</p>

          <h3>Qué son las <em>cookies</em></h3>
          <p>Las <em>cookies</em> son pequeños archivos que un sitio web guarda en su navegador cuando lo visita. Sirven
            para que el sitio funcione, recuerde sus preferencias y nos permita entender cómo se usa. Usamos también
            el almacenamiento local del navegador (<em>localStorage</em>), que cumple una función similar; en esta
            Política nos referimos a ambos como "<em>cookies</em>".</p>

          <h3>Qué <em>cookies</em> utilizamos</h3>

          <h4>Estrictamente necesarias</h4>
          <p>Son imprescindibles para el funcionamiento del sitio y no requieren su consentimiento. No se pueden
            desactivar desde el panel de preferencias.</p>
          <div class="table-responsive">
            <table>
              <thead>
                <tr><th>Nombre</th><th>Proveedor</th><th>Finalidad</th><th>Duración</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>cc_cookie</code></td>
                  <td>{{ brandName }}</td>
                  <td>Guarda sus preferencias de <em>cookies</em>.</td>
                  <td>6 meses</td>
                </tr>
                <tr>
                  <td><code>mitienda-chat-history</code> (<em>localStorage</em>)</td>
                  <td>{{ brandName }}</td>
                  <td>Conserva el historial de su conversación con el chat de soporte mientras navega por el
                    sitio.</td>
                  <td>Hasta que cierre la conversación o borre los datos del navegador</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4>Analíticas</h4>
          <p>Nos permiten medir cuántas personas visitan el sitio, qué páginas consultan y cómo llegan a él, para
            mejorar su contenido. Solo se activan si usted las acepta.</p>
          <div class="table-responsive">
            <table>
              <thead>
                <tr><th>Nombre</th><th>Proveedor</th><th>Finalidad</th><th>Duración</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>_ga</code></td>
                  <td>Google Analytics</td>
                  <td>Distingue a los visitantes de forma anónima.</td>
                  <td>2 años</td>
                </tr>
                <tr>
                  <td><code>_ga_*</code></td>
                  <td>Google Analytics</td>
                  <td>Mantiene el estado de la sesión de navegación.</td>
                  <td>2 años</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Configuramos Google Analytics con la anonimización de la dirección IP. Más información en la página
            oficial de <a href="https://support.google.com/analytics/answer/11397207?hl=es" target="_blank"
              rel="noopener nofollow">Google Analytics</a>.</p>

          <template v-if="country.fbPixelId">
            <h4>De marketing</h4>
            <p>Nos permiten medir la eficacia de nuestras campañas publicitarias y mostrarle anuncios de
              {{ brandName }} en otras plataformas. Solo se activan si usted las acepta.</p>
            <div class="table-responsive">
              <table>
                <thead>
                  <tr><th>Nombre</th><th>Proveedor</th><th>Finalidad</th><th>Duración</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>_fbp</code></td>
                    <td>Meta (Facebook)</td>
                    <td>Mide las conversiones de nuestros anuncios y permite mostrarle anuncios relevantes.</td>
                    <td>3 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Más información en la <a href="https://www.facebook.com/privacy/policies/cookies/" target="_blank"
                rel="noopener nofollow">Política de Cookies de Meta</a>.</p>
          </template>

          <h3>Cómo gestionar sus preferencias</h3>
          <p>La primera vez que visita el sitio le mostramos un aviso para que acepte, rechace o configure las
            <em>cookies</em> que no son estrictamente necesarias. Puede cambiar su decisión en cualquier momento
            desde el <a href="#" @click.prevent="openPreferences">panel de preferencias de <em>cookies</em></a>.</p>
          <p>También puede bloquear o eliminar las <em>cookies</em> desde la configuración de su navegador (consulte
            la ayuda de su navegador para saber cómo hacerlo). Si bloquea las <em>cookies</em> estrictamente
            necesarias, algunas partes del sitio podrían no funcionar correctamente.</p>

          <h3>Enlaces a servicios de terceros</h3>
          <p>El sitio incluye enlaces a WhatsApp y a nuestras redes sociales. Al usarlos, usted abandona nuestro
            sitio y esos servicios pueden instalar sus propias <em>cookies</em>, que se rigen por sus respectivas
            políticas de privacidad.</p>

          <h3>Tiendas virtuales de nuestros clientes</h3>
          <p>Esta Política aplica solo a este sitio web. Las tiendas virtuales creadas con {{ brandName }} son
            operadas por cada comercio, que es responsable de informar sobre las <em>cookies</em> que utiliza su
            tienda.</p>

          <h3>Más información</h3>
          <p>Si tiene alguna consulta sobre esta Política, puede escribirnos a
            <a href="mailto:soporte@mitienda.pe">soporte@mitienda.pe</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.texto_terminos {
  padding-top: 100px;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
}

.texto_terminos h2 {
  color: var(--primary-color);
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.texto_terminos h3 {
  color: var(--text-dark);
  font-weight: 700;
  font-size: 1.3rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.texto_terminos h4 {
  color: var(--text-dark);
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}

.texto_terminos p {
  text-align: justify;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.texto_terminos em {
  font-style: italic;
}

.texto_terminos .table-responsive {
  overflow-x: auto;
  margin-bottom: 1rem;
}

.texto_terminos table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.texto_terminos th,
.texto_terminos td {
  border: 1px solid #e5e7eb;
  padding: 0.5rem 0.75rem;
  text-align: left;
  vertical-align: top;
}

.texto_terminos th {
  font-weight: 700;
  background: #f9fafb;
}

.texto_terminos a {
  color: var(--primary-color);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.texto_terminos a:hover {
  color: var(--primary-hover);
}
</style>
