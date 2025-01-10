import {
  renderToPipeableStream,
  RenderToPipeableStreamOptions,
} from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router'
import routes from '../src/routes'
import { I18nextProvider } from 'react-i18next'
import { FastifyRequest } from 'fastify'

const { query, dataRoutes } = createStaticHandler(routes)

export const render = async (
  req: FastifyRequest,
  options: RenderToPipeableStreamOptions,
) => {
  const context = await query(req as unknown as Request)

  if (context instanceof Response) {
    return context
  }

  const router = createStaticRouter(dataRoutes, context)

  const stream = renderToPipeableStream(
    <I18nextProvider i18n={req.i18n}>
      <StaticRouterProvider router={router} context={context} />
    </I18nextProvider>,
    options,
  )

  return { stream }
}
