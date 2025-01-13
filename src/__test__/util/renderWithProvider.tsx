import type { ReactNode } from 'react'

import { render } from '@testing-library/react'
import QueryProvider from '#contexts/QueryProvider'
import { Toaster } from '#components/_common/Toast/toaster.tsx'

export default function renderWithProvider(children: ReactNode) {
  return render(
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>,
  )
}
