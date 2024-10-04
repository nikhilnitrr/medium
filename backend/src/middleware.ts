import { z } from 'zod'
import { Context, Next } from 'hono'
import * as jwt from 'hono/jwt'

const signupSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8)
})

type signupType = z.infer<typeof signupSchema>

const validateUserSchema = async (c: Context, next: Next) => {
    const requestBody: signupType = await c.req.json()
    const { success } = signupSchema.safeParse(requestBody)
    if (!success) {
        return c.json({
            message: "Signup validation failed"
        }, 403)
    }
    await next()
}

type signinType = Pick<signupType, 'email' | 'password'>

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

const validateSigninSchema = async (c: Context, next: Next) => {
    const requestBody: signinType = await c.req.json()
    const { success } = signinSchema.safeParse(requestBody)
    if (!success) {
        return c.json({
            message: "Signin validation failed"
        }, 403)
    }
    await next()
}

const validateUser = async (c: Context, next: Next) => {
    if (c.req.header) {
        const token = c.req.header('Authorization')
        if (token) {
            const jwtToken = token.split(" ")[1]
            try {
                const decode = await jwt.verify(jwtToken, c.env.JWT_PASSWORD)
                await next()
            }
            catch (err) {
                return c.json({
                    message: "Invalid token"
                }, 403)
            }
        }
        else {
            return c.json({
                message: "Invalid authorization header"
            }, 403)
        }
    }
    return c.json({
        message : "Invalid header"
    },500)
}

const blogPostSchema = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.number()
})

type blogPostType = z.infer<typeof blogPostSchema>

const validateBlogPost = async (c: Context, next: Next) => {
    const requestBody: blogPostType = await c.req.json()
    const { success } = blogPostSchema.safeParse(requestBody)
    if (!success) {
        return c.json({
            message: "Invalid request body"
        }, 403)
    }
    await next()
}

const blogPutSchema = z.object({
    id: z.number(),
    published: z.boolean()
})

type blogPutType = z.infer<typeof blogPutSchema>

const validateBlogPut = async (c: Context, next: Next) => {
    const requestBody = await c.req.json()
    const { success } = blogPutSchema.safeParse(requestBody)
    if (!success) {
        return c.json({
            message: "Invalid request body"
        }, 403)
    }
    await next()
}

export {
    signupType, validateUserSchema,
    signinType, validateSigninSchema,
    validateUser,
    blogPostType, validateBlogPost,
    blogPutType, validateBlogPut
}