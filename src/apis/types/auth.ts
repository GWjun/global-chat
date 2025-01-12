export interface RequestLogin {
  email: string
  password: string
}

export interface RequestRegister {
  email: string
  password: string
  confirmPassword: string
  nickname: string
}
