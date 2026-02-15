<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline' | 'white' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes = ['btn']

  // Variant
  if (props.variant === 'primary') classes.push('btn-primary')
  else if (props.variant === 'outline') classes.push('btn-outline')
  else if (props.variant === 'white') classes.push('btn-white')
  else if (props.variant === 'danger') classes.push('btn-danger')

  // Size
  if (props.size === 'lg') classes.push('btn-lg')
  else if (props.size === 'sm') classes.push('btn-sm')

  // Block
  if (props.block) classes.push('w-100')

  return classes
})

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="buttonClasses">
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status">
      <span class="visually-hidden">Cargando...</span>
    </span>
    <slot />
  </button>
</template>

<style scoped>
.btn {
  font-weight: 600;
  border-radius: var(--rounded-lg);
  padding: 0.75rem 1.5rem;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 178, 166, 0.3);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--border-light);
  color: var(--text-dark);
}

.btn-outline:hover:not(:disabled) {
  background: var(--text-dark);
  color: white;
  border-color: var(--text-dark);
}

.btn-white {
  background: white;
  color: var(--primary-color);
  font-weight: 700;
}

.btn-white:hover:not(:disabled) {
  background: #f8f9fa;
  color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-danger {
  background: var(--error);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #c82333;
  transform: translateY(-1px);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
</style>
