import type { RouteObject } from 'react-router'
import { Suspense } from 'react'
import App from './App'

// don't need to lazy loading
import Home from '#pages/Home'
import Login from '#pages/Login'
import Register from '#pages/Register'

import Layout from '#components/Layout'
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
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        children: [
          {
            path: PATH.login,
            element: <Login />,
          },
          {
            path: PATH.register,
            element: <Register />,
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
    ],
  },
]

export default routes
