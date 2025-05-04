import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { LanguageDetector } from 'i18next-http-middleware'
import path from 'path'
import { I18N_APP_NAMESPACES } from './i18nNamespaces'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    // debug: true,
    preload: ['en', 'ko', 'ja', 'zh'],
    fallbackLng: 'en',
    ns: ['common', 'error', ...I18N_APP_NAMESPACES],
    defaultNS: 'error',
    backend: {
      loadPath: path.join(__dirname, '../public/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(
        __dirname,
        '../public/locales/{{lng}}/{{ns}}.missing.json',
      ),
    },
  })

export default i18next
