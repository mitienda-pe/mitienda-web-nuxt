<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  id?: string
  name?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  rows?: number
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  rows: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': [event: FocusEvent]
}>()

const textareaId = computed(() => props.id || props.name || `textarea-${Math.random().toString(36).substr(2, 9)}`)

const textareaClasses = computed(() => ({
  'form-control': true,
  'is-invalid': !!props.error
}))

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mb-3">
    <label v-if="label" :for="textareaId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <textarea
      :id="textareaId"
      :class="textareaClasses"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      @input="handleInput"
      @blur="emit('blur', $event)"
    ></textarea>
    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
    <div v-else class="d-flex justify-content-between">
      <small v-if="hint" class="form-text text-muted">{{ hint }}</small>
      <small v-if="maxlength" class="form-text text-muted">
        {{ modelValue.length }}/{{ maxlength }}
      </small>
    </div>
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
  resize: vertical;
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
