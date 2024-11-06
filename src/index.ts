import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { authRouter } from "@/presentation/router/auth-router";
import { noteRouter } from "@/presentation/router/note-router";

const _app = new Elysia()
  // plugins
  .use(cors())
  .use(swagger())
  // router
  .use(authRouter)
  .use(noteRouter)
  // port
  .listen(3000);

console.log("Backend is running on port 3000");
