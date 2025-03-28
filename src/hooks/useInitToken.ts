import { useAuthStore } from '#stores/authStore.ts'
import { useEffect } from 'react'
import { requestPostRefresh } from '#apis/domains/auth.ts'

export function useInitToken() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  useEffect(() => {
    async function initialize() {
      try {
        const { accessToken } = await requestPostRefresh()
        setAccessToken(accessToken)
      } catch {
        /* empty */
      }
    }

    // noinspection JSIgnoredPromiseFromCall
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
