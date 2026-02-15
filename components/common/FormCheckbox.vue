<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  id?: string
  name?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checkboxId = computed(() => props.id || props.name || `checkbox-${Math.random().toString(36).substr(2, 9)}`)

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <div class="mb-3">
    <div class="form-check">
      <input
        :id="checkboxId"
        type="checkbox"
        class="form-check-input"
        :class="{ 'is-invalid': error }"
        :checked="modelValue"
        :name="name"
        :required="required"
        :disabled="disabled"
        @change="handleChange"
      />
      <label v-if="label || $slots.default" :for="checkboxId" class="form-check-label">
        <slot>{{ label }}</slot>
        <span v-if="required" class="text-danger">*</span>
      </label>
    </div>
    <div v-if="error" class="invalid-feedback d-block">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.form-check-input {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.form-check-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 178, 166, 0.1);
}

.form-check-input.is-invalid {
  border-color: var(--error);
}

.form-check-label {
  cursor: pointer;
  color: var(--text-dark);
}

.invalid-feedback {
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
