export default defineNuxtPlugin(() => {
  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css',
      },
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js',
        defer: true,
      },
      {
        src: '/js/cookieconsent-config.js',
        defer: true,
      },
    ],
  })
})
