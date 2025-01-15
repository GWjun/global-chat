import { describe, test, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithProvider from '&/test/util/renderWithProvider.tsx'

import { useNavigate } from 'react-router'
import { PATH } from '#routes'

import Login from '.'

vi.mock('react-router')

describe('Login 페이지 UI 테스트', () => {
  test('로그인 폼이 렌더링된다', () => {
    renderWithProvider(<Login />)

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'register' })).toBeInTheDocument()
  })
})

describe('Login 페이지 기능 테스트', () => {
  let mockNavigate: ReturnType<typeof useNavigate>

  beforeEach(() => {
    mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  test('이메일과 비밀번호를 입력하지 않고 로그인 버튼을 클릭하면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup()

    renderWithProvider(<Login />)
    await user.click(screen.getByRole('button', { name: 'login' }))

    expect(screen.getByText('schema.email')).toBeInTheDocument()
    expect(screen.getByText('schema.password')).toBeInTheDocument()
  })

  test('로그인 성공시 chat 페이지로 이동한다', async () => {
    const user = userEvent.setup()

    renderWithProvider(<Login />)
    await user.type(screen.getByPlaceholderText('email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('password'), 'password1234')
    await user.click(screen.getByRole('button', { name: 'login' }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(PATH.chat, { replace: true })
    })
  })

  test('로그인 실패 시 에러 토스트가 표시된다', async () => {
    const user = userEvent.setup()

    renderWithProvider(<Login />)
    await user.type(screen.getByPlaceholderText('email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('password'), 'wrong-password')
    await user.click(screen.getByRole('button', { name: 'login' }))

    await waitFor(() => {
      expect(screen.getByText('fail')).toBeInTheDocument()
    })
  })

  test('register 버튼을 클릭하면 register 페이지로 이동한다', async () => {
    const user = userEvent.setup()

    renderWithProvider(<Login />)
    await user.click(screen.getByRole('button', { name: 'register' }))

    expect(mockNavigate).toHaveBeenCalledWith(PATH.register)
  })
})
