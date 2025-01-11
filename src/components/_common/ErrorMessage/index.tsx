import { cn } from '#components/lib/utils'

type ErrorMessageProps = {
  errors?: string
  className?: string
}

export function ErrorMessage({ errors, className }: ErrorMessageProps) {
  if (!errors) return null

  return <p className={cn('text-destructive text-sm', className)}>{errors}</p>
}
