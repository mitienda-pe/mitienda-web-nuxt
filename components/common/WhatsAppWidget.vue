<script setup lang="ts">
const whatsappNumber = '51992640275'
const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappNumber}`
</script>

<template>
  <a
    :href="whatsappUrl"
    class="whatsapp whatsapp-chat"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
  >
    <div class="svg-icon">
      <img
        src="/img/sim-wsp.svg"
        width="65"
        height="45"
        alt="WhatsApp"
        style="max-width: 25px"
      />
    </div>
  </a>
</template>
