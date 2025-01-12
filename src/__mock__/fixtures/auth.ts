export interface User {
  id: string
  email: string
  nickname: string
  language: string
}

export const initialUsers: User[] = [
  {
    id: '1',
    email: 'gwjun@naver.com',
    nickname: 'gwjun',
    language: 'ko',
  },
]

export const getUsers = () => [...initialUsers]

export const setUsers = (users: User[]) => {
  initialUsers.length = 0
  initialUsers.push(...users)
}
