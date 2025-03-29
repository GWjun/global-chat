import { useTranslation } from 'react-i18next'
import { MessageCircleMore, User, Users } from 'lucide-react'
import { cn } from '#components/lib/utils'
import { Link } from 'react-router'
import { widthStyle } from '#App.tsx'
import { PATH } from '#routes/path.ts'

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
              to={PATH.FRIEND}
              className={cn(
                itemClassName,
                pathname === PATH.FRIEND && 'text-foreground',
              )}
              aria-labelledby="friend-label"
            >
              <Users aria-label={`${t('footer.friend')} icon`} />
              <span id="friend-label">{t('footer.friend')}</span>
            </Link>
          </li>
          <li>
            <Link
              to={PATH.CHAT}
              className={cn(
                itemClassName,
                pathname === PATH.CHAT && 'text-foreground',
              )}
              aria-labelledby="chat-label"
            >
              <MessageCircleMore aria-label={`${t('footer.chat')} icon`} />
              <span id="chat-label">{t('footer.chat')}</span>
            </Link>
          </li>
          <li>
            <Link
              to={PATH.PROFILE}
              className={cn(
                itemClassName,
                pathname === PATH.PROFILE && 'text-foreground',
              )}
              aria-labelledby="profile-label"
            >
              <User aria-label={`${t('footer.profile')} icon`} />
              <span id="profile-label">{t('footer.profile')}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
