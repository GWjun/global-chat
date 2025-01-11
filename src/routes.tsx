import type { RouteObject } from 'react-router'
import { Suspense } from 'react'
import App from './App'

import Error from 'src/pages/Error'
import NotFound from '#pages/NotFound'
import VisitorOutlet from '#components/VisitorOutlet'
import Layout from '#components/Layout'

// don't need to lazy loading
import Home from '#pages/Home'
import Login from '#pages/Login'
import Register from '#pages/Register'

import Chat from '#pages/Chat'
import Friend from '#pages/Friend'
import Profile from '#pages/Profile'

export const PATH = {
  home: '/',
  login: '/login',
  register: '/register',
  chat: '/chat',
  friend: '/friend',
  profile: '/profile',
}

const routes: RouteObject[] = [
  {
    path: PATH.home,
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    errorElement: <Error isRootError />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        errorElement: <Error />,
        children: [
          {
            element: <VisitorOutlet />,
            children: [
              {
                path: PATH.login,
                element: <Login />,
              },
              {
                path: PATH.register,
                element: <Register />,
              },
            ],
          },
          {
            element: <Layout />,
            children: [
              {
                path: PATH.chat,
                element: <Chat />,
              },
              {
                path: PATH.friend,
                element: <Friend />,
              },
              {
                path: PATH.profile,
                element: <Profile />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]

export default routes
