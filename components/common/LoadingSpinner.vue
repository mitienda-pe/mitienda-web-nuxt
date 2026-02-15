<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  overlay?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  overlay: false
})
</script>

<template>
  <div :class="['loading-spinner', { 'loading-overlay': overlay }]">
    <div class="spinner-container">
      <div :class="['spinner', `spinner-${size}`]">
        <div class="spinner-ring"></div>
      </div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 9999;
}

.spinner-container {
  text-align: center;
}

.spinner {
  display: inline-block;
  position: relative;
}

.spinner-sm {
  width: 24px;
  height: 24px;
}

.spinner-md {
  width: 40px;
  height: 40px;
}

.spinner-lg {
  width: 64px;
  height: 64px;
}

.spinner-ring {
  width: 100%;
  height: 100%;
  border: 3px solid var(--border-light);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-sm .spinner-ring {
  border-width: 2px;
}

.spinner-lg .spinner-ring {
  border-width: 4px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-message {
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}
</style>
