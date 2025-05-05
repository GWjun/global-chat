import type { RouteObject } from 'react-router'
import { Suspense } from 'react'
import { loadableAsComponentType } from '#utils/loadableAsComponentType.ts'
import App from '../App.tsx'

import Error from '#pages/Error'
import NotFound from '#pages/NotFound'
import VisitorLayout from '#components/layout/VisitorLayout.tsx'
import UserLayout from '#components/layout/UserLayout.tsx'

// use loadable library for SSR support
const Home = loadableAsComponentType(() => import('#pages/Home'))
const Login = loadableAsComponentType(() => import('#pages/Login'))
const Register = loadableAsComponentType(() => import('#pages/Register'))

const Chat = loadableAsComponentType(() => import('#pages/Chat'))
const Friend = loadableAsComponentType(() => import('#pages/Friend'))
const Profile = loadableAsComponentType(() => import('#pages/Profile'))
const FriendFind = loadableAsComponentType(() => import('#pages/FriendFind'))

import { PATH } from '#routes/path.ts'
import * as Loaders from '#routes/loaders.ts'

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
            element: <VisitorLayout />,
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
            element: <UserLayout />,
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
                loader: Loaders.profileLoader,
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
