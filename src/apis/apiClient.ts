import ky from 'ky'
import { BASE_URL, END_POINTS } from '@routes/path.ts'
import { session } from '#utils/auth.ts'

export const baseFetcher = ky.create({
  prefixUrl: BASE_URL,
  retry: {
    methods: ['get', 'post'],
    statusCodes: [401],
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
