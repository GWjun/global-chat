import type { FastifyInstance } from 'fastify'
import prisma from '@utils/prisma.ts'

export class TokenService {
  constructor(private fastify: FastifyInstance) {}

  async generateTokens(userId: string) {
    const accessToken = this.fastify.jwt.sign(
      { id: userId },
      { expiresIn: '15m' },
    )

    const refreshToken = this.fastify.jwt.sign(
      { id: userId, type: 'refresh' },
      { expiresIn: '7d' },
    )

    return { accessToken, refreshToken }
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const decoded = this.fastify.jwt.verify(refreshToken) as {
        id: string
        type: string
      }

      if (decoded.type !== 'refresh') {
        return null
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      })

      if (!user) {
        return null
      }

      return decoded.id
    } catch {
      return null
    }
  }
}
