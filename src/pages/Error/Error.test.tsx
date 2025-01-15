import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Error from '.'

vi.mock('react-router')

describe('Error 페이지 UI 테스트', () => {
  test('에러 제목이 렌더링된다', () => {
    render(<Error />)

    expect(screen.getByText('error.title')).toBeInTheDocument()
  })

  test('새로고침 버튼이 렌더링된다', () => {
    render(<Error />)

    expect(screen.getByText('error.action')).toBeInTheDocument()
  })
})

describe('Error 페이지 기능 테스트', () => {
  test('새로고침 버튼 클릭 시 페이지가 새로고침 된다.', async () => {
    const user = userEvent.setup()
    const reloadMock = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
    })

    render(<Error />)
    await user.click(screen.getByText('error.action'))

    expect(reloadMock).toHaveBeenCalledTimes(1)
  })
})
