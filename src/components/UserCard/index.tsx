import type { PropsWithChildren } from 'react'
import { Slot, Slottable } from '@modern-kit/react/components/Slot'

interface UserCardProps {
  name: string
  message: string
  asChild?: boolean
}

export default function UserCard({
  name,
  message,
  asChild,
  ...props
}: PropsWithChildren<UserCardProps>) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className="flex justify-between items-center w-full p-4 bg-background rounded-lg shadow-sm"
      {...props}
    >
      <div>
        <span className="font-semibold">{name}</span>
        <p className="text-sub">{message}</p>
      </div>
      <Slottable>{props.children}</Slottable>
    </Comp>
  )
}
