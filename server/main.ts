import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ViteDevServer } from 'vite'

import path from 'path'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifyCompress from '@fastify/compress'

import { createServer } from 'vite'
import { createFetchRequest, loadRender, loadTemplate } from '@utils/ssr.ts'
import plugins from '@plugins'
import routes from '@routes'
import APIError from '#apis/APIError.ts'

import { plugin } from 'i18next-http-middleware'
import i18next from './i18n'
import { Resource } from 'i18next'

const isProduction = process.env.NODE_ENV === 'production'

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
})

server.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true,
})

server.register(plugin, { i18next })

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
plugins.forEach(({ plugin }) => {
  server.register(plugin)
})

routes.forEach(({ route, prefix }) => {
  server.register(route, { prefix })
})

server.setErrorHandler((error, _req, reply) => {
  console.error(error)

  if (error.validation) {
    reply.status(400).send({
      statusCode: 400,
      errorCode: 'INVALID_REQUEST',
      message: '잘못된 요청입니다.',
    })
  } else if (error instanceof APIError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
    })
  } else {
    reply.status(500).send({
      statusCode: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: '서버에 문제가 생겼어요. \\n잠시 후 다시 시도해 주세요.',
    })
  }
})

server.get('/favicon.ico', async (_req, reply) => {
  reply.status(204).send()
})

// serve routing page
async function handleSSR(req: FastifyRequest, reply: FastifyReply) {
  const url = req.url
  const res = reply.raw
  const fetchRequest = createFetchRequest(req, reply) // for react router adaption

  const template = await loadTemplate(url, vite)
  const render = await loadRender(vite)

  const parts = template.split('<!--ssr-outlet-->')
  res.write(parts[0])

  const { stream } = await render(fetchRequest, {
    onShellReady() {
      stream.pipe(res)
    },
    onAllReady() {
      const initialI18nStore: Resource = {}
      req.i18n.languages.forEach((lng) => {
        initialI18nStore[lng] = req.i18n.services.resourceStore.data[lng]
      })

      const script = `
        <script>
          window.initialI18nStore = "${JSON.stringify(initialI18nStore)}";
          window.initialLanguage = "${req.i18n.language}";
        </script>`

      parts[1] = parts[1].replace('<!--ssr-script-->', script)
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
