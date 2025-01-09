import authRoutes from '@routes/auth/route.ts'
import chatRoutes from '@routes/chat/route.ts'
import { BASE_URL, END_POINTS } from '@routes/path.ts'

const routes = [
  { route: authRoutes, prefix: `${BASE_URL}/${END_POINTS.AUTH}` },
  { route: chatRoutes, prefix: `${BASE_URL}/${END_POINTS.CHAT}` },
]

export default routes
