import { Bell } from 'lucide-react'
import { cn } from '#components/lib/utils.ts'
import { widthStyle } from '#App.tsx'

export default function Header() {
  return (
    <header
      className={cn(
        'top-0 z-50 w-full h-[3.5rem] border-b border-border bg-background',
        widthStyle,
      )}
    >
      <div className="flex items-center justify-end h-full px-3">
        <Bell size={26} aria-label="bell icon" />
      </div>
    </header>
  )
}
