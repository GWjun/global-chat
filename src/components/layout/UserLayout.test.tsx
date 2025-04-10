import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { useAuthStore } from '#stores/authStore'

import UserLayout from './UserLayout.tsx'
import { PATH } from '#routes/path.ts'

describe('UserLayout 컴포넌트 테스트', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthenticated: true })
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <Routes>
          <Route element={<UserLayout />}>
            <Route
              path={'/chat'}
              element={<div data-testid="test-chat-page" />}
            />
          </Route>
          <Route
            path={PATH.LOGIN}
            element={<div data-testid="test-login-page" />}
          />
        </Routes>
      </MemoryRouter>,
    )
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
