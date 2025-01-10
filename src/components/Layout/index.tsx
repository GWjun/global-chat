import { Outlet, useLocation } from 'react-router'
import Header from '#components/Layout/Header.tsx'
import Footer from '#components/Layout/Footer.tsx'

export default function Layout() {
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
