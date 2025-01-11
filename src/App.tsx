import { Outlet } from 'react-router'
import { cn } from '#components/lib/utils.ts'
import './index.css'

import useInitToken from '#hooks/useInitToken.ts'
import QueryProvider from '#contexts/QueryProvider'

export const widthStyle = 'max-w-[30rem] mx-auto'

function App() {
  const { isPending } = useInitToken()
  if (isPending) return null

  return (
    <QueryProvider>
      <div
        className={cn(
          'min-h-[100dvh] box-content border-x border-border shadow-md bg-[#F9FAFB]',
          widthStyle,
        )}
      >
        <Outlet />
      </div>
    </QueryProvider>
  )
}

export default App
