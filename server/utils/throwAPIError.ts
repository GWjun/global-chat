import { ERROR_CODES } from '@constants/errorCodes.ts'
import APIError from '#apis/APIError.ts'

export const throwAPIError = (errorCode: keyof typeof ERROR_CODES) => {
  const error = ERROR_CODES[errorCode]
  if (!error) {
    throw new APIError(
      500,
      'ERROR_CODES_ERROR',
      '서버에 문제가 생겼어요. \\n잠시 후 다시 시도해 주세요.',
    )
  }

  throw new APIError(error.statusCode, errorCode, error.message)
}
