import type { FastifySchema } from 'fastify'

export interface UpdateProfileDto {
  nickname?: string
  password?: string
  newPassword?: string
}

export const UpdateProfileSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      nickname: { type: 'string', minLength: 4 },
      password: { type: 'string', minLength: 4 },
      newPassword: { type: 'string', minLength: 4 },
    },
  },
}
