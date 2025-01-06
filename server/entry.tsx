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

const { query, dataRoutes } = createStaticHandler(routes)

export const render = async (
  req: Request,
  options: RenderToPipeableStreamOptions,
) => {
  const context = await query(req)

  if (context instanceof Response) {
    return context
  }

  const router = createStaticRouter(dataRoutes, context)

  const stream = renderToPipeableStream(
    <StaticRouterProvider router={router} context={context} />,
    options,
  )

  return { stream }
}
