import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { requestPostRegister } from '#apis/domains/auth.ts'

import { toast } from '#hooks/use-toast.ts'
import { useAuthStore } from '#stores/authStore.ts'
import { PATH } from '#routes.tsx'

export function useRegisterMutation() {
  const { t } = useTranslation('register')

  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: requestPostRegister,
    onSuccess: (response) => {
      toast({
        title: t('success'),
      })
      setAccessToken(response.accessToken)
      navigate(PATH.chat, { replace: true })
    },
  })
}
