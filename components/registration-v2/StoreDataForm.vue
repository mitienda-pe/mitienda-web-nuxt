<script setup lang="ts">
import { CATEGORIES, COUNTRIES } from '~/types'

const store = useRegistrationV2Store()

const errors = ref<Record<string, string>>({})
const errorMessage = ref('')

const subdominioTocado = ref(false)
const subdominioStatus = ref<'idle' | 'checking' | 'available' | 'unavailable'>('idle')
const subdominioMensaje = ref('')

const urlPreview = computed(() => {
  const domain = store.storeData.pais === 'EC' ? 'tiendabox.ec' : 'mitienda.pe'
  return store.storeData.subdominio
    ? `${store.storeData.subdominio}.${domain}`
    : `tutienda.${domain}`
})

function generarSubdominio(nombre: string): string {
  return nombre
    .toLowerCase()
    .replace(/[áàäâã]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöôõ]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 20)
}

watch(() => store.storeData.nombre_tienda, (newValue) => {
  if (!subdominioTocado.value) {
    store.storeData.subdominio = generarSubdominio(newValue)
    if (store.storeData.subdominio.length >= 3) {
      verificarDisponibilidad(store.storeData.subdominio)
    }
  }
})

watch(() => store.storeData.subdominio, (newValue) => {
  store.storeData.subdominio = newValue.toLowerCase().replace(/[^a-z0-9-]/g, '')

  if (store.storeData.subdominio.length >= 3) {
    verificarDisponibilidad(store.storeData.subdominio)
  } else {
    subdominioStatus.value = 'idle'
    subdominioMensaje.value = ''
  }
})

let debounceTimer: ReturnType<typeof setTimeout>
async function verificarDisponibilidad(subdominio: string) {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(async () => {
    subdominioStatus.value = 'checking'
    subdominioMensaje.value = 'Verificando...'

    try {
      const result = await store.validateSubdomain(subdominio)

      if (result.disponible) {
        subdominioStatus.value = 'available'
        subdominioMensaje.value = result.mensaje || '¡Subdominio disponible!'
      } else {
        subdominioStatus.value = 'unavailable'
        subdominioMensaje.value = result.mensaje || 'Este subdominio no está disponible'
      }
    } catch {
      subdominioStatus.value = 'idle'
      subdominioMensaje.value = 'Error al verificar disponibilidad'
    }
  }, 500)
}

function validateForm(): boolean {
  errors.value = {}

  if (!store.storeData.nombre_tienda) {
    errors.value.nombre_tienda = 'El nombre de la tienda es requerido'
  }

  if (!store.storeData.subdominio || store.storeData.subdominio.length < 3) {
    errors.value.subdominio = 'El subdominio debe tener al menos 3 caracteres'
  } else if (subdominioStatus.value === 'unavailable') {
    errors.value.subdominio = 'Este subdominio no está disponible'
  }

  if (!store.storeData.categoria) {
    errors.value.categoria = 'Selecciona una categoría'
  }

  if (!store.storeData.pais) {
    errors.value.pais = 'Selecciona un país'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  errorMessage.value = ''

  const result = await store.saveStoreConfig()

  if (!result.success) {
    errorMessage.value = result.error || 'Error al guardar la configuración'
  }
}

function onSubdominioFocus() {
  subdominioTocado.value = true
}
</script>

<template>
  <div class="store-data-form">
    <div class="text-center mb-4">
      <h3 class="mb-2">Configura tu tienda</h3>
      <p class="text-muted">
        Personaliza los datos básicos de tu tienda online
      </p>
    </div>

    <CommonAlertMessage
      v-if="errorMessage"
      type="error"
      :message="errorMessage"
      @dismiss="errorMessage = ''"
    />

    <form @submit.prevent="handleSubmit" novalidate>
      <CommonFormInput
        v-model="store.storeData.nombre_tienda"
        label="Nombre de tu tienda"
        placeholder="Mi Tienda Increíble"
        required
        :error="errors.nombre_tienda"
      />

      <div class="mb-3">
        <label class="form-label">
          Subdominio <span class="text-danger">*</span>
        </label>
        <div class="input-group">
          <input
            v-model="store.storeData.subdominio"
            type="text"
            class="form-control"
            :class="{
              'is-valid': subdominioStatus === 'available',
              'is-invalid': subdominioStatus === 'unavailable' || errors.subdominio
            }"
            placeholder="mitienda"
            minlength="3"
            maxlength="20"
            required
            @focus="onSubdominioFocus"
          />
          <span class="input-group-text">.mitienda.pe</span>
        </div>
        <div class="form-text">
          Tu tienda estará disponible en: <strong>{{ urlPreview }}</strong>
        </div>
        <div
          v-if="subdominioMensaje"
          class="mt-1"
          :class="{
            'text-success': subdominioStatus === 'available',
            'text-danger': subdominioStatus === 'unavailable',
            'text-muted': subdominioStatus === 'checking'
          }"
        >
          <span v-if="subdominioStatus === 'checking'">Verificando...</span>
          <span v-else-if="subdominioStatus === 'available'">{{ subdominioMensaje }}</span>
          <span v-else-if="subdominioStatus === 'unavailable'">{{ subdominioMensaje }}</span>
        </div>
        <div v-if="errors.subdominio" class="invalid-feedback d-block">
          {{ errors.subdominio }}
        </div>
      </div>

      <CommonFormSelect
        v-model="store.storeData.categoria"
        label="Categoría de tu negocio"
        :options="CATEGORIES"
        placeholder="Selecciona una categoría"
        required
        :error="errors.categoria"
      />

      <CommonFormSelect
        v-model="store.storeData.pais"
        label="País"
        :options="COUNTRIES"
        placeholder="Selecciona tu país"
        required
        :error="errors.pais"
      />

      <CommonFormTextarea
        v-model="store.storeData.descripcion"
        label="Descripción de tu tienda"
        placeholder="Cuéntanos sobre tu negocio y los productos que vendes..."
        :rows="3"
        hint="Opcional - Esta información ayudará a tus clientes a conocerte mejor"
      />

      <div class="d-grid mt-4">
        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :disabled="store.isLoading || subdominioStatus === 'checking'"
        >
          <span
            v-if="store.isLoading"
            class="spinner-border spinner-border-sm me-2"
            role="status"
          ></span>
          Crear mi tienda
        </button>
      </div>
    </form>

    <div class="text-center mt-4">
      <button
        type="button"
        class="btn btn-link text-muted"
        @click="store.previousStep()"
      >
        Volver al paso anterior
      </button>
    </div>
  </div>
</template>

<style scoped>
.store-data-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-label {
  font-weight: 600;
}

.input-group-text {
  background-color: var(--background-soft, #f8f9fa);
  border-color: var(--border-light, #dee2e6);
}

.form-control.is-valid {
  border-color: var(--success, #28a745);
}

.form-control.is-invalid {
  border-color: var(--error, #dc3545);
}
</style>
