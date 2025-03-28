import { Outlet, useLocation } from 'react-router'

import Header from '#components/layout/Header.tsx'
import Footer from '#components/layout/Footer.tsx'

export default function UserLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      <main className="h-[calc(100dvh-7.5rem)] overflow-y-auto">
        <Outlet />
      </main>
      <Footer pathname={pathname} />
    </>
  )
}
