# Global Chat

This project sets up a real-time chat service that leverages the LLM API to provide seamless, natural conversations.

</br>

## Installation

1. Clone the repository and install the dependencies

   ```bash
   git clone https://github.com/GWjun/global-chat.git
   cd global-chat
   yarn install
   ```

2. Create a .env file

   ```bash
   cp .env.example .env
   ```

## Run

1. Start Database

   ```sh
   yarn docker:start
   npx prisma db push
   ```

2. Start Application

- **Development:**

  ```bash
  yarn dev
  ```

- **Start Production Server:**

  ```bash
  yarn start
  ```

  Builds the application and starts the server in production mode.

</br>

## Structure

```
├── dist/                # Production build output
├── src/                 # React application source files
│   ├── main.tsx         # Client-side entry point
│   └── routes/           # Route objects
└── server/              # Fastify server code
    ├── entry.tsx        # Server-side entry point for SSR render
    └── main.ts          # Main server file
```

</br>
