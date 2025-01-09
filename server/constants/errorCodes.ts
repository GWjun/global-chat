export const ERROR_CODES = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: '서버에 문제가 생겼어요. \\n잠시 후 다시 시도해 주세요.',
  },
  ERROR_CODES_ERROR: {
    statusCode: 500,
    message: '서버에 문제가 생겼어요. \\n잠시 후 다시 시도해 주세요.',
  },
  INVALID_REQUEST: {
    statusCode: 400,
    message: '잘못된 요청입니다.',
  },
  EMAIL_ALREADY_EXIST: {
    statusCode: 400,
    message: '이미 존재하는 이메일 입니다.',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: '로그인 후 이용해 주세요.',
  },
}
