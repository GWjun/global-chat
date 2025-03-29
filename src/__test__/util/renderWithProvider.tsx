import type { ReactNode } from 'react'

import { render } from '@testing-library/react'
import { QueryProvider } from '#contexts/QueryProvider'
import { Toaster } from '#components/_common/Toast/toaster.tsx'
import { OverlayProvider } from '@toss/use-overlay'

export default function renderWithProvider(children: ReactNode) {
  return render(
    <QueryProvider>
      <OverlayProvider>
        {children}
        <Toaster />
      </OverlayProvider>
    </QueryProvider>,
  )
}
