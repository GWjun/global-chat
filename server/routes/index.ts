import authRouter from '@routes/auth/route.ts'
import chatRouter from '@routes/chat/route.ts'
import { BASE_URL, END_POINTS } from '@routes/path.ts'

const routes = [
  { route: authRouter, prefix: `${BASE_URL}/${END_POINTS.AUTH}` },
  { route: chatRouter, prefix: `${BASE_URL}/${END_POINTS.CHAT}` },
]

export default routes
