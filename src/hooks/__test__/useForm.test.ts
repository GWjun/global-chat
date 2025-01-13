import { describe, test, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useForm from '../useForm'

import type { FormEvent } from 'react'
import { z } from 'zod'

describe('useForm 훅 테스트', () => {
  const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
  })

  test('유효한 데이터가 전달될 시 onSubmit이 호출된다', async () => {
    const mockSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm({
        onSubmit: mockSubmit,
        schema,
      }),
    )

    const form = document.createElement('form')
    form.innerHTML = `
      <input name="email" value="test@example.com" />
      <input name="password" value="password123" />
    `
    result.current.formRef.current = form

    await act(async () => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as FormEvent)
    })

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  test('유효하지 않은 데이터가 전달될 시 오류를 설정한다', async () => {
    const mockSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm({
        onSubmit: mockSubmit,
        schema,
      }),
    )

    const form = document.createElement('form')
    form.innerHTML = `
      <input name="email" value="invalid" />
      <input name="password" value="short" />
    `
    result.current.formRef.current = form

    await act(async () => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as FormEvent)
    })

    expect(result.current.errors).toEqual({
      email: 'Invalid email',
      password: 'Password must contain at least 8 characters',
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })
})
