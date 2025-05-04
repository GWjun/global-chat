import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18N_APP_NAMESPACES } from '@i18nNamespaces.ts'

// load 'common' and the current route's namespace during initial render
i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: 'en',
    ns: ['error'],
    defaultNS: 'error', // to avoid 'translation' invalid namespace loading
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

i18next.loadNamespaces(I18N_APP_NAMESPACES) // preload remaining 'app' namespaces afterward

i18next.changeLanguageCookie = async function (lng: string) {
  await i18next.changeLanguage(lng)

  const cookieOptions = [`i18nextLng=${lng}`, 'path=/']
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.push('secure')
  }

  document.cookie = cookieOptions.join(';')
}

export default i18next
