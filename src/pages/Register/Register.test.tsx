import { describe, test, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithProvider from '&/test/util/renderWithProvider.tsx'
import getErrorCode from '&/test/util/getErrorCode.ts'
import Register from '.'

import { useNavigate } from 'react-router'
import { PATH } from '#routes'

vi.mock('react-router')

describe('Register 페이지 UI 테스트', () => {
  test('회원가입 폼이 렌더링된다', () => {
    renderWithProvider(<Register />)

    expect(screen.getByPlaceholderText('nickname')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('confirmPassword')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'submit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument()
  })
})

describe('Register 페이지 기능 테스트', () => {
  let mockNavigate: ReturnType<typeof useNavigate>

  beforeEach(() => {
    mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  test('필수 입력값을 입력하지 않고 회원가입 버튼을 클릭하면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup()

    renderWithProvider(<Register />)
    await user.click(screen.getByRole('button', { name: 'submit' }))

    expect(screen.getByText('schema.nickname')).toBeInTheDocument()
    expect(screen.getByText('schema.email')).toBeInTheDocument()
    expect(screen.getByText('schema.password')).toBeInTheDocument()
    expect(screen.getByText('schema.confirmPassword')).toBeInTheDocument()
  })

  test('회원가입 성공시 성공 토스트가 표시되며 chat 페이지로 이동한다', async () => {
    const user = userEvent.setup()

    renderWithProvider(<Register />)
    await user.type(screen.getByPlaceholderText('nickname'), 'Test User')
    await user.type(screen.getByPlaceholderText('email'), 'new@example.com')
    await user.type(screen.getByPlaceholderText('password'), 'password1234')
    await user.type(
      screen.getByPlaceholderText('confirmPassword'),
      'password1234',
    )
    await user.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(screen.getByText('success')).toBeInTheDocument()
      expect(mockNavigate).toHaveBeenCalledWith(PATH.chat, { replace: true })
    })
  })

  test('이미 존재하는 이메일일 시 에러 토스트가 표시된다', async () => {
    const user = userEvent.setup()

    renderWithProvider(<Register />)
    await user.type(screen.getByPlaceholderText('nickname'), 'Test User')
    await user.type(screen.getByPlaceholderText('email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('password'), 'password1234')
    await user.type(
      screen.getByPlaceholderText('confirmPassword'),
      'password1234',
    )
    await user.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(
        screen.getByText(getErrorCode('EMAIL_ALREADY_EXIST')),
      ).toBeInTheDocument()
    })
  })
})
