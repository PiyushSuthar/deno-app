// Importing Modules
import "https://deno.land/x/dotenv/load.ts";
import { oak } from "./deps.ts";

// Importing Stuff
const { Application, Router } = oak;

// Getting ENV variables as Object
const env = Deno.env.toObject();

// Setting HOST and PORT
const HOST = env.HOST || "127.0.0.1";
const PORT: number = parseInt(env.PORT) || 8000;

// Initializing oak
const app = new Application();

const router = new Router();

// Using Route Middleware (It's syntax from Doc :)
app.use(router.routes());
app.use(router.allowedMethods());

// Trying Out Requests
router.get("/:name", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = {
    greet: `Ciao ${ctx.params.name}`,
  };
});

// Listening to Requests
console.log(`Server Running on ${HOST}:${PORT}`);
await app.listen({ port: PORT });
