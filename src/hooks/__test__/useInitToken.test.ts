import { describe, test, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useInitToken } from '../useInitToken'

import { useAuthStore } from '#stores/authStore'
import { BASE_URL, END_POINTS } from '@routes/path.ts'

import { http } from 'msw'
import { mswServer } from '&/mock/mswServer.ts'
import { getErrorResponse, mswResponse } from '&/mock/mswResponse.ts'

describe('useInitToken 훅 테스트', () => {
  beforeEach(() => {
    useAuthStore.setState({ setAccessToken: vi.fn() })
  })

  test('refresh 요청이 성공하면 accessToken을 초기화하고 isPending을 false로 설정한다', async () => {
    const { result } = renderHook(() => useInitToken())

    expect(result.current.isPending).toBe(true)
    await waitFor(() => expect(result.current.isPending).toBe(false))
    expect(useAuthStore.getState().setAccessToken).toHaveBeenCalledWith(
      'new-mock-access-token',
    )
  })

  test('refresh 요청이 실해하면 accessToken을 초기화하지 않고 isPending을 false로 설정한다', async () => {
    mswServer.use(
      http.post(`${BASE_URL}/${END_POINTS.AUTH}/refresh`, () => {
        return mswResponse({
          status: 400,
          error: getErrorResponse('INVALID_REQUEST'),
        })
      }),
    )

    const { result } = renderHook(() => useInitToken())

    expect(result.current.isPending).toBe(true)
    await waitFor(() => expect(result.current.isPending).toBe(false))
    expect(useAuthStore.getState().setAccessToken).not.toHaveBeenCalled()
  })
})
