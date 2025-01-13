import { BASE_URL, END_POINTS } from '@routes/path.ts'
import authRouter from '@routes/auth/route.ts'
import chatRouter from '@routes/chat/route.ts'
import userRouter from '@routes/user/route.ts'

const routes = [
  { route: authRouter, prefix: `${BASE_URL}/${END_POINTS.AUTH}` },
  { route: chatRouter, prefix: `${BASE_URL}/${END_POINTS.CHAT}` },
  { route: userRouter, prefix: `${BASE_URL}/${END_POINTS.USER}` },
]

export default routes
