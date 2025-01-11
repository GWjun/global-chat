import type { RequestLogin } from '#apis/types/auth.ts'
import { baseFetcher } from '#apis/apiClient.ts'
import { END_POINTS } from '@routes/path.ts'

export const requestPostLogin = async (data: RequestLogin) => {
  const response = await baseFetcher.post(`${END_POINTS.AUTH}/login`, {
    json: data,
  })

  return response.json()
}
