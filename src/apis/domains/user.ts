import { authFetcher } from '#apis/apiClient.ts'
import { UserResponse } from '#apis/types/user.ts'
import { END_POINTS } from '@routes/path.ts'

export const requestGetProfile = async () => {
  const response = await authFetcher.get<UserResponse>(
    `${END_POINTS.USER}/profile`,
  )

  return response.json()
}
