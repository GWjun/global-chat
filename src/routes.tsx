import type { RouteObject } from 'react-router'
import { Suspense } from 'react'
import App from './App'
import Home from '#pages/Home'
import About from '#pages/About'

export const PATH = {
  home: '/',
  about: 'about',
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
        loader: async () => {
          // server side code
          return fetch(`https://jsonplaceholder.typicode.com/todos`)
        },
      },
      {
        children: [
          {
            path: PATH.about,
            element: <About />,
          },
        ],
      },
    ],
  },
]

export default routes
