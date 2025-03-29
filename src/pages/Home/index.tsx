import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Languages, MonitorSmartphone, Users } from 'lucide-react'

import { Button } from '#components/_common/Button'
import { PATH } from '#routes/path.ts'

export default function Home() {
  const { t } = useTranslation('home')
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh] m-auto px-5">
      <h2 className="text-3xl font-bold mb-2">{t('title')}</h2>
      <p className="text-sub">{t('description')}</p>

      <div className="flex flex-col items-center gap-4 w-full my-8">
        <div className="flex items-center gap-3 w-full p-4 bg-background rounded-lg shadow-sm">
          <div className="flex items-center justify-center w-14 h-14 bg-gray-200 rounded-full">
            <Languages size={26} />
          </div>
          <div>
            <span className="font-semibold">{t('first.title')}</span>
            <p className="text-sub">{t('first.description')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full p-4 bg-background rounded-lg shadow-sm">
          <div className="flex items-center justify-center w-14 h-14 bg-gray-200 rounded-full">
            <Users size={26} />
          </div>
          <div>
            <span className="font-semibold">{t('second.title')}</span>
            <p className="text-sub">{t('second.description')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full p-4 bg-background rounded-lg shadow-sm">
          <div className="flex items-center justify-center w-14 h-14 bg-gray-200 rounded-full">
            <MonitorSmartphone size={26} />
          </div>
          <div>
            <span className="font-semibold">{t('third.title')}</span>
            <p className="text-sub">{t('third.description')}</p>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => navigate(PATH.LOGIN)}
        className="w-full h-12 text-md mb-3"
      >
        {t('login')}
      </Button>
      <Button type="button" variant="secondary" className="w-full h-12 text-md">
        {t('randomChat')}
      </Button>
    </main>
  )
}
