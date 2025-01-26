import { BASE_URL, END_POINTS } from '@routes/path.ts'
import authRouter from '@routes/auth/route.ts'
import chatRouter from '@routes/chat/route.ts'
import userRouter from '@routes/user/route.ts'
import friendRouter from '@routes/friend/route.ts'

const routes = [
  { route: authRouter, prefix: `${BASE_URL}/${END_POINTS.AUTH}` },
  { route: chatRouter, prefix: `${BASE_URL}/${END_POINTS.CHAT}` },
  { route: userRouter, prefix: `${BASE_URL}/${END_POINTS.USER}` },
  { route: friendRouter, prefix: `${BASE_URL}/${END_POINTS.FRIEND}` },
]

export default routes
