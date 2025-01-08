import authRoutes from '@routes/auth/route.ts'
import chatRoutes from '@routes/chat/route.ts'

export const baseUrl = '/api/v1'

const routes = [
  { route: authRoutes, prefix: `${baseUrl}/auth` },
  { route: chatRoutes, prefix: `${baseUrl}/chat` },
]

export default routes
