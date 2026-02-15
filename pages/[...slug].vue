<script setup lang="ts">
useSeoMeta({
  title: 'Página no encontrada - miTienda',
})
</script>

<template>
  <div class="not-found">
    <section class="hero" style="min-height: 60vh;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center">
            <div class="mb-4">
              <span style="font-size: 6rem;">404</span>
            </div>
            <h1>Página no encontrada</h1>
            <p class="hero-subtitle">La página que buscas no existe o ha sido movida.</p>
            <NuxtLink to="/" class="btn btn-primary btn-lg">
              Volver al inicio
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
