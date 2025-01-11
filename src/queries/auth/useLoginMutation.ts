import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import type { RequestLogin } from '#apis/types/auth.ts'
import { requestPostLogin } from '#apis/domains/auth.ts'

import { toast } from '#hooks/use-toast.ts'
import { useAuthStore } from '#stores/authStore.ts'
import { PATH } from '#routes.tsx'

export function useLoginMutation() {
  const { t } = useTranslation('login')
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RequestLogin) => requestPostLogin(data),
    onSuccess: (response) => {
      setAccessToken(response.accessToken)
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
