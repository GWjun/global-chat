import { http } from 'msw'
import type { LoginDto, RegisterDto } from '@dto/auth.ts'
import { getErrorResponse, mswResponse } from '../mswResponse'
import { getUsers } from '../fixtures/auth'

interface AuthResponse {
  accessToken: string
}

export const authHandlers = [
  http.post<RegisterDto>('/api/auth/register', async ({ request }) => {
    const { email } = (await request.json()) as RegisterDto
    const users = getUsers()

    if (users.some((user) => user.email === email)) {
      return mswResponse({
        status: 400,
        error: getErrorResponse('EMAIL_ALREADY_EXIST'),
      })
    }

    return mswResponse<AuthResponse>({
      status: 200,
      body: {
        accessToken: 'mock-access-token',
      },
    })
  }),

  http.post<LoginDto>('/api/auth/login', async ({ request }) => {
    const { email } = (await request.json()) as LoginDto
    const users = getUsers()

    const user = users.find((user) => user.email === email)

    if (!user) {
      return mswResponse({
        status: 401,
        error: getErrorResponse('UNAUTHORIZED'),
      })
    }

    return mswResponse<AuthResponse>({
      status: 200,
      body: {
        accessToken: 'mock-access-token',
      },
    })
  }),

  http.post('/api/auth/refresh', () => {
    return mswResponse({
      status: 200,
      body: {
        accessToken: 'new-mock-access-token',
      },
    })
  }),

  http.post('/api/auth/logout', () => {
    return mswResponse({
      status: 200,
      body: {
        message: 'Logged out successfully',
      },
    })
  }),
]

export default authHandlers
