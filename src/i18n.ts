import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

i18next.changeLanguageCookie = async function (lng: string) {
  await i18next.changeLanguage(lng)

  const cookieOptions = [`i18nextLng=${lng}`, 'path=/']
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.push('secure')
  }

  document.cookie = cookieOptions.join(';')
}

export default i18next
