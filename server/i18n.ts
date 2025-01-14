import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { LanguageDetector } from 'i18next-http-middleware'
import path from 'path'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    // debug: true,
    preload: ['en', 'ko', 'ja', 'zh'],
    fallbackLng: 'en',
    ns: ['common', 'error', 'home', 'login', 'register', 'profile'],
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
