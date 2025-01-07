export default async function (fastify) {
  fastify.get('/chatting', async (req, reply) => {
    reply.send({ hello: 'world' })
  })
}
