import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useNavigate } from 'react-router'
import { useAuthStore } from '#stores/authStore'

import Home from '.'
import { PATH } from '#routes/path.ts'

vi.mock('react-router')

describe('Home 페이지 UI 테스트', () => {
  test('제목과 설명이 렌더링된다', () => {
    render(<Home />)

    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('description')).toBeInTheDocument()
  })

  test('기능 카드의 제목과 설명이 렌더링된다', () => {
    render(<Home />)

    expect(screen.getByText('first.title')).toBeInTheDocument()
    expect(screen.getByText('second.title')).toBeInTheDocument()
    expect(screen.getByText('third.title')).toBeInTheDocument()
  })

  test('로그인 버튼과 랜덤 채팅 버튼이 렌더링된다', () => {
    render(<Home />)

    expect(screen.getByText('login')).toBeInTheDocument()
    expect(screen.getByText('randomChat')).toBeInTheDocument()
  })
})

describe('Home 페이지 기능 테스트', () => {
  let mockNavigate: ReturnType<typeof useNavigate>

  beforeEach(() => {
    mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    useAuthStore.setState({ isAuthenticated: false })
  })

  test('인증 상태가 false일 때 리다이렉트하지 않는다', () => {
    render(<Home />)

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('로그인 버튼을 클릭하면 로그인 페이지로 이동한다', async () => {
    const user = userEvent.setup()

    render(<Home />)
    await user.click(screen.getByText('login'))

    expect(mockNavigate).toHaveBeenCalledWith(PATH.LOGIN)
  })
})
