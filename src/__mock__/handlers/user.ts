import { http } from 'msw'
import { BASE_URL, END_POINTS } from '@routes/path.ts'

import type { UserResponse } from '#apis/types/user.ts'
import { mswResponse } from '../mswResponse'
import { getUsers } from '../fixtures/auth'

export const userHandlers = [
  http.get(`${BASE_URL}/${END_POINTS.USER}/profile`, async () => {
    const users = getUsers()

    return mswResponse<UserResponse>({
      status: 200,
      body: {
        id: users[0].id,
        email: users[0].email,
        nickname: users[0].nickname,
        language: users[0].language,
      },
    })
  }),
]

export default userHandlers
