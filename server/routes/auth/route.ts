import type { FastifyInstance } from 'fastify'
import bcryptjs from 'bcryptjs'
import prisma from '@utils/prisma.ts'
import { TokenService } from '@services/auth/token.ts'
import { getAPIError } from '@utils/getAPIError.ts'

interface LoginBody {
  email: string
  password: string
}

interface RegisterBody {
  email: string
  password: string
  nickname: string
  language: string
}

export default async function authRouter(fastify: FastifyInstance) {
  const tokenService = new TokenService(fastify)

  fastify.post<{ Body: RegisterBody }>('/register', async (req, reply) => {
    const { email, password, nickname, language } = req.body

    const { user, accessToken } = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        throw getAPIError('EMAIL_ALREADY_EXIST')
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
        path: '/auth/refresh',
        signed: true,
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      return { user, accessToken }
    })

    return {
      accessToken,
      user: { ...user, password: undefined },
    }
  })

  fastify.post<{ Body: LoginBody }>('/login', async (req, reply) => {
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
      path: '/auth/refresh',
      signed: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return {
      accessToken,
      user: { ...user, password: undefined },
    }
  })

  fastify.post('/refresh', async (req, reply) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      throw getAPIError('INVALID_REQUEST')
    }

    const userId = await tokenService.verifyRefreshToken(refreshToken)

    if (!userId) {
      reply.clearCookie('refreshToken')
      throw getAPIError('UNAUTHORIZED')
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await tokenService.generateTokens(userId)

    reply.setCookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      signed: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return { accessToken }
  })
}
