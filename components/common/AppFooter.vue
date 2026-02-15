<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="navbar-brand">
        <img src="/img/logo-mitienda_fondo-pizarra.svg" alt="MiTienda" />
      </div>

      <div class="footer-nav">
        <a href="https://mitienda.tawk.help/">Centro de ayuda</a>
        <NuxtLink to="/terminos-y-condiciones">Términos y Condiciones</NuxtLink>
        <NuxtLink to="/politicas-de-privacidad">Política de Privacidad</NuxtLink>
        <NuxtLink to="/politica-de-cookies">Política de Cookies</NuxtLink>
        <a href="https://mitienda.statuspage.io/">Status</a>
        <a href="https://app.swaggerhub.com/apis-docs/MiTienda.pe/MiTienda.pe/1.0#/">API Docs</a>
        <a href="https://mitienda.pse.pe/login">Facturación electrónica</a>
      </div>

      <div class="social-links">
        <a href="https://www.facebook.com/mitiendapuntope" aria-label="Facebook">
          <div class="svg-icon baseline">
            <svg role="img" title="Facebook">
              <use xlink:href="/img/social-icons.svg#facebook"></use>
            </svg>
          </div>
        </a>
        <a href="https://x.com/mitiendapuntope" aria-label="X Twitter">
          <div class="svg-icon baseline">
            <svg role="img" title="X Twitter">
              <use xlink:href="/img/social-icons.svg#x-twitter"></use>
            </svg>
          </div>
        </a>
        <a href="https://instagram.com/mitiendapuntope" aria-label="Instagram">
          <div class="svg-icon baseline">
            <svg role="img" title="Instagram">
              <use xlink:href="/img/social-icons.svg#instagram"></use>
            </svg>
          </div>
        </a>
        <a href="https://www.linkedin.com/company/28980026/" aria-label="LinkedIn">
          <div class="svg-icon baseline">
            <svg role="img" title="LinkedIn">
              <use xlink:href="/img/social-icons.svg#linkedin"></use>
            </svg>
          </div>
        </a>
        <a href="https://youtube.com/mitienda" aria-label="YouTube">
          <div class="svg-icon baseline">
            <svg role="img" title="YouTube">
              <use xlink:href="/img/social-icons.svg#youtube"></use>
            </svg>
          </div>
        </a>
        <a href="https://tiktok.com/@mitiendapuntope" aria-label="TikTok">
          <div class="svg-icon baseline">
            <svg role="img" title="TikTok">
              <use xlink:href="/img/social-icons.svg#tiktok"></use>
            </svg>
          </div>
        </a>
      </div>

      <div class="copyright">
        &copy; {{ new Date().getFullYear() }} MiTienda. Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>
