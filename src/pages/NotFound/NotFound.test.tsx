import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useNavigate } from 'react-router'
import NotFound from '.'

vi.mock('react-router')

describe('NotFound 페이지 UI 테스트', () => {
  test('404 제목이 렌더링된다', () => {
    render(<NotFound />)

    expect(screen.getByText('notfound.title')).toBeInTheDocument()
  })

  test('뒤로가기 버튼이 렌더링된다', () => {
    render(<NotFound />)

    expect(screen.getByText('notfound.action')).toBeInTheDocument()
  })
})

describe('NotFound 페이지 기능 테스트', () => {
  let mockNavigate: ReturnType<typeof useNavigate>

  beforeEach(() => {
    mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  test('뒤로가기 버튼 클릭 시 이전 페이지로 이동한다', async () => {
    const user = userEvent.setup()

    render(<NotFound />)
    await user.click(screen.getByText('notfound.action'))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
