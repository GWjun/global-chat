import { Outlet } from 'react-router'
import './index.css'

import QueryProvider from '#contexts/QueryProvider'
import ThemeProvider from '#contexts/ThemeProvider'
import { cn } from '#components/lib/utils.ts'

export const widthStyle = 'max-w-[30rem] mx-auto'

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <div
          className={cn(
            'min-h-[100dvh] box-content border-x border-border shadow-md bg-[#F9FAFB]',
            widthStyle,
          )}
        >
          <Outlet />
        </div>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
