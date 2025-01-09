import type { FastifyInstance } from 'fastify'

export default async function chatRouter(fastify: FastifyInstance) {
  fastify.get('/message', async (_, reply) => {
    reply.send({ hello: 'world' })
  })
}
