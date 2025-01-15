import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { PATH } from '#routes.tsx'

import Footer from './Footer'

describe('Footer 컴포넌트 테스트', () => {
  const setup = (pathname: string) => {
    return render(
      <MemoryRouter initialEntries={[pathname]}>
        <Footer pathname={pathname} />
      </MemoryRouter>,
    )
  }

  it('친구, 채팅, 프로필 링크가 올바르게 렌더링된다', () => {
    setup(PATH.chat)

    expect(
      screen.getByRole('link', { name: 'footer.friend' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'footer.chat' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'footer.profile' }),
    ).toBeInTheDocument()
  })

  it('현재 경로에 따라 활성 링크 스타일이 적용된다', () => {
    const { container } = setup(PATH.friend)

    const activeLink = container.querySelector('a[href="/friend"]')

    expect(activeLink).toHaveClass('text-foreground')
  })
})
