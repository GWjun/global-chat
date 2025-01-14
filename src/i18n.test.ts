import i18next from './i18n'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { waitFor } from '@testing-library/react'

i18next.init({
  resources: {
    en: {
      common: {},
    },
  },
})

describe('i18next 테스트', () => {
  beforeEach(() => {
    document.cookie = 'i18nextLng=; path=/;'
    vi.restoreAllMocks()
  })

  it('changeLanguageCookie를 호출하면 언어를 변경하고 쿠키를 설정한다', async () => {
    const lng = 'ko'
    i18next.changeLanguageCookie(lng)

    await waitFor(() => expect(i18next.language).toBe(lng))

    expect(document.cookie).toContain(`i18nextLng=${lng}`)
  })
})
