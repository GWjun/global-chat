import ky from 'ky'
import { BASE_URL, END_POINTS } from '@routes/path.ts'
import { session } from '#utils/auth.ts'
import APIError from '#apis/APIError.ts'

export const baseFetcher = ky.create({
  prefixUrl: BASE_URL,
  retry: {
    limit: 1,
    methods: ['get', 'post'],
    statusCodes: [403],
  },
  hooks: {
    beforeRetry: [
      async () => {
        const { accessToken } = await ky
          .post<{
            accessToken: string
          }>(`${BASE_URL}/${END_POINTS.AUTH}/refresh`)
          .json()

        session.login(accessToken)
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          if (response.status === 401) session.logout()
          throw (await response.json()) as APIError
        }

        return response
      },
    ],
  },
})

export const authFetcher = baseFetcher.extend({
  hooks: {
    beforeRequest: [
      (req) => {
        if (!session.isAuthenticated()) return
        req.headers.set('Authorization', `Bearer ${session.getToken()}`)
      },
    ],
  },
})
