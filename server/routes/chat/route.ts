import type { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {
  fastify.get('/chatting', async (_, reply) => {
    reply.send({ hello: 'world' })
  })
}
