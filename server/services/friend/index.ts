import prisma from '@utils/prisma'
import { FriendRequestDto } from '@dto/friend'
import { getAPIError } from '@utils/getAPIError'

export class FriendService {
  async getFriendList(userId: string) {
    return prisma.friend
      .findMany({
        where: {
          OR: [{ userId }, { friendId: userId }],
        },
        include: {
          user: true,
          friend: true,
        },
      })
      .then((friends) =>
        friends.map((friend) => ({
          id: friend.userId === userId ? friend.friendId : friend.userId,
          nickname:
            friend.userId === userId
              ? friend.friend.nickname
              : friend.user.nickname,
          profileImage:
            friend.userId === userId
              ? friend.friend.profileImage
              : friend.user.profileImage,
        })),
      )
  }

  async searchFriendsByNickname(userId: string, nickname: string) {
    const friends = await this.getFriendList(userId)
    return friends.filter((friend) =>
      friend.nickname.toLowerCase().includes(nickname.toLowerCase()),
    )
  }

  async requestFriend(userId: string, data: FriendRequestDto) {
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

    if (status === 'ACCEPTED') {
      await prisma.friend.create({
        data: {
          userId: friendRequest.senderId,
          friendId: friendRequest.receiverId,
        },
      })
    }

    await prisma.friendRequest.delete({
      where: {
        id: requestId,
      },
    })

    return {
      status,
      createdAt: friendRequest.createdAt.toISOString(),
      updatedAt: friendRequest.updatedAt.toISOString(),
    }
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
