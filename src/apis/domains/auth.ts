import type { RequestLogin } from '#apis/types/auth.ts'
import { baseFetcher } from '#apis/apiClient.ts'
import { END_POINTS } from '@routes/path.ts'

export const requestPostLogin = async (data: RequestLogin) => {
  const response = await baseFetcher.post(`${END_POINTS.AUTH}/login`, {
    json: data,
  })

  return (await response.json()) as {
    accessToken: string
  }
}

export const requestPostRefresh = async () => {
  const response = await baseFetcher.post(`${END_POINTS.AUTH}/refresh`)

  return (await response.json()) as {
    accessToken: string
  }
}
