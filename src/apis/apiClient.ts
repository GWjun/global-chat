import ky from 'ky'
import APIError from '#apis/APIError.ts'
import { useAuthStore } from '#stores/authStore.ts'
import { API_URL, END_POINTS } from '@routes/path.ts'

let refreshTokenPromise: Promise<string> | null = null

async function refreshToken() {
  const { setAccessToken } = useAuthStore.getState()

  try {
    const { accessToken } = await ky
      .post<{
        accessToken: string
      }>(`${API_URL}/${END_POINTS.AUTH}/refresh`)
      .json()

    setAccessToken(accessToken)
    return accessToken
  } finally {
    refreshTokenPromise = null
  }
}

export const baseFetcher = ky.create({
  prefixUrl: API_URL,
  retry: {
    limit: 1,
    statusCodes: [403],
  },
  hooks: {
    beforeRetry: [
      async () => {
        if (!refreshTokenPromise) {
          refreshTokenPromise = refreshToken()
        }
        await refreshTokenPromise
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        const { accessToken, logout } = useAuthStore.getState()

        if (!response.ok) {
          if (response.status === 401 && accessToken) await logout()
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
        const { accessToken } = useAuthStore.getState()
        if (!accessToken) return

        req.headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
  },
})

export const createAuthFetcher = (token?: string) => {
  return baseFetcher.extend({
    hooks: {
      beforeRequest: [
        (req) => {
          const accessToken = token || useAuthStore.getState().accessToken
          if (!accessToken) return

          req.headers.set('Authorization', `Bearer ${accessToken}`)
        },
      ],
    },
  })
}
