import type { RequestLogin, RequestRegister } from '#apis/types/auth.ts'
import { baseFetcher } from '#apis/apiClient.ts'
import { END_POINTS } from '@routes/path.ts'

export const requestPostLogin = async (data: RequestLogin) => {
  const response = await baseFetcher.post<{
    accessToken: string
  }>(`${END_POINTS.AUTH}/login`, {
    json: data,
  })

  return response.json()
}

export const requestPostRefresh = async () => {
  const response = await baseFetcher.post<{
    accessToken: string
  }>(`${END_POINTS.AUTH}/refresh`)

  return response.json()
}

export const requestPostRegister = async (data: RequestRegister) => {
  const response = await baseFetcher.post<{
    accessToken: string
  }>(`${END_POINTS.AUTH}/register`, {
    json: data,
  })

  return response.json()
}
