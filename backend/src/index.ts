import { Hono } from "hono";
import { blog } from "./routes/blog";
import { signin } from "./routes/sigin";
import { signup } from "./routes/signup";
import { me } from "./routes/me";
import {cors} from "hono/cors"

const app = new Hono();
app.use("/*", cors())

app.route("/api/v1/blog", blog);
app.route("/api/v1/signup", signup);
app.route("/api/v1/signin", signin);
app.route("/me", me)

export default app;
