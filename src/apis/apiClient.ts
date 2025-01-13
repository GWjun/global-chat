import ky from 'ky'
import APIError from '#apis/APIError.ts'
import { useAuthStore } from '#stores/authStore.ts'
import { API_URL, END_POINTS } from '@routes/path.ts'

const { accessToken, setAccessToken, logout } = useAuthStore.getState()

export const baseFetcher = ky.create({
  prefixUrl: API_URL,
  retry: {
    limit: 1,
    statusCodes: [403],
  },
  hooks: {
    beforeRetry: [
      async () => {
        const { accessToken } = await ky
          .post<{
            accessToken: string
          }>(`${API_URL}/${END_POINTS.AUTH}/refresh`)
          .json()

        setAccessToken(accessToken)
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          if (response.status === 401 && accessToken) logout()
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
        if (!accessToken) return

        req.headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
  },
})
