import { createContext } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextProps {
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
)
