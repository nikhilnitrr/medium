import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { validateSigninSchema, signinType } from '../middleware'
import * as jwt from 'jsonwebtoken'

const JWT_PASSWORD = ''


const signin = new Hono<{
    Bindings : {
        DATABASE_URL : string
    }
}>()

signin.post('/', validateSigninSchema, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const requestBody : signinType = await c.req.json()
        const userExist = await prisma.user.findUnique({
            where : {
                email : requestBody.email
            }
        })
        if(!userExist){
            return c.json({
                message : "User doesnot exist, please signup first"
            }, 403)
        }
        if(requestBody.password === userExist.password){
            return c.json({
                message : "User signed in successfully",
                token : jwt.sign({id : userExist.id}, JWT_PASSWORD)
            },200)
        }
        return c.json({
            message : "Invalid signin input"
        }, 403)
    }
    catch(err){
        return c.json({
            message : err
        }, 500)
    }
})

export {signin}