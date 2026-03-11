export default defineNuxtRouteMiddleware(() => {
  const { isPeru } = useCountry()
  if (!isPeru.value) {
    return navigateTo('/', { redirectCode: 301 })
  }
})
