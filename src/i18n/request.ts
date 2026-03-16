import { getRequestConfig } from 'next-intl/server'

const locales = ['uk', 'en']

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale)) {
    locale = 'uk'
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})