import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { useSSR } from 'react-i18next'
import routes from './routes.tsx'

import type { Resource } from 'i18next'
import './i18n.ts'

const router = createBrowserRouter(routes, {
  hydrationData: window.__staticRouterHydrationData,
})

function ClientApp() {
  useSSR(window.initialI18nStore, window.initialLanguage)

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

const rootElement = document.getElementById('root')!
hydrateRoot(rootElement, <ClientApp />)

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __staticRouterHydrationData: any
    initialI18nStore: Resource
    initialLanguage: string
  }
}
