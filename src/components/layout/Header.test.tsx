import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Header from './Header'

describe('Header 컴포넌트 테스트', () => {
  it('헤더가 올바르게 렌더링된다', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('Bell 아이콘이 표시된다', () => {
    render(<Header />)

    const bellIcon = screen.getByLabelText('bell icon')
    expect(bellIcon).toBeInTheDocument()
  })
})
