<script setup lang="ts">
const { isPeru } = useCountry()
</script>

<template>
  <div id="app">
    <CommonAppHeader />
    <main>
      <slot />
    </main>
    <CommonAppFooter />
    <CommonLibroReclamacionesLink v-if="isPeru" />
    <!-- <CommonWhatsAppWidget /> -->
  </div>
</template>
