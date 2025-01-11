import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '#components/_common/Button'

export default function NotFound() {
  const { t } = useTranslation('common')
  const navigate = useNavigate()

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center text-lg font-semibold mb-3">
        {t('notfound.title')}
      </h2>

      <Button
        onClick={() => {
          navigate(-1)
        }}
      >
        {t('notfound.action')}
      </Button>
    </main>
  )
}
