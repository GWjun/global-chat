import { useAuthStore } from '#stores/authStore.ts'
import { useEffect, useState } from 'react'
import { requestPostRefresh } from '#apis/domains/auth.ts'

export default function useInitToken() {
  const [isPending, setIsPending] = useState(true)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  useEffect(() => {
    async function initialize() {
      try {
        const { accessToken } = await requestPostRefresh()
        setAccessToken(accessToken)
      } catch {
        /* empty */
      }
      setIsPending(false)
    }

    initialize()
  }, [])

  return { isPending }
}
