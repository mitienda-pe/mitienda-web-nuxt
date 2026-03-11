// Analytics composable for Google Analytics 4 and Facebook Pixel

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function useAnalytics() {
  const { currency: countryCurrency } = useCountry()

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (!import.meta.client) return
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle
      })
    }
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView')
    }
  }

  const trackRegistrationStart = () => {
    if (!import.meta.client) return
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'begin_checkout', {
        currency: countryCurrency.value.code,
        value: 0,
        items: [{ item_name: 'Free Trial', item_category: 'Subscription' }]
      })
    }
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout')
    }
  }

  const trackRegistrationStep2 = (storeName: string, category: string) => {
    if (!import.meta.client) return
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'add_payment_info', {
        currency: countryCurrency.value.code,
        value: 0,
        items: [{
          item_name: storeName,
          item_category: category
        }]
      })
    }
  }

  const trackRegistrationComplete = (tiendaUrl?: string) => {
    if (!import.meta.client) return
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'sign_up', {
        method: 'form',
        event_category: 'registration',
        event_label: 'free_trial_completed'
      })
      window.gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXX/XXXXXXXXXXXXXXXX',
        value: 0,
        currency: countryCurrency.value.code
      })
    }
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'CompleteRegistration', {
        content_name: tiendaUrl || 'Free Trial',
        status: 'completed'
      })
      window.fbq('track', 'StartTrial', {
        value: 0,
        currency: countryCurrency.value.code,
        predicted_ltv: 99
      })
    }
  }

  const trackFormSubmit = (formName: string) => {
    if (!import.meta.client) return
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'form_submit', {
        form_name: formName
      })
    }
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Lead', {
        content_name: formName
      })
    }
  }

  const trackComplaintSubmit = () => {
    if (!import.meta.client) return
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'form_submit', {
        form_name: 'libro_reclamaciones',
        event_category: 'complaints'
      })
    }
  }

  const trackCtaClick = (ctaName: string, ctaLocation: string) => {
    if (!import.meta.client) return
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'cta_click', {
        cta_name: ctaName,
        cta_location: ctaLocation
      })
    }
  }

  const trackPricingView = (planName: string, price: number) => {
    if (!import.meta.client) return
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'view_item', {
        currency: countryCurrency.value.code,
        value: price,
        items: [{
          item_name: planName,
          item_category: 'Subscription',
          price: price,
          quantity: 1
        }]
      })
    }
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'ViewContent', {
        content_name: planName,
        content_type: 'product',
        value: price,
        currency: countryCurrency.value.code
      })
    }
  }

  return {
    trackPageView,
    trackRegistrationStart,
    trackRegistrationStep2,
    trackRegistrationComplete,
    trackFormSubmit,
    trackComplaintSubmit,
    trackCtaClick,
    trackPricingView
  }
}
