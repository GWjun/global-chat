import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { ThemeContext, ThemeMode } from '#contexts/ThemeProvider/context'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      // localStorage theme
      const storedTheme = localStorage.getItem('theme') as ThemeMode
      if (storedTheme) return storedTheme

      // system theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const isDarkMode =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    // add or delete dark class
    document.documentElement.classList.toggle('dark', isDarkMode)

    if (theme !== 'system') {
      localStorage.setItem('theme', theme)
    } else {
      localStorage.removeItem('theme')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
