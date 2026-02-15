<script setup lang="ts">
interface Props {
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  dismissible: true
})

const emit = defineEmits<{
  dismiss: []
}>()

const alertClasses = computed(() => {
  const base = 'alert d-flex align-items-center'
  const typeClass = {
    success: 'alert-success',
    error: 'alert-danger',
    warning: 'alert-warning',
    info: 'alert-info'
  }
  return `${base} ${typeClass[props.type]}`
})

const iconMap = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
}
</script>

<template>
  <div :class="alertClasses" role="alert">
    <span class="alert-icon me-2">{{ iconMap[type] }}</span>
    <span class="flex-grow-1">{{ message }}</span>
    <button
      v-if="dismissible"
      type="button"
      class="btn-close"
      aria-label="Cerrar"
      @click="emit('dismiss')"
    ></button>
  </div>
</template>

<style scoped>
.alert {
  border-radius: var(--rounded-sm);
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  border: none;
}

.alert-icon {
  font-size: 1.25rem;
  font-weight: bold;
}

.alert-success {
  background-color: rgba(102, 209, 202, 0.15);
  color: #0a5f5a;
}

.alert-danger {
  background-color: rgba(220, 53, 69, 0.15);
  color: #721c24;
}

.alert-warning {
  background-color: rgba(255, 193, 7, 0.15);
  color: #856404;
}

.alert-info {
  background-color: rgba(23, 162, 184, 0.15);
  color: #0c5460;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.btn-close:hover {
  opacity: 1;
}
</style>
