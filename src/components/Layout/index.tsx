import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

import Header from '#components/Layout/Header.tsx'
import Footer from '#components/Layout/Footer.tsx'

import { useAuthStore } from '#stores/authStore.ts'
import { PATH } from '#routes.tsx'

export default function Layout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH.LOGIN, { replace: true })
    }
  }, [isAuthenticated, navigate])

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
