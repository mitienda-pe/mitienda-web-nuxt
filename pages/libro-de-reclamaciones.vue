<script setup lang="ts">
definePageMeta({
  middleware: ['peru-only']
})

useSeoMeta({
  title: 'Libro de Reclamaciones - miTienda',
  description: 'Libro de reclamaciones virtual de miTienda',
})

// Document types with max digits
const documentTypes = [
  { value: '1', label: 'DNI', maxDigits: 8 },
  { value: '2', label: 'RUC', maxDigits: 11 },
  { value: '4', label: 'PASAPORTE', maxDigits: 9 },
  { value: '5', label: 'CARNET DE EXTRANJERIA', maxDigits: 12 }
]

// Form data
const form = ref({
  libroreclamacion_fecha: new Date().toLocaleDateString('es-PE'),
  libroreclamacion_nombre: '',
  libroreclamacion_domicilio: '',
  libroreclamacion_tipodocumento: '1',
  libroreclamacion_numero: '',
  libroreclamacion_email: '',
  libroreclamacion_telefono: '',
  libroreclamacion_tipobien: '1',
  libroreclamacion_descripcionbien: '',
  libroreclamacion_tiporeclamacion: '1',
  libroreclamacion_detallereclamacion: '',
  terminosLibroReclamaciones: false
})

// Form state
const errors = ref<Record<string, string>>({})
const isLoading = ref(false)
const errorMessage = ref('')
const successData = ref<Record<string, string> | null>(null)
const showModal = ref(false)
const pdfHash = ref('')

// Max digits based on document type
const maxDigits = computed(() => {
  const docType = documentTypes.find(d => d.value === form.value.libroreclamacion_tipodocumento)
  return docType?.maxDigits || 8
})

// Watch document type changes
watch(() => form.value.libroreclamacion_tipodocumento, () => {
  form.value.libroreclamacion_numero = ''
})

// Validation
function validateForm(): boolean {
  errors.value = {}

  if (!form.value.libroreclamacion_nombre) {
    errors.value.libroreclamacion_nombre = 'Por favor ingrese sus nombres y apellidos.'
  }

  if (!form.value.libroreclamacion_domicilio) {
    errors.value.libroreclamacion_domicilio = 'Por favor ingrese su domicilio.'
  }

  if (!form.value.libroreclamacion_numero || form.value.libroreclamacion_numero.length < 8) {
    errors.value.libroreclamacion_numero = 'Por favor ingrese un número de documento válido.'
  }

  if (!form.value.libroreclamacion_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.libroreclamacion_email)) {
    errors.value.libroreclamacion_email = 'Por favor ingrese un correo electrónico válido.'
  }

  if (!form.value.libroreclamacion_telefono || !/^\d{9}$/.test(form.value.libroreclamacion_telefono)) {
    errors.value.libroreclamacion_telefono = 'Por favor ingrese un teléfono válido (9 dígitos).'
  }

  if (!form.value.libroreclamacion_descripcionbien) {
    errors.value.libroreclamacion_descripcionbien = 'Por favor describa el bien contratado.'
  }

  if (!form.value.libroreclamacion_detallereclamacion) {
    errors.value.libroreclamacion_detallereclamacion = 'Por favor detalle su reclamación.'
  }

  if (!form.value.terminosLibroReclamaciones) {
    errors.value.terminosLibroReclamaciones = 'Debe aceptar los términos y condiciones para continuar.'
  }

  return Object.keys(errors.value).length === 0
}

// Submit handler
async function handleSubmit() {
  if (!validateForm()) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const data = await $fetch<{ hash?: string; error?: string }>('/api/reclamaciones', {
      method: 'POST',
      body: form.value
    })

    if (data.hash) {
      pdfHash.value = data.hash
      successData.value = {
        fecha: form.value.libroreclamacion_fecha,
        nombre: form.value.libroreclamacion_nombre,
        domicilio: form.value.libroreclamacion_domicilio,
        documento: `${documentTypes.find(d => d.value === form.value.libroreclamacion_tipodocumento)?.label} ${form.value.libroreclamacion_numero}`,
        email: form.value.libroreclamacion_email,
        telefono: form.value.libroreclamacion_telefono,
        tipoBien: form.value.libroreclamacion_tipobien === '1' ? 'Producto' : 'Servicio',
        tipoReclamacion: form.value.libroreclamacion_tiporeclamacion === '1' ? 'Reclamo' : 'Queja',
        descripcion: form.value.libroreclamacion_descripcionbien,
        detalle: form.value.libroreclamacion_detallereclamacion
      }
      showModal.value = true
    } else {
      errorMessage.value = data.error || 'Error al enviar la reclamación. Por favor intente nuevamente.'
    }
  } catch {
    errorMessage.value = 'Error de conexión. Por favor intente nuevamente.'
  } finally {
    isLoading.value = false
  }
}

// Download PDF
function downloadPdf() {
  if (pdfHash.value) {
    window.open(`https://api.mitienda.pe/v1/libroreclamaciones/descargapdf/${pdfHash.value}`, '_blank')
  }
}

// Handle input for document number (only digits)
function handleDocNumberInput(event: Event) {
  const input = event.target as HTMLInputElement
  form.value.libroreclamacion_numero = input.value.replace(/\D/g, '').substring(0, maxDigits.value)
}

// Handle phone input (only digits)
function handlePhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  form.value.libroreclamacion_telefono = input.value.replace(/\D/g, '').substring(0, 9)
}
</script>

<template>
  <div class="libro-reclamaciones">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-8">
          <!-- Header -->
          <div class="text-center mb-5">
            <h1 class="fw-bold text-primary mb-3">
              Libro de Reclamaciones
            </h1>
            <p class="lead text-muted">
              Conforme a lo establecido en el Código de Protección y Defensa del Consumidor contamos con un Libro de Reclamaciones a tu disposición. Ingresa una queja o reclamo aquí.
            </p>
          </div>

          <!-- Main Form -->
          <div class="card shadow-lg border-0">
            <div class="card-body p-4 p-lg-5">
              <form @submit.prevent="handleSubmit" novalidate>
                <CommonAlertMessage
                  v-if="errorMessage"
                  type="error"
                  :message="errorMessage"
                  @dismiss="errorMessage = ''"
                />

                <!-- Date Field -->
                <div class="mb-4">
                  <label for="libroreclamacion_fecha" class="form-label fw-semibold">
                    Fecha de reclamo o queja:
                  </label>
                  <input
                    type="text"
                    id="libroreclamacion_fecha"
                    v-model="form.libroreclamacion_fecha"
                    class="form-control form-control-lg"
                    readonly
                  />
                </div>

                <hr class="my-4" />

                <!-- Section 1: Customer Information -->
                <div class="mb-5">
                  <h4 class="fw-bold text-primary mb-4">
                    <span class="badge bg-primary rounded-pill me-2">1</span>
                    IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE
                  </h4>

                  <!-- Name -->
                  <div class="mb-3">
                    <label for="libroreclamacion_nombre" class="form-label fw-semibold">
                      Nombres y Apellidos *
                    </label>
                    <input
                      type="text"
                      id="libroreclamacion_nombre"
                      v-model="form.libroreclamacion_nombre"
                      class="form-control form-control-lg"
                      :class="{ 'is-invalid': errors.libroreclamacion_nombre }"
                      maxlength="250"
                      placeholder="Ingrese sus nombres y apellidos completos"
                    />
                    <div v-if="errors.libroreclamacion_nombre" class="invalid-feedback">
                      {{ errors.libroreclamacion_nombre }}
                    </div>
                  </div>

                  <!-- Address -->
                  <div class="mb-3">
                    <label for="libroreclamacion_domicilio" class="form-label fw-semibold">
                      Domicilio *
                    </label>
                    <input
                      type="text"
                      id="libroreclamacion_domicilio"
                      v-model="form.libroreclamacion_domicilio"
                      class="form-control form-control-lg"
                      :class="{ 'is-invalid': errors.libroreclamacion_domicilio }"
                      maxlength="250"
                      placeholder="Ingrese su dirección completa"
                    />
                    <div v-if="errors.libroreclamacion_domicilio" class="invalid-feedback">
                      {{ errors.libroreclamacion_domicilio }}
                    </div>
                  </div>

                  <!-- Document Type and Number -->
                  <div class="row g-3 mb-3">
                    <div class="col-md-5">
                      <label for="libroreclamacion_tipodocumento" class="form-label fw-semibold">
                        Documento de Identidad *
                      </label>
                      <select
                        id="libroreclamacion_tipodocumento"
                        v-model="form.libroreclamacion_tipodocumento"
                        class="form-select form-select-lg"
                      >
                        <option v-for="doc in documentTypes" :key="doc.value" :value="doc.value">
                          {{ doc.label }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-7">
                      <label for="libroreclamacion_numero" class="form-label fw-semibold">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        id="libroreclamacion_numero"
                        :value="form.libroreclamacion_numero"
                        @input="handleDocNumberInput"
                        class="form-control form-control-lg"
                        :class="{ 'is-invalid': errors.libroreclamacion_numero }"
                        :maxlength="maxDigits"
                        placeholder="Ingrese el número de documento"
                      />
                      <div v-if="errors.libroreclamacion_numero" class="invalid-feedback">
                        {{ errors.libroreclamacion_numero }}
                      </div>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="mb-3">
                    <label for="libroreclamacion_email" class="form-label fw-semibold">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="libroreclamacion_email"
                      v-model="form.libroreclamacion_email"
                      class="form-control form-control-lg"
                      :class="{ 'is-invalid': errors.libroreclamacion_email }"
                      maxlength="150"
                      placeholder="ejemplo@correo.com"
                    />
                    <div v-if="errors.libroreclamacion_email" class="invalid-feedback">
                      {{ errors.libroreclamacion_email }}
                    </div>
                  </div>

                  <!-- Phone -->
                  <div class="mb-3">
                    <label for="libroreclamacion_telefono" class="form-label fw-semibold">
                      Teléfono *
                    </label>
                    <input
                      type="text"
                      id="libroreclamacion_telefono"
                      :value="form.libroreclamacion_telefono"
                      @input="handlePhoneInput"
                      class="form-control form-control-lg"
                      :class="{ 'is-invalid': errors.libroreclamacion_telefono }"
                      maxlength="9"
                      placeholder="999888777"
                    />
                    <div v-if="errors.libroreclamacion_telefono" class="invalid-feedback">
                      {{ errors.libroreclamacion_telefono }}
                    </div>
                  </div>
                </div>

                <hr class="my-4" />

                <!-- Section 2: Product/Service Information -->
                <div class="mb-5">
                  <h4 class="fw-bold text-primary mb-4">
                    <span class="badge bg-primary rounded-pill me-2">2</span>
                    IDENTIFICACIÓN DEL BIEN CONTRATADO
                  </h4>

                  <!-- Product/Service Type -->
                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      Tipo de Bien *
                    </label>
                    <div class="d-flex gap-4 mt-2">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="libroreclamacion_tipobien_producto"
                          v-model="form.libroreclamacion_tipobien"
                          value="1"
                        />
                        <label class="form-check-label fw-medium" for="libroreclamacion_tipobien_producto">
                          Producto
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="libroreclamacion_tipobien_servicio"
                          v-model="form.libroreclamacion_tipobien"
                          value="2"
                        />
                        <label class="form-check-label fw-medium" for="libroreclamacion_tipobien_servicio">
                          Servicio
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="mb-3">
                    <label for="libroreclamacion_descripcionbien" class="form-label fw-semibold">
                      Descripción del Bien *
                    </label>
                    <textarea
                      id="libroreclamacion_descripcionbien"
                      v-model="form.libroreclamacion_descripcionbien"
                      class="form-control form-control-lg"
                      :class="{ 'is-invalid': errors.libroreclamacion_descripcionbien }"
                      rows="4"
                      placeholder="Describa detalladamente el producto o servicio..."
                    ></textarea>
                    <div v-if="errors.libroreclamacion_descripcionbien" class="invalid-feedback">
                      {{ errors.libroreclamacion_descripcionbien }}
                    </div>
                    <div class="form-text">
                      Incluya marca, modelo, características o detalles relevantes del producto/servicio.
                    </div>
                  </div>
                </div>

                <hr class="my-4" />

                <!-- Section 3: Complaint Details -->
                <div class="mb-5">
                  <h4 class="fw-bold text-primary mb-4">
                    <span class="badge bg-primary rounded-pill me-2">3</span>
                    DETALLE DE LA RECLAMACIÓN
                  </h4>

                  <!-- Complaint Type -->
                  <div class="mb-4">
                    <label class="form-label fw-semibold">
                      Tipo de Reclamación *
                    </label>
                    <div class="d-flex gap-4 mt-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="libroreclamacion_tiporeclamacion_reclamo"
                          v-model="form.libroreclamacion_tiporeclamacion"
                          value="1"
                        />
                        <label class="form-check-label fw-medium" for="libroreclamacion_tiporeclamacion_reclamo">
                          Reclamo
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="libroreclamacion_tiporeclamacion_queja"
                          v-model="form.libroreclamacion_tiporeclamacion"
                          value="2"
                        />
                        <label class="form-check-label fw-medium" for="libroreclamacion_tiporeclamacion_queja">
                          Queja
                        </label>
                      </div>
                    </div>

                    <!-- Information Cards -->
                    <div class="row mt-3">
                      <div class="col-md-6">
                        <div class="card border-danger bg-light h-100">
                          <div class="card-body py-3">
                            <h6 class="card-title text-danger fw-bold">
                              RECLAMO
                            </h6>
                            <p class="card-text small mb-0">
                              Disconformidad relacionada a los productos expendidos o servicios brindados.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="card border-warning bg-light h-100">
                          <div class="card-body py-3">
                            <h6 class="card-title text-warning fw-bold">
                              QUEJA
                            </h6>
                            <p class="card-text small mb-0">
                              Disconformidad NO relacionada a los productos o servicios. Malestar respecto a la atención.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Complaint Detail -->
                  <div class="mb-3">
                    <label for="libroreclamacion_detallereclamacion" class="form-label fw-semibold">
                      Detalle de la Reclamación *
                    </label>
                    <textarea
                      id="libroreclamacion_detallereclamacion"
                      v-model="form.libroreclamacion_detallereclamacion"
                      class="form-control form-control-lg"
                      :class="{ 'is-invalid': errors.libroreclamacion_detallereclamacion }"
                      rows="5"
                      placeholder="Describe detalladamente tu reclamo o queja, incluyendo fechas, lugares y circunstancias..."
                    ></textarea>
                    <div v-if="errors.libroreclamacion_detallereclamacion" class="invalid-feedback">
                      {{ errors.libroreclamacion_detallereclamacion }}
                    </div>
                    <div class="form-text">
                      Sea específico y proporcione toda la información relevante para resolver su caso.
                    </div>
                  </div>
                </div>

                <hr class="my-4" />

                <!-- Section 4: Vendor Actions -->
                <div class="mb-5">
                  <h4 class="fw-bold text-primary mb-4">
                    <span class="badge bg-secondary rounded-pill me-2">4</span>
                    ACCIONES ADOPTADAS POR EL VENDEDOR
                  </h4>

                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      Detalle de Acciones
                    </label>
                    <div class="card bg-light">
                      <div class="card-body">
                        <textarea
                          class="form-control border-0 bg-transparent"
                          rows="4"
                          readonly
                        >Este campo será llenado por el proveedor al momento de atender su queja o reclamo.</textarea>
                      </div>
                    </div>
                    <div class="form-text">
                      Esta sección será completada por nuestro equipo una vez que revisemos su caso.
                    </div>
                  </div>
                </div>

                <hr class="my-4" />

                <!-- Terms and Submit -->
                <div class="mb-4">
                  <div class="form-check mb-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="terminosLibroReclamaciones"
                      v-model="form.terminosLibroReclamaciones"
                      :class="{ 'is-invalid': errors.terminosLibroReclamaciones }"
                    />
                    <label class="form-check-label fw-medium" for="terminosLibroReclamaciones">
                      Acepto los Términos del
                      <a
                        href="https://www.indecopi.gob.pe/documents/20195/177451/CodigoDProteccionyDefensaDelConsumidor%5B1%5D.pdf/934ea9ef-fcc9-48b8-9679-3e8e2493354e"
                        target="_blank"
                        class="text-decoration-none"
                      >
                        artículo 150º de la Ley Nº 29571 del Código de Protección y Defensa del Consumidor
                      </a>
                    </label>
                    <div v-if="errors.terminosLibroReclamaciones" class="invalid-feedback d-block">
                      {{ errors.terminosLibroReclamaciones }}
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg px-5 py-3"
                      :disabled="isLoading"
                    >
                      <span
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Enviar Reclamación
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0,0,0,0.5)"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h4 class="modal-title fw-bold">
              RESUMEN DE RECLAMACIÓN
            </h4>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="showModal = false"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div class="alert alert-success mb-4">
              <strong>¡Reclamación enviada exitosamente!</strong>
              <br />Su reclamo ha sido registrado y será procesado en un plazo máximo de 30 días calendario.
            </div>

            <h5 class="fw-bold text-primary mb-3">
              DETALLE DE LA RECLAMACIÓN
            </h5>

            <div class="row g-3" v-if="successData">
              <div class="col-12">
                <div class="card border-0 bg-light">
                  <div class="card-body py-2">
                    <div class="row">
                      <div class="col-4"><strong class="text-muted">Fecha:</strong></div>
                      <div class="col-8 fw-medium">{{ successData.fecha }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="card border-0 bg-light">
                  <div class="card-body py-2">
                    <div class="row">
                      <div class="col-4"><strong class="text-muted">Nombres y Apellidos:</strong></div>
                      <div class="col-8 fw-medium">{{ successData.nombre }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="card border-0 bg-light">
                  <div class="card-body py-2">
                    <div class="row">
                      <div class="col-4"><strong class="text-muted">Domicilio:</strong></div>
                      <div class="col-8 fw-medium">{{ successData.domicilio }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="card border-0 bg-light">
                  <div class="card-body py-2">
                    <div class="row">
                      <div class="col-4"><strong class="text-muted">Documento:</strong></div>
                      <div class="col-8 fw-medium">{{ successData.documento }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-12">
                <div class="card border-0 bg-light h-100">
                  <div class="card-body py-2">
                    <strong class="text-muted">Email:</strong><br />
                    <span class="fw-medium">{{ successData.email }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="card border-0 bg-light h-100">
                  <div class="card-body py-2">
                    <strong class="text-muted">Teléfono:</strong><br />
                    <span class="fw-medium">{{ successData.telefono }}</span>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-12">
                <div class="card border-0 bg-light h-100">
                  <div class="card-body py-2">
                    <strong class="text-muted">Tipo de Bien:</strong><br />
                    <span class="fw-medium">{{ successData.tipoBien }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="card border-0 bg-light h-100">
                  <div class="card-body py-2">
                    <strong class="text-muted">Tipo de Reclamación:</strong><br />
                    <span class="fw-medium">{{ successData.tipoReclamacion }}</span>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="card border-0 bg-light">
                  <div class="card-body">
                    <strong class="text-muted">Descripción del Bien:</strong>
                    <p class="fw-medium mb-0 mt-2" style="text-align: justify;">{{ successData.descripcion }}</p>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="card border-0 bg-light">
                  <div class="card-body">
                    <strong class="text-muted">Detalle de la Reclamación:</strong>
                    <p class="fw-medium mb-0 mt-2" style="text-align: justify;">{{ successData.detalle }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="showModal = false">
              Cerrar
            </button>
            <button type="button" class="btn btn-primary" @click="downloadPdf">
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.libro-reclamaciones {
  padding-top: 2rem;
}

.form-label {
  font-weight: 600;
}

.form-control-lg {
  font-size: 1rem;
}

.badge {
  font-size: 0.9rem;
}
</style>
