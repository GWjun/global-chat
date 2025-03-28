import type { ReactNode } from 'react'
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { toast } from '#hooks/useToast.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true, // reset data on ErrorBoundary Component
      retry: 0,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      toast({
        title: error.message || '요청에 실패햐였습니다.',
        variant: 'destructive',
      })
    },
  }),
})

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
