import { describe, it, expect, beforeEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { useAuthStore } from '#stores/authStore.ts'

import VisitorLayout from './VisitorLayout'
import { PATH } from '#routes/path.ts'

describe('VisitorLayout 컴포넌트 테스트', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthenticated: false })
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route element={<VisitorLayout />}>
            <Route
              path={'/login'}
              element={<div data-testid="test-login-page" />}
            />
          </Route>
          <Route
            path={PATH.CHAT}
            element={<div data-testid="test-chat-page" />}
          />
        </Routes>
      </MemoryRouter>,
    )
  })

  it('인증된 상태에서는 채팅 페이지로 리다이렉트 된다', async () => {
    act(() => {
      useAuthStore.setState({ isAuthenticated: true })
    })

    expect(screen.getByTestId('test-chat-page')).toBeInTheDocument()
  })

  it('인증되지 않은 상태에서는 Outlet이 올바르게 렌더링된다', () => {
    expect(screen.getByTestId('test-login-page')).toBeInTheDocument()
  })
})
