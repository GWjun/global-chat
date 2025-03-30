import { createMemoryRouter, RouterProvider } from 'react-router'

import { act, render } from '@testing-library/react'
import { mockedRoutes } from '&/testroutes/testRoutes.ts'

const router = createMemoryRouter(mockedRoutes)

// Render a component with the RouterProvider and optionally navigate to a path.
export async function renderWithProvider(initialPath?: string) {
  const result = render(<RouterProvider router={router} />)

  if (initialPath) {
    await act(async () => {
      await router.navigate(initialPath)
    })
  }

  return result
}

export function navigateTo(path: string) {
  return act(async () => {
    await router.navigate(path)
  })
}

export function getCurrentPathname() {
  return router.state.location.pathname
}
