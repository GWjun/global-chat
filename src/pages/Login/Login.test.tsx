import { describe, test, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  getCurrentPathname,
  renderWithProvider,
} from '&/test/util/renderWithProvider.tsx'
import { PATH } from '#routes/path.ts'
import { useAuthStore } from '#stores/authStore.ts'

vi.mock('#hooks/useInitToken.ts')

describe('Login 페이지 UI 테스트', () => {
  test('로그인 폼이 렌더링된다', async () => {
    await renderWithProvider(PATH.LOGIN)

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'register' })).toBeInTheDocument()
  })
})

describe('Login 페이지 기능 테스트', () => {
  const user = userEvent.setup()
  beforeEach(async () => {
    useAuthStore.setState({ isAuthenticated: false })
    await renderWithProvider(PATH.LOGIN)
  })

  test('이메일과 비밀번호를 입력하지 않고 로그인 버튼을 클릭하면 에러 메시지가 표시된다', async () => {
    await user.click(screen.getByRole('button', { name: 'login' }))

    expect(screen.getByText('schema.email')).toBeInTheDocument()
    expect(screen.getByText('schema.password')).toBeInTheDocument()
  })

  test('로그인 성공시 chat 페이지로 이동한다', async () => {
    await user.type(screen.getByPlaceholderText('email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('password'), 'password1234')
    await user.click(screen.getByRole('button', { name: 'login' }))

    await waitFor(() => {
      expect(getCurrentPathname()).toBe(PATH.CHAT)
    })
  })

  test('로그인 실패 시 에러 토스트가 표시된다', async () => {
    await user.type(screen.getByPlaceholderText('email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('password'), 'wrong-password')
    await user.click(screen.getByRole('button', { name: 'login' }))

    await waitFor(() => {
      expect(screen.getByText('fail')).toBeInTheDocument()
    })
  })

  test('register 버튼을 클릭하면 register 페이지로 이동한다', async () => {
    await user.click(screen.getByRole('button', { name: 'register' }))

    expect(getCurrentPathname()).toBe(PATH.REGISTER)
  })
})
