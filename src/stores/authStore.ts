import ky from 'ky'
import { create } from 'zustand/react'
import { API_URL, END_POINTS } from '@routes/path.ts'

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
  logout: async () => {
    await ky.post(`${API_URL}/${END_POINTS.AUTH}/logout`)

    set({
      accessToken: null,
      isAuthenticated: false,
    })
  },
}))
