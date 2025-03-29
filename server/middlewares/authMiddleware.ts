import type { FastifyRequest, FastifyReply } from 'fastify'
import { TokenService } from '@services/auth/token.ts'
import { PROTECTED_ROUTES } from '#routes/path.ts'

// check if the page requires authentication
function isProtectedRoute(url: string): boolean {
  return PROTECTED_ROUTES.some((route) => {
    return url === route || url.startsWith(`${route}/`)
  })
}

// SSR authentication middleware
export async function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply,
  done: () => void,
) {
  const tokenService = new TokenService(req.server)
  const url = req.url
  const redirectUrl = '/login?redirect=' + encodeURIComponent(url)

  if (isProtectedRoute(url)) {
    const signedCookie = req.cookies.refreshToken

    // If there is no cookie
    if (!signedCookie) {
      return reply.code(302).redirect(redirectUrl)
    }

    // Verify cookie signature
    const { valid, value: token } = reply.unsignCookie(signedCookie)
    if (!valid) {
      return reply.code(302).redirect(redirectUrl)
    }

    try {
      // Validate token
      const userId = await tokenService.verifyRefreshToken(token)
      if (!userId) {
        reply.clearCookie('refreshToken')
        return reply.code(302).redirect(redirectUrl)
      }

      req.user = { id: userId }
    } catch (error) {
      reply.clearCookie('refreshToken')
      return reply.code(302).redirect(redirectUrl)
    }
  }

  done()
}
