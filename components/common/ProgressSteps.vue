<script setup lang="ts">
interface Step {
  number: number
  label: string
}

interface Props {
  currentStep: number
  steps?: Step[]
}

const props = withDefaults(defineProps<Props>(), {
  steps: () => [
    { number: 1, label: 'Tus datos' },
    { number: 2, label: 'Tu tienda' },
    { number: 3, label: '¡Listo!' }
  ]
})

const getStepClass = computed(() => (step: Step) => {
  if (step.number < props.currentStep) return 'step completed'
  if (step.number === props.currentStep) return 'step active'
  return 'step'
})
</script>

<template>
  <div class="progress-steps">
    <div
      v-for="(step, index) in steps"
      :key="step.number"
      :class="getStepClass(step)"
    >
      <div class="step-number">
        <span v-if="step.number < currentStep" class="check-icon">✓</span>
        <span v-else>{{ step.number }}</span>
      </div>
      <div class="step-label">{{ step.label }}</div>
      <div v-if="index < steps.length - 1" class="step-connector"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  max-width: 150px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  background: var(--border-light);
  color: var(--text-muted);
  transition: all 0.3s ease;
  z-index: 2;
}

.step.active .step-number {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 178, 166, 0.3);
}

.step.completed .step-number {
  background: var(--success);
  color: white;
}

.check-icon {
  font-size: 1.2rem;
}

.step-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-align: center;
  font-weight: 500;
}

.step.active .step-label {
  color: var(--primary-color);
  font-weight: 600;
}

.step.completed .step-label {
  color: var(--success);
}

.step-connector {
  position: absolute;
  top: 20px;
  left: calc(50% + 25px);
  width: calc(100% - 10px);
  height: 2px;
  background: var(--border-light);
  z-index: 1;
}

.step.completed .step-connector {
  background: var(--success);
}

@media (max-width: 576px) {
  .step-label {
    font-size: 0.75rem;
  }

  .step-number {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }

  .step-connector {
    top: 16px;
    left: calc(50% + 20px);
  }
}
</style>
