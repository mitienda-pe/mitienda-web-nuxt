// Captura ?programa= en cualquier página (enlace o QR de un convenio).
export default defineNuxtRouteMiddleware((to) => {
  if (to.query.programa) {
    useProgram().capture(to.query.programa)
  }
})
