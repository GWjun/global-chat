export interface User {
  id: string
  email: string
  password: string
  nickname: string
  language: string
}

export const initialUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password1234',
    nickname: 'admin',
    language: 'ko',
  },
]

export const getUsers = () => [...initialUsers]

export const setUsers = (users: User[]) => {
  initialUsers.length = 0
  initialUsers.push(...users)
}
