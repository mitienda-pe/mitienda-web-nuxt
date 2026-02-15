export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  setTimeout(() => {
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'page_view', {
        page_path: to.fullPath,
        page_title: document.title
      })
    }
  }, 100)
})
