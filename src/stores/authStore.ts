import { create } from 'zustand/react'

interface AuthStore {
  accessToken: string | null
  isAuthenticated: boolean
  setAccessToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setAccessToken: (token) =>
    set({
      accessToken: token,
      isAuthenticated: token !== null && token !== '',
    }),
  logout: () => {
    set({
      accessToken: null,
      isAuthenticated: false,
    })
  },
}))
