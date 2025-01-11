import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import useForm from '#hooks/useForm.ts'
import { Button } from '#components/_common/Button'
import { Input } from '#components/_common/Input'
import { Label } from '#components/_common/Label'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { PATH } from '#routes.tsx'

import type { RequestLogin } from '#apis/types/auth.ts'
import { useLoginMutation } from '#queries/auth/useLoginMutation.ts'

export default function Login() {
  const { t } = useTranslation('login')
  const navigate = useNavigate()

  const { mutate, isPending } = useLoginMutation()
  const { formRef, handleSubmit, errors } = useForm<RequestLogin>({
    onSubmit: mutate,
    schema: z.object({
      email: z.string().email(t('schema.email')),
      password: z.string().min(1, t('schema.password')),
    }),
  })

  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh] m-auto px-5">
      <h2 className="text-3xl font-bold mb-2">{t('title')}</h2>
      <p className="text-sub mb-10">{t('description')}</p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col w-full"
      >
        <div className="flex flex-col gap-1 min-h-20">
          <Label htmlFor="email">
            <Input
              name="email"
              type="email"
              placeholder={t('email')}
              className="h-12"
            />
          </Label>
          <ErrorMessage errors={errors.email} className="" />
        </div>

        <div className="flex flex-col gap-1 min-h-20 mb-8">
          <Label htmlFor="password">
            <Input
              name="password"
              type="password"
              placeholder={t('password')}
              autoComplete="off"
              className="h-12"
            />
          </Label>
          <ErrorMessage errors={errors.password} className="" />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 text-md mb-3"
        >
          {t('login')}
        </Button>
      </form>

      <Button
        type="button"
        onClick={() => navigate(PATH.register)}
        variant="secondary"
        className="w-full h-12 text-md"
      >
        {t('register')}
      </Button>
    </main>
  )
}
