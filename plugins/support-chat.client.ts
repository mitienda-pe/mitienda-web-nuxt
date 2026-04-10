/**
 * Client-only plugin: Loads the MiTienda support chat widget
 * on the landing page (mode: support).
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseUrl = (config.public.chatWidgetUrl as string || '').replace(/\/+$/, '')
  if (!baseUrl) return

  // Avoid loading twice
  if (document.querySelector('script[data-mitienda-chat]')) return

  // Load CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `${baseUrl}/mitienda-chat.css`
  document.head.appendChild(link)

  // Load JS with widget config
  const script = document.createElement('script')
  script.async = true
  script.src = `${baseUrl}/mitienda-chat.iife.js`
  script.dataset.mode = 'support'
  script.dataset.botName = 'Soporte MiTienda'
  script.dataset.mitiendaChat = 'true'
  document.body.appendChild(script)
})
