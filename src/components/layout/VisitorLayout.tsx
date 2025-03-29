import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useAuthStore } from '#stores/authStore.ts'
import { PATH } from '#routes/path.ts'

export default function VisitorLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const redirectUrl = searchParams.get('redirect') || PATH.CHAT

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectUrl])

  return <Outlet />
}
