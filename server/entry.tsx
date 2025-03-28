import {
  renderToPipeableStream,
  RenderToPipeableStreamOptions,
} from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router'
import routes from '#routes/routes.tsx'

import type { i18n } from 'i18next'
import { I18nextProvider } from 'react-i18next'

const { query, dataRoutes } = createStaticHandler(routes)

export const render = async (
  req: Request,
  options: RenderToPipeableStreamOptions & { i18n: i18n },
) => {
  const context = await query(req)

  if (context instanceof Response) {
    return context
  }

  const router = createStaticRouter(dataRoutes, context)

  const stream = renderToPipeableStream(
    <I18nextProvider i18n={options.i18n}>
      <StaticRouterProvider router={router} context={context} />
    </I18nextProvider>,
    options,
  )

  return { stream }
}
