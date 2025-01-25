import type { RouteObject } from 'react-router'
import { Suspense } from 'react'
import App from './App'

import Error from '#pages/Error'
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
import FriendFind from '#pages/FriendFind'

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  CHAT: '/chat',
  CHATROOM: '/chat/:roomId',
  chatRoom: (roomId: number) => `/chat/${roomId}`,

  FRIEND: '/friend',
  FRIEND_FIND: '/friend/find',

  PROFILE: '/profile',
}

const routes: RouteObject[] = [
  {
    path: PATH.HOME,
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
                path: PATH.LOGIN,
                element: <Login />,
              },
              {
                path: PATH.REGISTER,
                element: <Register />,
              },
            ],
          },
          {
            element: <Layout />,
            children: [
              {
                path: PATH.CHAT,
                element: <Chat />,
              },
              {
                path: PATH.FRIEND,
                element: <Friend />,
              },
              {
                path: PATH.FRIEND_FIND,
                element: <FriendFind />,
              },
              {
                path: PATH.PROFILE,
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
