import type { LoaderFunctionArgs } from 'react-router'
import { createAuthFetcherFromRequest } from '#utils/createAuthFetcherFromRequest.ts'
import { END_POINTS } from '@routes/path.ts'

export async function profileLoader({ request }: LoaderFunctionArgs) {
  const authFetcher = await createAuthFetcherFromRequest(request)
  return authFetcher(`${END_POINTS.USER}/profile`)
}
