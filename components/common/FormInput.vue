<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  id?: string
  name?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  autocomplete?: string
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const inputId = computed(() => props.id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => ({
  'form-control': true,
  'is-invalid': !!props.error
}))

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mb-3">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :class="inputClasses"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :maxlength="maxlength"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
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

.form-control {
  border-radius: var(--rounded-sm);
  border: 1px solid var(--border-light);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 178, 166, 0.1);
  outline: none;
}

.form-control.is-invalid {
  border-color: var(--error);
}

.form-control.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.invalid-feedback {
  display: block;
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
