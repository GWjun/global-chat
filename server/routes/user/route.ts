import type { FastifyInstance } from 'fastify'
import prisma from '@utils/prisma.ts'
import { getAPIError } from '@utils/getAPIError.ts'
import bcryptjs from 'bcryptjs'
import { UpdateProfileDto, UpdateProfileSchema } from '@dto/user.ts'

export default async function userRouter(fastify: FastifyInstance) {
  fastify.get(
    '/profile',
    { onRequest: fastify.authenticate },
    async (req, _reply) => {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          email: true,
          nickname: true,
          language: true,
        },
      })

      if (!user) throw getAPIError('USER_NOT_FOUND')

      return user
    },
  )

  fastify.patch<{ Body: UpdateProfileDto }>(
    '/profile',
    {
      onRequest: fastify.authenticate,
      schema: UpdateProfileSchema,
    },
    async (req, _reply) => {
      const { nickname, password, newPassword } = req.body

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
      })

      if (!user) throw getAPIError('USER_NOT_FOUND')

      if (password && newPassword) {
        const isValid = await bcryptjs.compare(password, user.password)
        if (!isValid) throw getAPIError('UNAUTHORIZED')

        const hashedPassword = await bcryptjs.hash(newPassword, 10)
        await prisma.user.update({
          where: { id: req.user.id },
          data: { password: hashedPassword },
        })
      }

      if (nickname) {
        await prisma.user.update({
          where: { id: req.user.id },
          data: { nickname },
        })
      }

      return { message: 'Profile updated successfully' }
    },
  )

  fastify.delete(
    '/profile',
    { onRequest: fastify.authenticate },
    async (req, _reply) => {
      await prisma.user.delete({
        where: { id: req.user.id },
      })

      return { message: 'User deleted successfully' }
    },
  )
}
