<script setup lang="ts">
const { country, isPeru } = useCountry()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="navbar-brand">
        <img :src="country.logoDark" :alt="country.brandName" />
      </div>

      <div class="footer-nav">
        <a :href="country.helpUrl">Centro de ayuda</a>
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

      <div class="copyright">
        &copy; {{ new Date().getFullYear() }} {{ country.brandName }}. Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>
