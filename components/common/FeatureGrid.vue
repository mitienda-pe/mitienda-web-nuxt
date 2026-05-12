<script setup lang="ts">
interface FeatureItem {
  icon?: string
  emoji?: string
  title: string
  description: string
  badge?: string
}

interface Props {
  items: FeatureItem[]
  columns?: 2 | 3 | 4
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3,
})

const colClass = computed(() => {
  if (props.columns === 2) return 'col-md-6'
  if (props.columns === 4) return 'col-lg-3 col-md-6'
  return 'col-lg-4 col-md-6'
})
</script>

<template>
  <div class="row g-4">
    <div v-for="(item, i) in items" :key="i" :class="colClass">
      <div class="feature-card h-100">
        <div v-if="item.emoji || item.icon" class="feature-icon" aria-hidden="true">
          <span v-if="item.emoji">{{ item.emoji }}</span>
          <span v-else>{{ item.icon }}</span>
        </div>
        <div class="feature-body">
          <div class="feature-title-row">
            <h3 class="feature-title">{{ item.title }}</h3>
            <span v-if="item.badge" class="feature-badge">{{ item.badge }}</span>
          </div>
          <p class="feature-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: var(--rounded-lg);
  padding: 1.75rem;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: rgba(0, 178, 166, 0.25);
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--rounded-md);
  background: rgba(0, 178, 166, 0.1);
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.feature-body {
  flex: 1;
}

.feature-title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
}

.feature-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #7c4a03;
  background: rgba(245, 158, 11, 0.18);
  border: 1px solid rgba(245, 158, 11, 0.35);
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
}

.feature-description {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.55;
  margin: 0;
}
</style>
