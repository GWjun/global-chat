import type { FastifyInstance } from 'fastify'

export default async function chatRoutes(fastify: FastifyInstance) {
  fastify.get('/message', async (_, reply) => {
    reply.send({ hello: 'world' })
  })
}
