import { useTranslation } from 'react-i18next'
import { MessageCircleMore, User, Users } from 'lucide-react'
import { cn } from '#components/lib/utils'
import { PATH } from '#routes.tsx'
import { Link } from 'react-router'
import { widthStyle } from '#App.tsx'

interface FooterProps {
  pathname: string
}

export default function Footer({ pathname }: FooterProps) {
  const { t } = useTranslation('common')
  const itemClassName = 'flex flex-col items-center gap-1 w-24 text-gray-400'

  return (
    <footer
      className={cn(
        'fixed z-50 bottom-0 w-full h-[4rem] bg-background',
        widthStyle,
      )}
    >
      <nav className="h-full">
        <ul className="flex justify-evenly items-center h-full">
          <li>
            <Link
              to={PATH.friend}
              className={cn(
                itemClassName,
                pathname === PATH.friend && 'text-foreground',
              )}
            >
              <Users aria-label="친구 아이콘" />
              <span>{t('footer.friend')}</span>
            </Link>
          </li>
          <li>
            <Link
              to={PATH.chat}
              className={cn(
                itemClassName,
                pathname === PATH.chat && 'text-foreground',
              )}
            >
              <MessageCircleMore aria-label="채팅 아이콘" />
              <span>{t('footer.chat')}</span>
            </Link>
          </li>
          <li>
            <Link
              to={PATH.profile}
              className={cn(
                itemClassName,
                pathname === PATH.profile && 'text-foreground',
              )}
            >
              <User aria-label="프로필 아이콘" />
              <span>{t('footer.profile')}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
