import type { LoaderFunctionArgs } from 'react-router'
import { createAuthFetcherFromRequest } from '#utils/createAuthFetcherFromRequest.ts'

export async function profileLoader({ request }: LoaderFunctionArgs) {
  const authFetcher = await createAuthFetcherFromRequest(request)
  return authFetcher('user/profile')
}
