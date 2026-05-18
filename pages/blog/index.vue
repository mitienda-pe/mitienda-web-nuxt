<script setup lang="ts">
const { country, countryCode, brandName } = useCountry()
const route = useRoute()
const router = useRouter()

const POSTS_PER_PAGE = 12

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

const filteredPosts = computed(() =>
  posts.value?.filter(post => post.countries.includes(countryCode.value)) || []
)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredPosts.value.length / POSTS_PER_PAGE))
)

const currentPage = computed(() => {
  const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const n = Number.parseInt(String(raw ?? '1'), 10)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.min(n, totalPages.value)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * POSTS_PER_PAGE
  return filteredPosts.value.slice(start, start + POSTS_PER_PAGE)
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
  return page === 1 ? { query: {} } : { query: { page: String(page) } }
}

async function goToPage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  await router.push(pageLink(page))
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const pageTitleSuffix = computed(() =>
  currentPage.value > 1 ? ` - Página ${currentPage.value}` : ''
)

useSeoMeta({
  title: () => `Blog${pageTitleSuffix.value} - ${brandName.value}`,
  ogTitle: () => `Blog${pageTitleSuffix.value} - ${brandName.value}`,
  description: () => `Artículos y guías sobre ecommerce y tiendas virtuales en ${country.value.name}. Aprende a vender por internet con ${brandName.value}.`,
  ogDescription: () => `Artículos y guías sobre ecommerce y tiendas virtuales en ${country.value.name}.`,
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
      </div>
    </section>

    <section class="blog-listing">
      <div class="container">
        <div class="row g-4">
          <div
            v-for="post in paginatedPosts"
            :key="post._id"
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
                  <p>{{ post.description }}</p>
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
          v-if="totalPages > 1"
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

        <div v-if="filteredPosts.length === 0" class="text-center py-5">
          <p class="text-muted">Próximamente publicaremos artículos para ti.</p>
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

.blog-listing {
  padding: 3rem 0 5rem;
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
