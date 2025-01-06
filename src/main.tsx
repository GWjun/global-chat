import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import routes from './routes.tsx'

const rootElement = document.getElementById('root')!

const router = createBrowserRouter(routes, {
  hydrationData: window.__staticRouterHydrationData,
})

hydrateRoot(
  rootElement,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __staticRouterHydrationData: any
  }
}
