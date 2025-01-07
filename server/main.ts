import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ViteDevServer } from 'vite'

import path from 'path'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyCompress from '@fastify/compress'
import AutoLoad from '@fastify/autoload'

import { createServer } from 'vite'
import { createFetchRequest, loadRender, loadTemplate } from './utils/ssr.ts'

const isProduction = process.env.NODE_ENV === 'production'

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
})

// vite config
let vite: ViteDevServer | undefined
if (!isProduction) {
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  server.addHook('onRequest', (req, res, done) => {
    if (!vite) {
      throw new Error('Vite instance is required in development mode')
    }

    vite.middlewares(req.raw, res.raw, done)
  })
} else {
  // for production
  server.register(fastifyCompress, { encodings: ['gzip'] })

  server.register(fastifyStatic, {
    root: path.join(__dirname, '../dist/client'),
    prefix: '/',
  })
}

// backend resource config
server.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: { prefix: '/api/v1' },
})

server.get('/favicon.ico', async (_, reply) => {
  reply.status(204).send()
})

// serve routing page
async function handleSSR(req: FastifyRequest, reply: FastifyReply) {
  const url = req.url
  const res = reply.raw
  const fetchRequest = createFetchRequest(req, reply)

  const template = await loadTemplate(url, vite)
  const render = await loadRender(vite)

  const parts = template.split('<!--ssr-outlet-->')
  res.write(parts[0])

  const { stream } = await render(fetchRequest, {
    onShellReady() {
      stream.pipe(res)
    },
    onAllReady() {
      res.write(parts[1])
      res.end()
    },
  })
}

// avoid error with static serving file
server.get('/', async (req, reply) => {
  await handleSSR(req, reply)
})

// default route
server.setNotFoundHandler(async (req, reply) => {
  await handleSSR(req, reply)
})

await server.ready()
await server.listen({ port: 3000 })
