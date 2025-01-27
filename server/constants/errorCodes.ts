export const ERROR_CODES = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
  },
  ERROR_CODES_ERROR: {
    statusCode: 500,
  },
  INVALID_REQUEST: {
    statusCode: 400,
  },
  EMAIL_ALREADY_EXIST: {
    statusCode: 400,
  },
  UNAUTHORIZED: {
    statusCode: 401,
  },
  SESSION_EXPIRED: {
    statusCode: 401,
  },
  USER_NOT_FOUND: {
    statusCode: 404,
  },
  TOO_MANY_REQUEST: {
    statusCode: 429,
  },

  // Friend
  FRIEND_REQUEST_ALREADY_EXISTS: {
    statusCode: 400,
  },
  ALREADY_FRIENDS: {
    statusCode: 400,
  },
} as const
