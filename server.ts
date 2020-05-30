import { Application, Router, RouterContext } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import "https://deno.land/x/dotenv@v0.4.1/load.ts";
import { userMiddleware } from "./userMiddleware.ts";
import { authMiddleware } from "./authMiddleware.ts";
import { home, login, register, postLogin, postRegister, protectedRoute, logout } from "./routes.ts";

const app = new Application();
const router = new Router();

app.use(userMiddleware)

router
  .get("/", home)
  .get("/login", login)
  .get("/register", register)
  .post("/login", postLogin)
  .post("/register", postRegister)
  .get("/protected", authMiddleware, protectedRoute)
  .get("/logout", logout);

app.addEventListener('error', evt => {
  console.log(evt.error);
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
console.log("Started listening on port: 8000");
