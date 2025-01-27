import { FastifyInstance } from 'fastify'
import {
  FriendListQuery,
  FriendListSchema,
  FriendSearchQuery,
  FriendSearchSchema,
  FriendRequestDto,
  FriendRequestSchema,
  FriendStatusDto,
  FriendStatusSchema,
  FriendDeleteSchema,
} from '@dto/friend'
import { FriendService } from '@services/friend'
import { getAPIError } from '@utils/getAPIError'

export default async function friendRouter(fastify: FastifyInstance) {
  const friendService = new FriendService()

  // Get friend list by userId
  fastify.get<{ Querystring: FriendListQuery }>(
    '/list',
    {
      onRequest: fastify.authenticate,
      schema: FriendListSchema,
    },
    async (req, reply) => {
      const userId = req.user.id
      const { cursor, pageSize } = req.query
      const friends = await friendService.getFriendList(
        userId,
        cursor,
        pageSize,
      )

      return reply.send(friends)
    },
  )

  // Get friend list by nickname
  fastify.get<{ Querystring: FriendSearchQuery }>(
    '/search',
    {
      onRequest: fastify.authenticate,
      schema: FriendSearchSchema,
    },
    async (req, reply) => {
      const userId = req.user.id
      const { nickname, cursor, pageSize } = req.query
      const results = await friendService.searchFriendsByNickname(
        userId,
        nickname,
        cursor,
        pageSize,
      )

      return reply.send(results)
    },
  )

  // Post friend request
  fastify.post<{ Body: FriendRequestDto }>(
    '/request',
    {
      onRequest: fastify.authenticate,
      schema: FriendRequestSchema,
    },
    async (req, reply) => {
      const userId = req.user.id
      const requestData = req.body

      if (userId === requestData.friendId) {
        getAPIError('INVALID_REQUEST')
      }

      const result = await friendService.requestFriend(userId, requestData)

      return reply.send(result)
    },
  )

  // Put friend request accept or reject
  fastify.put<{
    Params: { id: string }
    Body: FriendStatusDto
  }>(
    '/request/:id',
    {
      onRequest: fastify.authenticate,
      schema: FriendStatusSchema,
    },
    async (req, reply) => {
      const userId = req.user.id
      const { id } = req.params
      const { status } = req.body
      const result = await friendService.respondToFriendRequest(
        userId,
        id,
        status,
      )

      return reply.send(result)
    },
  )

  // Delete friend
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    {
      onRequest: fastify.authenticate,
      schema: FriendDeleteSchema,
    },
    async (req, reply) => {
      const userId = req.user.id
      const { id: friendId } = req.params
      const result = await friendService.deleteFriend(userId, friendId)

      return reply.send(result)
    },
  )
}
