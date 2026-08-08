<script setup lang="ts">
import type { BlogSearchEntry } from '~/composables/useBlogSearch'

const { country, countryCode, brandName } = useCountry()
const route = useRoute()
const router = useRouter()

const POSTS_PER_PAGE = 12

// Solo metadatos: traer el `body` de los ~89 artículos inflaba el HTML de esta
// página por encima de 1 MB. El texto para buscar vive en /api/blog/search-index.
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog')
    .select('path', 'title', 'description', 'date', 'image', 'tags', 'countries')
    .order('date', 'DESC')
    .all()
)

const filteredPosts = computed(() =>
  posts.value?.filter(post => post.countries.includes(countryCode.value)) || []
)

/* ------------------------------- Buscador ------------------------------- */

function queryParam(value: unknown): string {
  return (Array.isArray(value) ? value[0] : value)?.toString().trim() || ''
}

const initialQuery = queryParam(route.query.q)

/** Lo que el usuario ve mientras escribe. */
const inputQuery = ref(initialQuery)
/** Lo que realmente se busca (con debounce, para no filtrar en cada tecla). */
const activeQuery = ref(initialQuery)

const {
  data: searchIndex,
  status: indexStatus,
  execute: loadIndex,
} = await useAsyncData(
  'blog-search-index',
  () => $fetch<{ posts: BlogSearchEntry[] }>('/api/blog/search-index'),
  // Con ?q= en la URL el índice se necesita ya en SSR, para que un resultado
  // compartido por enlace se renderice en el servidor.
  { immediate: initialQuery.length >= MIN_QUERY_LENGTH }
)

function ensureIndex() {
  if (searchIndex.value || indexStatus.value === 'pending') return
  loadIndex()
}

const searchEntries = computed<BlogSearchEntry[]>(() =>
  searchIndex.value?.posts.filter(post => post.countries.includes(countryCode.value)) || []
)

const { isSearching, results } = useBlogSearch(searchEntries, activeQuery)

const isLoadingIndex = computed(() =>
  isSearching.value && !searchIndex.value && indexStatus.value === 'pending'
)

watch(isSearching, searching => {
  if (searching) ensureIndex()
}, { immediate: true })

const SEARCH_DEBOUNCE_MS = 250
let debounceTimer: ReturnType<typeof setTimeout> | undefined

watch(inputQuery, value => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    const q = value.trim()
    if (q === activeQuery.value) return
    activeQuery.value = q
    // Sin `page`: cambiar la búsqueda siempre vuelve a la primera página.
    router.replace({ query: q ? { q } : {} })
  }, SEARCH_DEBOUNCE_MS)
})

onBeforeUnmount(() => clearTimeout(debounceTimer))

// Botones atrás/adelante del navegador.
watch(() => route.query.q, value => {
  const q = queryParam(value)
  if (q === activeQuery.value) return
  inputQuery.value = q
  activeQuery.value = q
})

function clearSearch() {
  inputQuery.value = ''
  activeQuery.value = ''
  router.replace({ query: {} })
}

/* ------------------------------ Listado ------------------------------- */

const displayedPosts = computed(() => (isSearching.value ? results.value : filteredPosts.value))

const totalPages = computed(() =>
  Math.max(1, Math.ceil(displayedPosts.value.length / POSTS_PER_PAGE))
)

const currentPage = computed(() => {
  const n = Number.parseInt(queryParam(route.query.page) || '1', 10)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.min(n, totalPages.value)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * POSTS_PER_PAGE
  return displayedPosts.value.slice(start, start + POSTS_PER_PAGE)
})

const resultsLabel = computed(() => {
  if (!isSearching.value) return ''
  const total = displayedPosts.value.length
  if (total === 0) return `Sin resultados para «${activeQuery.value}»`
  return total === 1
    ? `1 artículo para «${activeQuery.value}»`
    : `${total} artículos para «${activeQuery.value}»`
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | '...')[] = []
  const push = (v: number | '...') => pages.push(v)
  if (total <= 7) {
    for (let i = 1; i <= total; i++) push(i)
    return pages
  }
  push(1)
  if (current > 3) push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) push(i)
  if (current < total - 2) push('...')
  push(total)
  return pages
})

function pageLink(page: number) {
  const query: Record<string, string> = {}
  if (activeQuery.value) query.q = activeQuery.value
  if (page > 1) query.page = String(page)
  return { query }
}

async function goToPage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  await router.push(pageLink(page))
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/* --------------------------------- SEO --------------------------------- */

const pageTitleSuffix = computed(() =>
  currentPage.value > 1 ? ` - Página ${currentPage.value}` : ''
)

useSeoMeta({
  title: () => `Blog${pageTitleSuffix.value} - ${brandName.value}`,
  ogTitle: () => `Blog${pageTitleSuffix.value} - ${brandName.value}`,
  description: () => `Artículos y guías sobre ecommerce y tiendas virtuales en ${country.value.name}. Aprende a vender por internet con ${brandName.value}.`,
  ogDescription: () => `Artículos y guías sobre ecommerce y tiendas virtuales en ${country.value.name}.`,
  // Las páginas de resultados no aportan nada al índice y duplican contenido.
  robots: () => (isSearching.value ? 'noindex, follow' : 'all'),
})
</script>

<template>
  <div class="blog-page">
    <section class="blog-hero">
      <div class="container">
        <h1>Blog</h1>
        <p class="lead">
          Artículos y guías para hacer crecer tu negocio online en {{ country.name }}.
        </p>

        <form class="blog-search" role="search" @submit.prevent>
          <label class="visually-hidden" for="blog-search-input">Buscar en el blog</label>
          <svg class="blog-search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M11 4a7 7 0 1 0 4.19 12.6l3.6 3.6 1.42-1.42-3.6-3.6A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
              fill="currentColor"
            />
          </svg>
          <input
            id="blog-search-input"
            v-model="inputQuery"
            type="search"
            class="blog-search-input"
            placeholder="Buscar artículos: envíos, WhatsApp, facturación…"
            autocomplete="off"
            @focus="ensureIndex"
          />
          <button
            v-if="inputQuery"
            type="button"
            class="blog-search-clear"
            aria-label="Limpiar búsqueda"
            @click="clearSearch"
          >
            &times;
          </button>
        </form>

        <p v-if="resultsLabel" class="blog-search-summary" aria-live="polite">
          {{ resultsLabel }}
        </p>
      </div>
    </section>

    <section class="blog-listing">
      <div class="container">
        <div v-if="isLoadingIndex" class="blog-search-status">
          Buscando…
        </div>

        <div v-else class="row g-4">
          <div
            v-for="post in paginatedPosts"
            :key="post.path"
            class="col-md-6 col-lg-4"
          >
            <NuxtLink :to="post.path" class="blog-card-link">
              <article class="blog-card">
                <div v-if="post.image" class="blog-card-image">
                  <img :src="post.image" :alt="post.title" loading="lazy" />
                </div>
                <div class="blog-card-body">
                  <div class="blog-card-meta">
                    <time :datetime="post.date">
                      {{ new Date(post.date).toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                    </time>
                  </div>
                  <h2>{{ post.title }}</h2>
                  <p v-if="'snippet' in post && post.snippet" class="blog-card-snippet">
                    <template v-for="(part, i) in post.snippet" :key="i">
                      <mark v-if="part.match">{{ part.text }}</mark>
                      <template v-else>{{ part.text }}</template>
                    </template>
                  </p>
                  <p v-else>{{ post.description }}</p>
                  <div v-if="post.tags?.length" class="blog-card-tags">
                    <span v-for="tag in post.tags" :key="tag" class="blog-tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </article>
            </NuxtLink>
          </div>
        </div>

        <nav
          v-if="totalPages > 1 && !isLoadingIndex"
          class="blog-pagination"
          aria-label="Paginación del blog"
        >
          <NuxtLink
            :to="pageLink(currentPage - 1)"
            class="page-btn"
            :class="{ disabled: currentPage === 1 }"
            :aria-disabled="currentPage === 1"
            rel="prev"
            @click.prevent="goToPage(currentPage - 1)"
          >
            ← Anterior
          </NuxtLink>

          <template v-for="(p, idx) in pageNumbers" :key="idx">
            <span v-if="p === '...'" class="page-ellipsis">…</span>
            <NuxtLink
              v-else
              :to="pageLink(p)"
              class="page-btn"
              :class="{ active: p === currentPage }"
              :aria-current="p === currentPage ? 'page' : undefined"
              @click.prevent="goToPage(p)"
            >
              {{ p }}
            </NuxtLink>
          </template>

          <NuxtLink
            :to="pageLink(currentPage + 1)"
            class="page-btn"
            :class="{ disabled: currentPage === totalPages }"
            :aria-disabled="currentPage === totalPages"
            rel="next"
            @click.prevent="goToPage(currentPage + 1)"
          >
            Siguiente →
          </NuxtLink>
        </nav>

        <div v-if="!isLoadingIndex && displayedPosts.length === 0" class="blog-empty">
          <template v-if="isSearching">
            <p>No encontramos artículos que coincidan con «{{ activeQuery }}».</p>
            <button type="button" class="blog-empty-action" @click="clearSearch">
              Ver todos los artículos
            </button>
          </template>
          <p v-else class="text-muted">Próximamente publicaremos artículos para ti.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-hero {
  background: var(--text-dark);
  color: white;
  padding: 4rem 0 3rem;
  text-align: center;
}

.blog-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.blog-hero .lead {
  opacity: 0.85;
  max-width: 600px;
  margin: 0 auto;
}

.blog-search {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 520px;
  margin: 2rem auto 0;
}

.blog-search-icon {
  position: absolute;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-muted);
  pointer-events: none;
}

.blog-search-input {
  width: 100%;
  height: 3rem;
  padding: 0 2.75rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: white;
  color: var(--text-dark);
  font-size: 0.95rem;
  transition: box-shadow 0.15s, border-color 0.15s;
}

.blog-search-input::placeholder {
  color: var(--text-muted);
}

.blog-search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(0, 178, 166, 0.35);
}

/* Oculta la X nativa de Safari/Chrome: ya hay un botón propio. */
.blog-search-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.blog-search-clear {
  position: absolute;
  right: 0.65rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  border-radius: 50%;
  background: #f0faf9;
  color: var(--text-muted);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}

.blog-search-clear:hover {
  color: var(--primary-color);
}

.blog-search-summary {
  margin: 1rem 0 0;
  font-size: 0.9rem;
  opacity: 0.85;
}

.blog-listing {
  padding: 3rem 0 5rem;
}

.blog-search-status {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-muted);
}

.blog-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.blog-card-image {
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #f0f0f0;
}

.blog-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-card-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.blog-card-body h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.blog-card-body p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
  flex: 1;
}

.blog-card-snippet mark {
  background: #d8f4f1;
  color: var(--text-dark);
  padding: 0 0.1em;
  border-radius: 3px;
}

.blog-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;
}

.blog-tag {
  background: #f0faf9;
  color: var(--primary-color);
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-weight: 500;
}

.blog-empty {
  text-align: center;
  padding: 3rem 0;
}

.blog-empty p {
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.blog-empty-action {
  border: 1px solid var(--primary-color);
  background: white;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
}

.blog-empty-action:hover {
  background: var(--primary-color);
  color: white;
}

.blog-pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-top: 3rem;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.85rem;
  border-radius: 8px;
  background: white;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  border: 1px solid #e5e7eb;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.page-btn:hover:not(.disabled):not(.active) {
  background: #f0faf9;
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.page-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  pointer-events: none;
}

.page-btn.disabled {
  opacity: 0.45;
  pointer-events: none;
  cursor: default;
}

.page-ellipsis {
  padding: 0 0.4rem;
  color: var(--text-muted);
  user-select: none;
}
</style>
