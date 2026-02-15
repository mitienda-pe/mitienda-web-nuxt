export interface Alert {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  dismissible: boolean
  timeout?: number
}

export const useUiStore = defineStore('ui', () => {
  // State
  const isLoading = ref(false)
  const loadingMessage = ref<string | null>(null)
  const alerts = ref<Alert[]>([])
  const isMobileMenuOpen = ref(false)

  // Actions
  function setLoading(loading: boolean, message?: string) {
    isLoading.value = loading
    loadingMessage.value = message || null
  }

  function showAlert(
    type: Alert['type'],
    message: string,
    options: { dismissible?: boolean; timeout?: number } = {}
  ) {
    const id = `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const alert: Alert = {
      id,
      type,
      message,
      dismissible: options.dismissible ?? true,
      timeout: options.timeout
    }

    alerts.value.push(alert)

    if (alert.timeout) {
      setTimeout(() => {
        dismissAlert(id)
      }, alert.timeout)
    }

    return id
  }

  function showSuccess(message: string, timeout = 5000) {
    return showAlert('success', message, { timeout })
  }

  function showError(message: string, timeout = 8000) {
    return showAlert('error', message, { timeout })
  }

  function showWarning(message: string, timeout = 6000) {
    return showAlert('warning', message, { timeout })
  }

  function showInfo(message: string, timeout = 5000) {
    return showAlert('info', message, { timeout })
  }

  function dismissAlert(id: string) {
    const index = alerts.value.findIndex(a => a.id === id)
    if (index > -1) {
      alerts.value.splice(index, 1)
    }
  }

  function clearAlerts() {
    alerts.value = []
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  return {
    isLoading,
    loadingMessage,
    alerts,
    isMobileMenuOpen,
    setLoading,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissAlert,
    clearAlerts,
    toggleMobileMenu,
    closeMobileMenu
  }
})
