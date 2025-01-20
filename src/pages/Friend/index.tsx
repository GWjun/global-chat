import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { MessageCircleMore } from 'lucide-react'

import UserCard from '#components/UserCard'
import { Button } from '#components/_common/Button'
import { PATH } from '#routes.tsx'

export default function Friend() {
  const { t } = useTranslation('friend')
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center p-4 pt-12">
      <div className="flex justify-between items-end px-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">{t('friendList')}</h2>
          <Button
            onClick={() => navigate(PATH.FRIEND_FIND)}
            variant="secondary"
            className="h-8 rounded-full"
          >
            + {t('friendAdd')}
          </Button>
        </div>
        <p className="text-sub">12명</p>
      </div>

      <UserCard name="gwjun" message="hello world">
        <Button
          type="button"
          onClick={() => navigate(PATH.chatRoom(1))}
          size="icon"
          className="[&_svg]:size-5"
          aria-label="Chat Button"
        >
          <MessageCircleMore className="w-full h-full" aria-label="Chat Icon" />
        </Button>
      </UserCard>
    </div>
  )
}
