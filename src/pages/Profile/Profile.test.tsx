import { describe, test, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProvider } from '&/testutil/renderWithProvider.tsx'

import { LANGUAGES } from '#constants/languages.ts'
import { PATH } from '#routes/path.ts'

describe('Profile 페이지 UI 테스트', () => {
  beforeEach(async () => {
    await renderWithProvider(PATH.PROFILE)
  })

  test('프로필 정보가 렌더링된다', async () => {
    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  test('언어 설정 버튼 클릭 시 모달이 열린다', async () => {
    await userEvent.click(
      screen.getByRole('button', { name: 'languageSetting' }),
    )

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())
  })

  test('모달 내부에 국가별 언어 옵션이 렌더링된다', async () => {
    await userEvent.click(
      screen.getByRole('button', { name: 'languageSetting' }),
    )

    await waitFor(() =>
      LANGUAGES.forEach((lng) =>
        expect(screen.getByText(lng.language)).toBeInTheDocument(),
      ),
    )
  })
})
