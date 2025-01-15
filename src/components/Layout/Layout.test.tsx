import { describe, it, expect, beforeEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { useAuthStore } from '#stores/authStore'
import { PATH } from '#routes.tsx'

import Layout from './index'

describe('Layout 컴포넌트 테스트', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthenticated: true })
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={'/chat'}
              element={<div data-testid="test-chat-page" />}
            />
          </Route>
          <Route
            path={PATH.login}
            element={<div data-testid="test-login-page" />}
          />
        </Routes>
      </MemoryRouter>,
    )
  })

  it('인증되지 않은 상태에서 로그인 페이지로 리다이렉트 된다', async () => {
    act(() => {
      useAuthStore.setState({ isAuthenticated: false })
    })

    expect(screen.getByTestId('test-login-page')).toBeInTheDocument()
  })

  it('Header와 Footer가 올바르게 렌더링된다', () => {
    const header = screen.getByRole('banner')
    const footer = screen.getByRole('contentinfo')
    expect(header).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })

  it('Outlet이 올바르게 렌더링된다', () => {
    expect(screen.getByTestId('test-chat-page')).toBeInTheDocument()
  })
})
