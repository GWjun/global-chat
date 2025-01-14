import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { mswServer } from '&/mock/mswServer'

beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: 'error' })
})
afterEach(() => {
  cleanup()
  mswServer.resetHandlers()
})
afterAll(() => mswServer.close())

afterEach(() => {})

/**
 * global mock
 */

vi.mock('zustand')

export const changeLanguageCookieMock = vi.fn()
vi.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (i18nKey: string) => i18nKey,
      i18n: {
        changeLanguage: vi.fn(),
        changeLanguageCookie: changeLanguageCookieMock,
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))
