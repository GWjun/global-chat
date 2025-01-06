import { Outlet } from 'react-router'
import { cn } from '#components/lib/utils.ts'
import './index.css'

import QueryProvider from '#contexts/QueryProvider'
import ThemeProvider from '#contexts/ThemeProvider'

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <main className={cn('flex flex-col grow')}>
          <Outlet />
        </main>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
