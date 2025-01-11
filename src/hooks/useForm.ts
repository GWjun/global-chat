import type { FormEvent } from 'react'
import type { ZodSchema } from 'zod'
import { useRef, useState } from 'react'

interface FormErrors {
  [key: string]: string
}

interface useFormParams<T> {
  onSubmit: (data: T) => Promise<void> | void
  schema: ZodSchema
}

export default function useForm<T>({ onSubmit, schema }: useFormParams<T>) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)

    const result = schema.safeParse(data)

    if (!result.success) {
      const errorObj: FormErrors = {}
      result.error.errors.forEach((err) => {
        errorObj[err.path[0]] = err.message
      })
      setErrors(errorObj)
      return
    }

    onSubmit(result.data)
    setErrors({})
  }

  return {
    formRef,
    handleSubmit,
    errors,
  }
}
