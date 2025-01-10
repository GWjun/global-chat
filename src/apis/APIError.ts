class APIError extends Error {
  statusCode: number
  errorCode: string

  constructor(statusCode: number, errorCode: string) {
    super()

    this.statusCode = statusCode
    this.errorCode = errorCode
  }
}

export default APIError
