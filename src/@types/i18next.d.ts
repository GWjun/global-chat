import 'i18next'

declare module 'i18next' {
  interface i18n {
    /**
     * Changes the language and set cookies the change.
     * @param lng - The language code to switch to.
     */
    changeLanguageCookie(lng: string): void
  }
}
