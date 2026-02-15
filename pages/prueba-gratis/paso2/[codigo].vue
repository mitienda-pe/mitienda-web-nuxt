<script setup lang="ts">
const route = useRoute()
const codigo = computed(() => route.params.codigo as string)

useSeoMeta({
  title: 'Configurar tu tienda - Paso 2 de 3',
  description: 'Configura los datos de tu tienda virtual',
})
</script>

<template>
  <div class="registro-paso2">
    <section class="registro-steps py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <RegistrationStoreConfigForm :codigo="codigo" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.registro-steps { min-height: 80vh; padding-top: 2rem; }
</style>
