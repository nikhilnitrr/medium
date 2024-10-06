import { Hono } from "hono";
import { Context } from "hono";
import * as jwt from "hono/jwt"

const me = new Hono<{
    Bindings : {
        JWT_PASSWORD : string
    }
}>()

me.get('/', async (c) => {
    const token = c.req.header("Authorization") || ""
    const jwtToken = token.split(" ")[1]
    await jwt.verify(jwtToken, c.env.JWT_PASSWORD)
    return c.json({
        message : "User verified successfully"
    })
})

export {me}