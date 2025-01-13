# Global Chat

This project sets up a real-time chat service that leverages the LLM API to provide seamless, natural conversations.

</br>

## Installation

1. Clone the repository and install the dependencies

```bash
pnpm install
```

2. Create a .env file in the root and add the following contents

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
JWT_SECRET=your-jwt-secret
COOKIE_SECRET=your-cookie-secret

VITE_API_URL=http://localhost:3000/api/v1
```

</br>

## Run

1. Start Database

```sh
pnpm docker:start
pnpx prisma generate
```

2. Start Application

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

## Structure

```
├── dist/                # Production build output
├── src/                 # React application source files
│   ├── main.tsx         # Client-side entry point
│   └── route.tsx        # Route object
└── server/              # Fastify server code
    ├── entry.tsx        # Server-side entry point for SSR render
    └── main.ts          # Main server file
```

</br>
