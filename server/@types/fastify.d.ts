import fastify from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
    // for decorator type inference
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { id: string }
  }
}
