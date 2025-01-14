import { Loader2 } from 'lucide-react'

import { cn } from '#components/lib/utils'

interface SpinnerProps {
  variant?: 'inset'
  className?: string
}

export default function Spinner({ className, variant }: SpinnerProps) {
  return (
    <div
      className={cn(
        'flex justify-center items-center',
        variant === 'inset' && 'w-full h-full',
      )}
    >
      <Loader2
        className={cn('h-4 w-4 animate-spin text-gray-400', className)}
        aria-label="로딩 중"
      />
    </div>
  )
}
