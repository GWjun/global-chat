import type { LoginDto, RegisterDto } from '@dto/auth.ts'
import { http } from 'msw'
import { BASE_URL, END_POINTS } from '@routes/path.ts'

import { getErrorResponse, mswResponse } from '../mswResponse'
import { getUsers } from '../fixtures/auth'

interface AuthResponse {
  accessToken: string
}

export const authHandlers = [
  http.post<LoginDto>(
    `${BASE_URL}/${END_POINTS.AUTH}/login`,
    async ({ request }) => {
      const { email, password } = (await request.json()) as LoginDto
      const users = getUsers()

      const user = users.find((user) => {
        return user.email === email && user.password === password
      })

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
    },
  ),

  http.post<RegisterDto>(
    `${BASE_URL}/${END_POINTS.AUTH}/register`,
    async ({ request }) => {
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
    },
  ),

  http.post(`${BASE_URL}/${END_POINTS.AUTH}/refresh`, () => {
    return mswResponse({
      status: 200,
      body: {
        accessToken: 'new-mock-access-token',
      },
    })
  }),

  http.post(`${BASE_URL}/${END_POINTS.AUTH}/logout`, () => {
    return mswResponse({
      status: 200,
      body: {
        message: 'Logged out successfully',
      },
    })
  }),
]

export default authHandlers
