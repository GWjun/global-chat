import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import type { RequestLogin } from '#apis/types/auth.ts'
import { requestPostLogin } from '#apis/domains/auth.ts'

import { toast } from '#hooks/use-toast.ts'
import { session } from '#utils/auth.ts'
import { PATH } from '#routes.tsx'

export function useLoginMutation() {
  const { t } = useTranslation('login')
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RequestLogin) => requestPostLogin(data),
    onSuccess: (response) => {
      const data = response as { accessToken: string }
      session.login(data.accessToken)
      navigate(PATH.chat, { replace: true })
    },
    onError: () => {
      toast({
        title: t('fail'),
        variant: 'destructive',
      })
    },
  })
}
