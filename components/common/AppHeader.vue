<script setup lang="ts">
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="navbar navbar-expand-lg">
        <NuxtLink to="/" class="navbar-brand">
          <img src="/img/logo-mitienda.svg" alt="MiTienda" class="logo-principal" />
        </NuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <NuxtLink to="/#features" class="nav-link">Características</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/#pricing" class="nav-link">Precios</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/#testimonials" class="nav-link">Testimonios</NuxtLink>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="https://admin.mitienda.pe/" class="btn btn-outline">Iniciar Sesión</a>
            </li>
            <li class="nav-item">
              <NuxtLink to="/prueba-gratis" class="btn btn-primary">Empezar Gratis</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
