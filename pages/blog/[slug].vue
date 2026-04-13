<script setup lang="ts">
const { country, countryCode, brandName } = useCountry()
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blog')
    .path(`/blog/${route.params.slug}`)
    .first()
)

if (!post.value || !post.value.countries.includes(countryCode.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
}

useSeoMeta({
  title: () => `${post.value?.title} - ${brandName.value}`,
  ogTitle: () => `${post.value?.title} - ${brandName.value}`,
  description: () => post.value?.description || '',
  ogDescription: () => post.value?.description || '',
  ogType: 'article',
  ogImage: () => post.value?.image || '/img/og-image-2.jpg',
  articlePublishedTime: () => post.value?.date,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value?.title,
        description: post.value?.description,
        image: post.value?.image ? `https://${country.value.landingDomain}${post.value.image}` : undefined,
        datePublished: post.value?.date,
        author: {
          '@type': 'Organization',
          name: brandName.value,
          url: `https://${country.value.landingDomain}`,
        },
        publisher: {
          '@type': 'Organization',
          name: country.value.legalEntity,
        },
      }),
    },
  ],
})
</script>

<template>
  <div class="blog-post-page" v-if="post">
    <section class="blog-post-hero">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <NuxtLink to="/blog" class="back-link">&larr; Volver al blog</NuxtLink>
            <h1>{{ post.title }}</h1>
            <div class="blog-post-meta">
              <time :datetime="post.date">
                {{ new Date(post.date).toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </time>
              <span v-if="post.author" class="author">por {{ post.author }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <article class="blog-post-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div v-if="post.image" class="blog-post-image">
              <img :src="post.image" :alt="post.title" />
            </div>
            <div class="prose">
              <ContentRenderer :value="post" />
            </div>
            <div v-if="post.tags?.length" class="blog-post-tags">
              <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </article>

    <section class="blog-cta">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2>¿Listo para crear tu tienda virtual?</h2>
            <p>Prueba {{ brandName }} gratis por 14 días. Sin tarjeta de crédito.</p>
            <NuxtLink to="/registro-v2" class="btn btn-primary btn-lg">
              Empezar Gratis
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-post-hero {
  background: var(--text-dark);
  color: white;
  padding: 3rem 0 2.5rem;
}

.back-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: white;
}

.blog-post-hero h1 {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.blog-post-meta {
  font-size: 0.9rem;
  opacity: 0.75;
  display: flex;
  gap: 1rem;
}

.blog-post-content {
  padding: 3rem 0;
}

.blog-post-image {
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.blog-post-image img {
  width: 100%;
  height: auto;
}

.prose {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-dark);
}

.prose :deep(h1) {
  display: none;
}

.prose :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.prose :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
}

.prose :deep(p) {
  margin-bottom: 1.25rem;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(strong) {
  font-weight: 600;
  color: var(--text-dark);
}

.prose :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  color: var(--text-muted);
  font-style: italic;
}

.prose :deep(a) {
  color: var(--primary-color);
  text-decoration: underline;
}

.prose :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.blog-post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}

.blog-tag {
  background: #f0faf9;
  color: var(--primary-color);
  font-size: 0.8rem;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.blog-cta {
  background: var(--primary-color);
  color: white;
  padding: 3rem 0;
  margin-top: 2rem;
}

.blog-cta h2 {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.blog-cta p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.blog-cta .btn-primary {
  background: white;
  color: var(--primary-color);
  border-color: white;
  font-weight: 600;
}

.blog-cta .btn-primary:hover {
  background: #f0faf9;
  border-color: #f0faf9;
}
</style>
