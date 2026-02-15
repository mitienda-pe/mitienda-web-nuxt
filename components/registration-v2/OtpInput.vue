<script setup lang="ts">
interface Props {
  modelValue: string
  length?: number
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'complete': [value: string]
}>()

const inputs = ref<HTMLInputElement[]>([])
const digits = ref<string[]>(Array(props.length).fill(''))

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue !== digits.value.join('')) {
    digits.value = newValue.split('').slice(0, props.length)
    while (digits.value.length < props.length) {
      digits.value.push('')
    }
  }
})

function handleInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '').slice(-1) // Only last digit

  digits.value[index] = value

  const fullValue = digits.value.join('')
  emit('update:modelValue', fullValue)

  // Auto-focus next input
  if (value && index < props.length - 1) {
    nextTick(() => {
      inputs.value[index + 1]?.focus()
    })
  }

  // Emit complete when all digits are filled
  if (fullValue.length === props.length) {
    emit('complete', fullValue)
  }
}

function handleKeydown(index: number, event: KeyboardEvent) {
  // Handle backspace
  if (event.key === 'Backspace') {
    if (!digits.value[index] && index > 0) {
      // Move to previous input if current is empty
      nextTick(() => {
        inputs.value[index - 1]?.focus()
      })
    }
    digits.value[index] = ''
    emit('update:modelValue', digits.value.join(''))
  }

  // Handle arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    inputs.value[index - 1]?.focus()
  }
  if (event.key === 'ArrowRight' && index < props.length - 1) {
    inputs.value[index + 1]?.focus()
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, props.length)

  if (pastedData) {
    digits.value = pastedData.split('')
    while (digits.value.length < props.length) {
      digits.value.push('')
    }

    const fullValue = digits.value.join('')
    emit('update:modelValue', fullValue)

    // Focus the last filled input or the first empty one
    const lastFilledIndex = pastedData.length - 1
    if (lastFilledIndex < props.length - 1) {
      nextTick(() => {
        inputs.value[lastFilledIndex + 1]?.focus()
      })
    }

    if (fullValue.length === props.length) {
      emit('complete', fullValue)
    }
  }
}

function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  target.select()
}

function setInputRef(el: HTMLInputElement | null, index: number) {
  if (el) {
    inputs.value[index] = el
  }
}

function focus() {
  inputs.value[0]?.focus()
}

function clear() {
  digits.value = Array(props.length).fill('')
  emit('update:modelValue', '')
  focus()
}

onMounted(() => {
  focus()
})

defineExpose({ focus, clear })
</script>

<template>
  <div class="otp-input-container">
    <div class="otp-inputs">
      <input
        v-for="(digit, index) in digits"
        :key="index"
        :ref="(el) => setInputRef(el as HTMLInputElement, index)"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="1"
        :value="digit"
        :disabled="disabled"
        :class="['otp-digit', { 'is-invalid': error, 'is-filled': digit }]"
        @input="handleInput(index, $event)"
        @keydown="handleKeydown(index, $event)"
        @paste="handlePaste"
        @focus="handleFocus"
      />
    </div>
    <div v-if="error" class="otp-error">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.otp-input-container {
  width: 100%;
}

.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.otp-digit {
  width: 48px;
  height: 56px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid var(--border-light, #dee2e6);
  border-radius: var(--rounded-sm, 8px);
  background: white;
  transition: all 0.2s ease;
}

.otp-digit:focus {
  outline: none;
  border-color: var(--primary-color, #00b2a6);
  box-shadow: 0 0 0 3px rgba(0, 178, 166, 0.15);
}

.otp-digit.is-filled {
  border-color: var(--primary-color, #00b2a6);
  background-color: rgba(0, 178, 166, 0.05);
}

.otp-digit.is-invalid {
  border-color: var(--error, #dc3545);
}

.otp-digit.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
}

.otp-digit:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.otp-error {
  text-align: center;
  color: var(--error, #dc3545);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

@media (max-width: 400px) {
  .otp-inputs {
    gap: 4px;
  }

  .otp-digit {
    width: 40px;
    height: 48px;
    font-size: 1.25rem;
  }
}
</style>
