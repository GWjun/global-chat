import { Skeleton } from '#components/_common/Skeleton'

interface UserSkeletonProps {
  count: number
  className?: string
}

export default function UserCardSkeleton({
  count = 1,
  ...props
}: UserSkeletonProps) {
  return (
    <div className={props.className}>
      {Array.from({ length: count }).map((_, idx) => (
        <Skeleton key={idx} className="w-full h-20" />
      ))}
    </div>
  )
}
