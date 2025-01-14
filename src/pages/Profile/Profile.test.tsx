import { describe, test, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithProvider from '&/test/util/renderWithProvider.tsx'
import Profile from '.'

import { LANGUAGES } from '#constants/languages.ts'

describe('Profile 페이지 UI 테스트', () => {
  beforeEach(() => {
    renderWithProvider(<Profile />)
  })

  test('로딩 중에는 스켈레톤 UI가 표시된다', () => {
    expect(screen.getAllByRole('status')).toHaveLength(2)
  })

  test('로딩 완료 후 프로필 정보가 렌더링된다', async () => {
    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument()
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })
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
