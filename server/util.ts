import type { FastifyRequest, FastifyReply } from 'fastify'
import type { ViteDevServer } from 'vite'
import { Readable } from 'stream'
import fs from 'fs/promises'

const isProduction = process.env.NODE_ENV === 'production'

export async function loadTemplate(url: string, vite?: ViteDevServer) {
  if (!isProduction) {
    if (!vite) {
      throw new Error('Vite instance is required in development mode')
    }

    const template = await fs.readFile('./index.html', 'utf-8')
    return await vite.transformIndexHtml(url, template)
  }

  // for production
  return await fs.readFile('./dist/client/index.html', 'utf-8')
}

export async function loadRender(vite?: ViteDevServer) {
  if (!isProduction) {
    if (!vite) {
      throw new Error('Vite instance is required in development mode')
    }

    const { render } = await vite.ssrLoadModule('./server/entry.tsx')
    return render
  }

  // for production
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { render } = await import('../dist/server/entry.js')
  return render
}

export function createFetchRequest(req: FastifyRequest, reply: FastifyReply) {
  const origin = `${req.protocol}://${req.hostname}`
  const url = new URL(req.url, origin)

  const controller = new AbortController()
  reply.raw.on('close', () => controller.abort())

  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v))
      } else {
        headers.set(key, value as string)
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = Readable.from(req.raw)
  }

  return new Request(url.href, init)
}
