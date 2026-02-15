<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  label?: string
  options: Option[]
  placeholder?: string
  id?: string
  name?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  placeholder: 'Seleccionar...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
}>()

const selectId = computed(() => props.id || props.name || `select-${Math.random().toString(36).substr(2, 9)}`)

const selectClasses = computed(() => ({
  'form-select': true,
  'is-invalid': !!props.error
}))

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
  emit('change', target.value)
}
</script>

<template>
  <div class="mb-3">
    <label v-if="label" :for="selectId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <select
      :id="selectId"
      :class="selectClasses"
      :value="modelValue"
      :name="name"
      :required="required"
      :disabled="disabled"
      @change="handleChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
    <small v-else-if="hint" class="form-text text-muted">
      {{ hint }}
    </small>
  </div>
</template>

<style scoped>
.form-label {
  font-weight: 600;
  color: var(--text-dark);
}

.form-select {
  border-radius: var(--rounded-sm);
  border: 1px solid var(--border-light);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 178, 166, 0.1);
  outline: none;
}

.form-select.is-invalid {
  border-color: var(--error);
}

.form-select.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.invalid-feedback {
  display: block;
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
