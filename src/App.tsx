import { Outlet } from 'react-router'
import { cn } from '#components/lib/utils.ts'
import './index.css'

import { useInitToken } from '#hooks/useInitToken.ts'
import { Toaster } from '#components/_common/Toast/toaster.tsx'
import { QueryProvider } from '#contexts/QueryProvider'
import { OverlayProvider } from '@toss/use-overlay'

export const widthStyle = 'max-w-[30rem] 2xl:max-w-[40rem] mx-auto'

function App() {
  useInitToken()

  return (
    <QueryProvider>
      <OverlayProvider>
        <div
          className={cn(
            'min-h-[100dvh] box-content border-x border-border shadow-md bg-[#F9FAFB]',
            widthStyle,
          )}
        >
          <Outlet />
        </div>
        <Toaster />
      </OverlayProvider>
    </QueryProvider>
  )
}

export default App
