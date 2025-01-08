import chatRoutes from './chat/route.ts'

export const baseUrl = '/api/v1'

const routes = [{ route: chatRoutes, prefix: `${baseUrl}/chat` }]

export default routes
