import { ERROR_CODES } from '@constants/errorCodes.ts'

type ErrorCodeKey = keyof typeof ERROR_CODES

export default function getErrorCode(error: ErrorCodeKey) {
  return error
}
