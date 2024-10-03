import { Hono } from "hono"
import {blog} from "./routes/blog"
import { signin } from './routes/sigin'
import { signup } from './routes/signup'

const app = new Hono()


app.route('/api/v1/blog', blog)
app.route('/api/v1/signup', signup)
app.route('/api/v1/signin', signin)

export default app
