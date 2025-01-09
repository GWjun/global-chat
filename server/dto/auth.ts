import type { FastifySchema } from 'fastify'

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  nickname: string
  language: string
}

export const LoginSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
}

export const RegisterSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'password', 'nickname', 'language'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 4 },
      nickname: { type: 'string', minLength: 4 },
      language: { type: 'string' },
    },
  },
}
