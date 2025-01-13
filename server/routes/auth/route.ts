import type { FastifyInstance } from 'fastify'
import {
  LoginDto,
  LoginSchema,
  RegisterDto,
  RegisterSchema,
} from '@dto/auth.ts'

import bcryptjs from 'bcryptjs'
import prisma from '@utils/prisma.ts'
import { TokenService } from '@services/auth/token.ts'
import { getAPIError } from '@utils/getAPIError.ts'
import { BASE_URL, END_POINTS } from '@routes/path.ts'

export default async function authRouter(fastify: FastifyInstance) {
  const tokenService = new TokenService(fastify)
  const COOKIE_PATH = `${BASE_URL}/${END_POINTS.AUTH}`

  fastify.post<{ Body: RegisterDto }>(
    '/register',
    {
      schema: RegisterSchema,
    },
    async (req, reply) => {
      const { email, password, confirmPassword, nickname } = req.body
      const language = req.i18n.language

      const { accessToken } = await prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { email },
        })

        if (existingUser) {
          throw getAPIError('EMAIL_ALREADY_EXIST')
        }

        if (password !== confirmPassword) {
          throw getAPIError(`INTERNAL_SERVER_ERROR`)
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            nickname,
            language,
          },
        })
        const { accessToken, refreshToken } = await tokenService.generateTokens(
          user.id,
        )

        reply.setCookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: COOKIE_PATH,
          signed: true,
          maxAge: 14 * 24 * 60 * 60, // 14 days
        })

        return { user, accessToken }
      })

      return {
        accessToken,
      }
    },
  )

  fastify.post<{ Body: LoginDto }>(
    '/login',
    { schema: LoginSchema },
    async (req, reply) => {
      const { email, password } = req.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        throw getAPIError('UNAUTHORIZED')
      }

      const isValid = await bcryptjs.compare(password, user.password)

      if (!isValid) {
        throw getAPIError('UNAUTHORIZED')
      }

      const { accessToken, refreshToken } = await tokenService.generateTokens(
        user.id,
      )

      reply.setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: COOKIE_PATH,
        signed: true,
        maxAge: 14 * 24 * 60 * 60, // 14 days
      })

      return {
        accessToken,
      }
    },
  )

  fastify.post('/refresh', async (req, reply) => {
    const signedCookie = req.cookies.refreshToken
    if (!signedCookie) throw getAPIError('INVALID_REQUEST')

    const { valid, value: token } = fastify.unsignCookie(signedCookie)
    if (!valid) throw getAPIError('UNAUTHORIZED')

    const userId = await tokenService.verifyRefreshToken(token)

    if (!userId) {
      reply.clearCookie('refreshToken')
      throw getAPIError('SESSION_EXPIRED')
    }

    const { accessToken } = await tokenService.generateTokens(userId)
    return { accessToken }
  })

  fastify.post('/logout', async (req, reply) => {
    const signedCookie = req.cookies.refreshToken

    if (signedCookie) {
      reply.clearCookie('refreshToken', {
        path: COOKIE_PATH,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
    }

    return { message: 'Logged out successfully' }
  })
}
