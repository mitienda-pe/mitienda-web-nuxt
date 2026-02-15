<script setup lang="ts">
import { CATEGORIES, COUNTRIES } from '~/types'

const router = useRouter()
const registrationStore = useRegistrationStore()

// Props
const props = defineProps<{
  codigo: string
}>()

// Form data
const form = ref({
  nombre_tienda: '',
  subdominio: '',
  categoria: '',
  pais: 'PE',
  descripcion: ''
})

// Form errors
const errors = ref<Record<string, string>>({})

// Subdomain validation
const subdominioTocado = ref(false)
const subdominioStatus = ref<'idle' | 'checking' | 'available' | 'unavailable'>('idle')
const subdominioMensaje = ref('')

// Loading state
const isLoading = ref(false)
const errorMessage = ref('')

// Computed URL preview
const urlPreview = computed(() => {
  const domain = form.value.pais === 'EC' ? 'tiendabox.ec' : 'mitienda.pe'
  return form.value.subdominio
    ? `${form.value.subdominio}.${domain}`
    : `tutienda.${domain}`
})

// Generate subdomain from store name
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

// Watch store name to auto-generate subdomain
watch(() => form.value.nombre_tienda, (newValue) => {
  if (!subdominioTocado.value) {
    form.value.subdominio = generarSubdominio(newValue)
    if (form.value.subdominio.length >= 3) {
      verificarDisponibilidad(form.value.subdominio)
    }
  }
})

// Watch subdomain for manual changes
watch(() => form.value.subdominio, (newValue) => {
  // Clean subdomain
  form.value.subdominio = newValue.toLowerCase().replace(/[^a-z0-9-]/g, '')

  if (form.value.subdominio.length >= 3) {
    verificarDisponibilidad(form.value.subdominio)
  } else {
    subdominioStatus.value = 'idle'
    subdominioMensaje.value = ''
  }
})

// Check subdomain availability
let debounceTimer: ReturnType<typeof setTimeout>
async function verificarDisponibilidad(subdominio: string) {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(async () => {
    subdominioStatus.value = 'checking'
    subdominioMensaje.value = 'Verificando...'

    try {
      const result = await registrationStore.validarSubdominio(subdominio)

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

// Validation
function validateForm(): boolean {
  errors.value = {}

  if (!form.value.nombre_tienda) {
    errors.value.nombre_tienda = 'El nombre de la tienda es requerido'
  }

  if (!form.value.subdominio || form.value.subdominio.length < 3) {
    errors.value.subdominio = 'El subdominio debe tener al menos 3 caracteres'
  } else if (subdominioStatus.value === 'unavailable') {
    errors.value.subdominio = 'Este subdominio no está disponible'
  }

  if (!form.value.categoria) {
    errors.value.categoria = 'Selecciona una categoría'
  }

  if (!form.value.pais) {
    errors.value.pais = 'Selecciona un país'
  }

  return Object.keys(errors.value).length === 0
}

// Submit handler
async function handleSubmit() {
  if (!validateForm()) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await registrationStore.submitPaso2(
      {
        nombre_tienda: form.value.nombre_tienda,
        subdominio: form.value.subdominio,
        categoria: form.value.categoria,
        pais: form.value.pais,
        descripcion: form.value.descripcion
      },
      props.codigo
    )

    if (result.success) {
      navigateTo(`/prueba-gratis/completar/${props.codigo}`)
    } else {
      errorMessage.value = result.error || 'Error al guardar la configuración. Por favor intenta de nuevo.'
    }
  } catch (e) {
    errorMessage.value = 'Error de conexión. Por favor intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}

// Mark subdomain as touched
function onSubdominioFocus() {
  subdominioTocado.value = true
}

// Initialize
onMounted(() => {
  registrationStore.setCodigo(props.codigo)
})
</script>

<template>
  <div class="store-config-form">
    <CommonProgressSteps :current-step="2" />

    <div class="card">
      <div class="card-body p-4">
        <h2 class="text-center mb-4">Configura tu tienda</h2>
        <p class="text-center text-muted mb-5">
          Personaliza los datos básicos de tu tienda online
        </p>

        <form @submit.prevent="handleSubmit" novalidate>
          <CommonAlertMessage
            v-if="errorMessage"
            type="error"
            :message="errorMessage"
            @dismiss="errorMessage = ''"
          />

          <div class="row">
            <div class="col-md-6">
              <CommonFormInput
                v-model="form.nombre_tienda"
                label="Nombre de tu tienda"
                placeholder="Mi Tienda Increíble"
                required
                :error="errors.nombre_tienda"
              />
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">
                  Subdominio <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <input
                    v-model="form.subdominio"
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
                  <span v-if="subdominioStatus === 'checking'">🔄</span>
                  <span v-else-if="subdominioStatus === 'available'">✅</span>
                  <span v-else-if="subdominioStatus === 'unavailable'">❌</span>
                  {{ subdominioMensaje }}
                </div>
                <div v-if="errors.subdominio" class="invalid-feedback d-block">
                  {{ errors.subdominio }}
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <CommonFormSelect
                v-model="form.categoria"
                label="Categoría de tu negocio"
                :options="CATEGORIES"
                placeholder="Selecciona una categoría"
                required
                :error="errors.categoria"
              />
            </div>

            <div class="col-md-6">
              <CommonFormSelect
                v-model="form.pais"
                label="País"
                :options="COUNTRIES"
                placeholder="Selecciona tu país"
                required
                :error="errors.pais"
              />
            </div>
          </div>

          <CommonFormTextarea
            v-model="form.descripcion"
            label="Descripción de tu tienda"
            placeholder="Cuéntanos sobre tu negocio y los productos que vendes..."
            :rows="3"
            hint="Opcional - Esta información ayudará a tus clientes a conocerte mejor"
          />

          <div class="d-grid gap-2 d-md-flex justify-content-md-between mt-4">
            <NuxtLink to="/prueba-gratis" class="btn btn-outline-secondary">
              ← Volver
            </NuxtLink>
            <button
              type="submit"
              class="btn btn-primary btn-lg px-4"
              :disabled="isLoading || subdominioStatus === 'checking'"
            >
              <span
                v-if="isLoading"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Continuar →
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-label {
  font-weight: 600;
}

.input-group-text {
  background-color: var(--background-soft);
  border-color: var(--border-light);
}

.form-control.is-valid {
  border-color: var(--success);
}

.form-control.is-invalid {
  border-color: var(--error);
}
</style>
