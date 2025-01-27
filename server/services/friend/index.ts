import prisma from '@utils/prisma'
import { FriendRequestDto } from '@dto/friend'
import { getAPIError } from '@utils/getAPIError'

export class FriendService {
  async getFriendList(userId: string, cursor?: string, pageSize: number = 10) {
    const friends = await prisma.friend.findMany({
      where: {
        OR: [{ userId }, { friendId: userId }],
      },
      include: {
        user: true,
        friend: true,
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: 'asc',
      },
    })

    const hasNextPage = friends.length > pageSize
    const filteredFriends = hasNextPage ? friends.slice(0, -1) : friends

    const mappedFriends = filteredFriends.map((friend) => ({
      id: friend.userId === userId ? friend.friendId : friend.userId,
      nickname:
        friend.userId === userId
          ? friend.friend.nickname
          : friend.user.nickname,
      profileImage:
        friend.userId === userId
          ? friend.friend.profileImage
          : friend.user.profileImage,
    }))

    return {
      friends: mappedFriends,
      hasNextPage,
      nextCursor: hasNextPage ? friends[friends.length - 1].id : null,
    }
  }

  async searchFriendsByNickname(
    userId: string,
    nickname: string,
    cursor?: string,
    pageSize: number = 10,
  ) {
    const friends = await prisma.friend.findMany({
      where: {
        OR: [
          {
            userId,
            friend: {
              nickname: {
                contains: nickname,
                mode: 'insensitive',
              },
            },
          },
          {
            friendId: userId,
            user: {
              nickname: {
                contains: nickname,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        user: true,
        friend: true,
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: 'asc',
      },
    })

    const hasNextPage = friends.length > pageSize
    const filteredFriends = hasNextPage ? friends.slice(0, -1) : friends

    const mappedFriends = filteredFriends.map((friend) => ({
      id: friend.userId === userId ? friend.friendId : friend.userId,
      nickname:
        friend.userId === userId
          ? friend.friend.nickname
          : friend.user.nickname,
      profileImage:
        friend.userId === userId
          ? friend.friend.profileImage
          : friend.user.profileImage,
    }))

    return {
      friends: mappedFriends,
      hasNextPage,
      nextCursor: hasNextPage ? friends[friends.length - 1].id : null,
    }
  }

  async requestFriend(userId: string, data: FriendRequestDto) {
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: data.friendId },
          { senderId: data.friendId, receiverId: userId },
        ],
        status: 'PENDING',
      },
    })

    if (existingRequest) {
      throw getAPIError('FRIEND_REQUEST_ALREADY_EXISTS')
    }

    const existingFriend = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId: data.friendId },
          { userId: data.friendId, friendId: userId },
        ],
      },
    })

    if (existingFriend) {
      throw getAPIError('ALREADY_FRIENDS')
    }

    const result = await prisma.friendRequest.create({
      data: {
        senderId: userId,
        receiverId: data.friendId,
        status: 'PENDING',
      },
    })

    return {
      ...result,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    }
  }

  async respondToFriendRequest(
    userId: string,
    requestId: string,
    status: 'ACCEPTED' | 'REJECTED',
  ) {
    const friendRequest = await prisma.friendRequest.findFirst({
      where: {
        id: requestId,
        receiverId: userId,
        status: 'PENDING',
      },
    })

    if (!friendRequest) {
      throw getAPIError('INVALID_REQUEST')
    }

    const result = await prisma.$transaction(async (tx) => {
      if (status === 'ACCEPTED') {
        await tx.friend.create({
          data: {
            userId: friendRequest.senderId,
            friendId: friendRequest.receiverId,
          },
        })
      }

      await tx.friendRequest.delete({
        where: {
          id: requestId,
        },
      })

      return {
        status,
        createdAt: friendRequest.createdAt.toISOString(),
        updatedAt: friendRequest.updatedAt.toISOString(),
      }
    })

    return result
  }

  async deleteFriend(userId: string, friendId: string) {
    const friend = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    })

    if (!friend) {
      throw getAPIError('INVALID_REQUEST')
    }

    await prisma.friend.delete({
      where: {
        id: friend.id,
      },
    })

    return {
      success: true,
    }
  }
}
