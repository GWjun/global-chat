import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useAuthStore } from '#stores/authStore.ts'
import { PATH } from '#routes.tsx'

export default function VisitorOutlet() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH.CHAT, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return <Outlet />
}
