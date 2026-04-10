<script setup lang="ts">
const { country, countryCode, brandName } = useCountry()

useSeoMeta({
  title: () => `Blog - ${brandName.value}`,
  ogTitle: () => `Blog - ${brandName.value}`,
  description: () => `Artículos y guías sobre ecommerce y tiendas virtuales en ${country.value.name}. Aprende a vender por internet con ${brandName.value}.`,
  ogDescription: () => `Artículos y guías sobre ecommerce y tiendas virtuales en ${country.value.name}.`,
})

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

const filteredPosts = computed(() =>
  posts.value?.filter(post => post.countries.includes(countryCode.value)) || []
)
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
            v-for="post in filteredPosts"
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
</style>
