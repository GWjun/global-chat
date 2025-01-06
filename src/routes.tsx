import type { RouteObject } from 'react-router'
import { Suspense } from 'react'
import App from './App'
import Home from '#pages/Home'

export const PATH = {
  home: '/',
}

const routes: RouteObject[] = [
  {
    path: PATH.home,
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {},
      },
      {
        children: [{}],
      },
    ],
  },
]

export default routes
