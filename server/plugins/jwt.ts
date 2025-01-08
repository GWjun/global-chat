import type { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'

export default fp(async (fastify) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'your-jwt-secret',
  })

  fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'your-cookie-secret',
    hook: 'onRequest',
    parseOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      signed: true,
    },
  })

  fastify.decorate(
    'authenticate',
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new Error()
        }

        const token = authHeader.substring(7)
        req.user = fastify.jwt.verify(token)
      } catch (err) {
        reply.code(401).send({ error: 'Unauthorized' })
      }
    },
  )
})
