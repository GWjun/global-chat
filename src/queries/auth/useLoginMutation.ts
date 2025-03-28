import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { requestPostLogin } from '#apis/domains/auth.ts'

import { toast } from '#hooks/useToast.ts'
import { useAuthStore } from '#stores/authStore.ts'

import { PATH } from '#routes/path.ts'

export function useLoginMutation() {
  const { t } = useTranslation('login')
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: requestPostLogin,
    onSuccess: (response) => {
      setAccessToken(response.accessToken)
      navigate(PATH.CHAT, { replace: true })
    },
    onError: () => {
      toast({
        title: t('fail'),
        variant: 'destructive',
      })
    },
  })
}
