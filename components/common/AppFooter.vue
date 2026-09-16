<script setup lang="ts">
import { COUNTRY_CONFIGS } from '~/config/countries'

const { country, isPeru } = useCountry()

const countrySites = Object.values(COUNTRY_CONFIGS)
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="navbar-brand">
        <img :src="country.logoDark" :alt="country.brandName" />
      </div>

      <div class="footer-nav">
        <a v-if="isPeru" :href="country.posUrl">Punto de Venta</a>
        <a :href="country.helpUrl">Ayuda</a>
        <NuxtLink to="/terminos-y-condiciones">Términos y Condiciones</NuxtLink>
        <NuxtLink to="/politicas-de-privacidad">Política de Privacidad</NuxtLink>
        <NuxtLink to="/politica-de-cookies">Política de Cookies</NuxtLink>
        <a :href="country.statusUrl">Status</a>
        <a :href="country.apiDocsUrl">API Docs</a>
        <a v-if="isPeru" href="https://mitienda.pse.pe/login">Facturación electrónica</a>
      </div>

      <div class="social-links">
        <a v-if="country.socialMedia.facebook" :href="country.socialMedia.facebook" aria-label="Facebook">
          <div class="svg-icon baseline">
            <svg role="img" title="Facebook">
              <use xlink:href="/img/social-icons.svg#facebook"></use>
            </svg>
          </div>
        </a>
        <a v-if="country.socialMedia.twitter" :href="country.socialMedia.twitter" aria-label="X Twitter">
          <div class="svg-icon baseline">
            <svg role="img" title="X Twitter">
              <use xlink:href="/img/social-icons.svg#x-twitter"></use>
            </svg>
          </div>
        </a>
        <a v-if="country.socialMedia.instagram" :href="country.socialMedia.instagram" aria-label="Instagram">
          <div class="svg-icon baseline">
            <svg role="img" title="Instagram">
              <use xlink:href="/img/social-icons.svg#instagram"></use>
            </svg>
          </div>
        </a>
        <a v-if="country.socialMedia.linkedin" :href="country.socialMedia.linkedin" aria-label="LinkedIn">
          <div class="svg-icon baseline">
            <svg role="img" title="LinkedIn">
              <use xlink:href="/img/social-icons.svg#linkedin"></use>
            </svg>
          </div>
        </a>
        <a v-if="country.socialMedia.youtube" :href="country.socialMedia.youtube" aria-label="YouTube">
          <div class="svg-icon baseline">
            <svg role="img" title="YouTube">
              <use xlink:href="/img/social-icons.svg#youtube"></use>
            </svg>
          </div>
        </a>
        <a v-if="country.socialMedia.tiktok" :href="country.socialMedia.tiktok" aria-label="TikTok">
          <div class="svg-icon baseline">
            <svg role="img" title="TikTok">
              <use xlink:href="/img/social-icons.svg#tiktok"></use>
            </svg>
          </div>
        </a>
      </div>

      <nav class="country-links" aria-label="Sitios por país">
        <a
          v-for="site in countrySites"
          :key="site.code"
          :href="`https://${site.landingDomain}`"
          :hreflang="site.locale"
          :aria-current="site.code === country.code ? 'page' : undefined"
          :class="{ active: site.code === country.code }"
        >
          <svg class="flag" viewBox="0 0 3 2" aria-hidden="true">
            <template v-if="site.code === 'PE'">
              <rect width="3" height="2" fill="#D91023" />
              <rect x="1" width="1" height="2" fill="#fff" />
            </template>
            <template v-else>
              <rect width="3" height="1" fill="#FCD116" />
              <rect y="1" width="3" height="0.5" fill="#003893" />
              <rect y="1.5" width="3" height="0.5" fill="#CE1126" />
              <circle v-if="site.code === 'EC'" cx="1.5" cy="1" r="0.3" fill="#8B5A2B" stroke="#FCD116" stroke-width="0.06" />
            </template>
          </svg>
          <span>{{ site.name }}</span>
        </a>
      </nav>

      <div class="copyright">
        &copy; {{ new Date().getFullYear() }} {{ country.brandName }}. Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>
