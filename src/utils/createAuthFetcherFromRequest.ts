import { requestPostRefresh } from '#apis/domains/auth.ts'
import { createAuthFetcher } from '#apis/apiClient.ts'

async function getAccessToken(cookie: string | undefined) {
  const { accessToken } = await requestPostRefresh(cookie)
  return accessToken
}

/**
 * Extracts the cookie from the Request object, retrieves the access token,
 * and creates an authenticated fetcher with the token.
 */
export async function createAuthFetcherFromRequest(request: Request) {
  const cookie = request.headers.get('cookie') ?? undefined

  const accessToken = await getAccessToken(cookie)

  return createAuthFetcher(accessToken)
}
