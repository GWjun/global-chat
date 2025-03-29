export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  CHAT: '/chat',
  CHATROOM: '/chat/:roomId',
  chatRoom: (roomId: number) => `/chat/${roomId}`,

  FRIEND: '/friend',
  FRIEND_FIND: '/friend/find',

  PROFILE: '/profile',
} as const

export const PROTECTED_ROUTES = [PATH.CHAT, PATH.FRIEND, PATH.PROFILE] as const
