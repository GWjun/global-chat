import { useRouteError } from 'react-router'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Button } from '#components/_common/Button'

export default function Error({ isRootError }: { isRootError?: boolean }) {
  const { t } = useTranslation('common')
  const error = useRouteError() as Error
  const { reset } = useQueryErrorResetBoundary()

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center text-lg font-semibold mb-3">
        {t('error.title')}
      </h2>

      {isRootError && <p className="mb-3">{error.message}</p>}

      <Button
        onClick={() => {
          reset()
          window.location.reload()
        }}
      >
        {t('error.action')}
      </Button>
    </main>
  )
}
