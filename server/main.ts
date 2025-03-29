import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ViteDevServer } from 'vite'

import path from 'path'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import fastifyStatic from '@fastify/static'
import fastifyCompress from '@fastify/compress'

import { createServer } from 'vite'
import { createFetchRequest, loadRender, loadTemplate } from '@utils/ssr.ts'
import { authMiddleware } from '@middlewares/authMiddleware.ts'
import plugins from '@plugins'
import routes from '@routes'
import APIError from '#apis/APIError.ts'

import type { Resource } from 'i18next'
import { plugin } from 'i18next-http-middleware'
import i18next from './i18n'

const isProduction = process.env.NODE_ENV === 'production'

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
})

await server.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true,
})

await server.register(rateLimit, {
  global: true,
  max: 1000,
  timeWindow: '1 minute',
})

await server.register(plugin, { i18next })

// authentication middleware only to HTML requests
server.addHook('preHandler', async (req, reply) => {
  const url = req.url
  const acceptHeader = req.headers.accept || ''
  const isHtmlRequest = acceptHeader.includes('text/html')

  if (isHtmlRequest && !url.startsWith('/api/')) {
    return new Promise<void>((resolve) => {
      authMiddleware(req, reply, () => {
        resolve()
      })
    })
  }
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
plugins.forEach(({ plugin }) => {
  server.register(plugin)
})

routes.forEach(({ route, prefix }) => {
  server.register(route, { prefix })
})

server.setErrorHandler((error, req, reply) => {
  // console.error(error)

  if (error.validation) {
    reply.status(400).send({
      statusCode: 400,
      errorCode: 'INVALID_REQUEST',
      message: req.i18n.t('INVALID_REQUEST'),
    })
  } else if (error.statusCode === 429) {
    reply.status(429).send({
      statusCode: 429,
      errorCode: 'TOO_MANY_REQUEST',
      message: req.i18n.t('TOO_MANY_REQUEST'),
    })
  } else if (error instanceof APIError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: req.i18n.t(error.errorCode),
    })
  } else {
    console.error(error)
    reply.status(500).send({
      statusCode: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: req.i18n.t('INTERNAL_SERVER_ERROR'),
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
    i18n: req.i18n,
    onShellReady() {
      stream.pipe(res)
    },
    onAllReady() {
      const initialLanguage =
        req.cookies.i18nextLng ?? req.i18n.language.slice(0, 2)
      const initialI18nStore: Resource = {}
      initialI18nStore[initialLanguage] =
        req.i18n.services.resourceStore.data[initialLanguage]

      const script = `
        <script>
          window.initialI18nStore = ${JSON.stringify(initialI18nStore)};
          window.initialLanguage = "${initialLanguage}";
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
