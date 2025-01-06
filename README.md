# Vite SSR Boilerplate with Fastify

This repository provides a boilerplate for building server-side rendered (SSR) applications using **Vite** and **Fastify**.

It also supports server and client routing using **React Router**.

</br>

## Installation

Clone the repository and install the dependencies:

```bash
pnpm install
```

</br>

## Run

- **Development:**

  ```bash
  pnpm dev
  ```

  Starts the development server using vite-node.

- **Production Build:**

  ```bash
  pnpm build
  ```

  Generates the client and server builds for production.

- **Start Production Server:**

  ```bash
  pnpm start
  ```

  Builds the application and starts the server in production mode.

</br>

## Route

By declaring route objects in `src/routes.tsx`, routing is handled on both the server and client using `StaticRouterProvider` and `RouterProvider`, respectively.

</br>

## Data Fetching

Using React Router’s `loader`, data can be fetched on the server and delivered to the client.

```tsx
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    loader: async () => {
      // server side code
      return fetch(`https://jsonplaceholder.typicode.com/todos`)
    },
  },
]
```

```tsx
export default function Home() {
  // get ssr data
  const data: TodoType[] = useLoaderData()
  // ...
}
```

</br>

## Structure

```
├── dist/                # Production build output
├── src/                 # React application source files
│   ├── main.tsx         # Client-side entry point
│   └── route.tsx        # Route object
└── server/              # Fastify server code
    ├── entry.tsx        # Server-side entry point for SSR render
    ├── main.ts          # Main server file
    └── util.ts          # Utility function file

```

</br>

## Reference

- https://vite.dev/guide/ssr
- https://reactrouter.com/start/framework/custom
