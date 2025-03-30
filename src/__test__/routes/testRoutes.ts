import type { LoaderFunction, RouteObject } from 'react-router'
import { cloneDeep } from 'es-toolkit'
import { getUsers } from '&/mockfixtures/auth.ts'
import routes from '#routes/routes.tsx'

/**
 * Mocking map for each route to be used for loader function mocking
 * (to resolve conflicts between SSR and MSW)
 */
const mockLoaderMap: Record<string, () => unknown> = {
  '/profile': () => {
    const users = getUsers()
    return {
      id: users[0].id,
      email: users[0].email,
      nickname: users[0].nickname,
      language: users[0].language,
    }
  },
}

const defaultMockLoader = () => ({ mocked: true })

/**
 * Recursively replace all loader functions with mocked implementations.
 * Routes listed in mockLoaderMap use custom implementations.
 */
const mockAllLoaders = (routeArray: RouteObject[]): RouteObject[] => {
  for (const route of routeArray) {
    // Replace if this route has a loader
    if (route.loader) {
      const path = route.path || ''
      const mockFn =
        path in mockLoaderMap ? mockLoaderMap[path] : defaultMockLoader

      // Create a loader function that wraps the mocking implementation
      route.loader = (() => mockFn()) as LoaderFunction
    }

    // Recursively process nested routes
    if (route.children && route.children.length > 0) {
      mockAllLoaders(route.children)
    }
  }
  return routeArray
}

const testRoutes = cloneDeep(routes)

export const mockedRoutes = mockAllLoaders(testRoutes)
