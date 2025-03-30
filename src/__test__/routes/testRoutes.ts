import type { LoaderFunction, RouteObject } from 'react-router'
import { cloneDeep } from 'es-toolkit'
import routes from '#routes/routes.tsx'
import { getUsers } from '&/mockfixtures/auth.ts'

const testRoutes = cloneDeep(routes)

// Function to replace all loaders with mock implementations (due to SSR)
const mockAllLoaders = (routeArray: RouteObject[]): RouteObject[] => {
  for (const route of routeArray) {
    // Replace loader if it exists on this route
    if (route.loader) {
      route.loader = (() => {
        if (route.path === '/profile') {
          const users = getUsers()

          return {
            id: users[0].id,
            email: users[0].email,
            nickname: users[0].nickname,
            language: users[0].language,
          }
        }

        // Default mock data for other routes
        return { mocked: true }
      }) as LoaderFunction
    }

    // Recursively process nested routes
    if (route.children && route.children.length > 0) {
      mockAllLoaders(route.children)
    }
  }

  return routeArray
}

export const mockedRoutes = mockAllLoaders(testRoutes)
