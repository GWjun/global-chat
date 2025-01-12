import { HttpResponse } from 'msw'
import { ERROR_CODES } from '@constants/errorCodes.ts'

interface Props<T> {
  status: number
  body?: T
  error?: {
    statusCode: number
    errorCode: string
    message: string
  }
  headers?: HeadersInit
}

type ErrorCodeKey = keyof typeof ERROR_CODES

export const getErrorResponse = (errorCode: ErrorCodeKey) => {
  const error = ERROR_CODES[errorCode]

  return {
    statusCode: error.statusCode,
    errorCode,
    message: errorCode,
  }
}

export const mswResponse = <T>({ status, body, error, headers }: Props<T>) => {
  if (status >= 200 && status <= 299) {
    return HttpResponse.json({ ...body }, { status, headers })
  }

  if (status >= 400 && status <= 599) {
    return HttpResponse.json(
      {
        ...error,
      },
      { status },
    )
  }

  return HttpResponse.json({ body }, { status })
}
