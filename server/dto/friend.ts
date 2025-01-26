import type { FastifySchema } from 'fastify'

export interface FriendSearchQuery {
  nickname: string
}

export interface FriendRequestDto {
  friendId: string
}

export interface FriendStatusDto {
  status: 'ACCEPTED' | 'REJECTED'
}

export const FriendSearchSchema: FastifySchema = {
  querystring: {
    type: 'object',
    required: ['nickname'],
    properties: {
      nickname: { type: 'string', minLength: 2 },
    },
  },
}

export const FriendRequestSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['friendId'],
    properties: {
      friendId: { type: 'string', format: 'uuid' },
    },
  },
}

export const FriendStatusSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['status'],
    properties: {
      status: {
        type: 'string',
        enum: ['ACCEPTED', 'REJECTED'],
      },
    },
  },
}

export const FriendDeleteSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
}
