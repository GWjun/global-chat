import { ERROR_CODES } from '@constants/errorCodes.ts'
import APIError from '#apis/APIError.ts'

export const getAPIError = (errorCode: keyof typeof ERROR_CODES) => {
  const error = ERROR_CODES[errorCode]
  if (!error) {
    return new APIError(500, 'ERROR_CODES_ERROR')
  }

  return new APIError(error.statusCode, errorCode)
}
