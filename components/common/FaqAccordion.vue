<script setup lang="ts">
interface FaqItem {
  q: string
  a: string
}

interface Props {
  items: FaqItem[]
  singleOpen?: boolean
  seo?: boolean
  defaultOpenIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  singleOpen: true,
  seo: false,
  defaultOpenIndex: 0,
})

const openIndex = ref<number | null>(
  props.defaultOpenIndex >= 0 && props.defaultOpenIndex < props.items.length
    ? props.defaultOpenIndex
    : null
)
const openSet = ref<Set<number>>(new Set(openIndex.value !== null ? [openIndex.value] : []))

function isOpen(i: number): boolean {
  return props.singleOpen ? openIndex.value === i : openSet.value.has(i)
}

function toggle(i: number) {
  if (props.singleOpen) {
    openIndex.value = openIndex.value === i ? null : i
  } else {
    const next = new Set(openSet.value)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    openSet.value = next
  }
}

if (props.seo) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: props.items.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        }),
      },
    ],
  })
}
</script>

<template>
  <div class="faq">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="faq-item"
      :class="{ 'is-open': isOpen(i) }"
    >
      <button
        type="button"
        class="faq-question"
        :aria-expanded="isOpen(i)"
        :aria-controls="`faq-panel-${i}`"
        @click="toggle(i)"
      >
        <span>{{ item.q }}</span>
        <span class="faq-chevron" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </button>
      <div
        v-show="isOpen(i)"
        :id="`faq-panel-${i}`"
        class="faq-answer"
        role="region"
      >
        <p>{{ item.a }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-light);
}

.faq-item {
  border-bottom: 1px solid var(--border-light);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 0.25rem;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.faq-question:hover {
  color: var(--primary-color);
}

.faq-question:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 4px;
  border-radius: var(--rounded-sm);
}

.faq-chevron {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--primary-color);
  transition: transform var(--transition-fast);
}

.faq-item.is-open .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 0.25rem 1.25rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.faq-answer p {
  margin: 0;
}
</style>
