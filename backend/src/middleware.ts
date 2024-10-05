import { Context, Next } from "hono";
import * as jwt from "hono/jwt";
import {
  signinSchema,
  signupSchema,
  signupType,
  signinType,
  blogPutSchema,
  blogPostSchema,
  blogPostType,
  blogPutType,
} from "@nikhilnitrr/zod-common";

const validateUserSchema = async (c: Context, next: Next) => {
  const requestBody: signupType = await c.req.json();
  const { success } = signupSchema.safeParse(requestBody);
  if (!success) {
    return c.json(
      {
        message: "Signup validation failed",
      },
      403
    );
  }
  await next();
};

const validateSigninSchema = async (c: Context, next: Next) => {
  const requestBody: signinType = await c.req.json();
  const { success } = signinSchema.safeParse(requestBody);
  if (!success) {
    return c.json(
      {
        message: "Signin validation failed",
      },
      403
    );
  }
  await next();
};

const validateUser = async (c: Context, next: Next) => {
  if (c.req.header) {
    const token = c.req.header("Authorization");
    if (token) {
      const jwtToken = token.split(" ")[1];
      try {
        const decode = await jwt.verify(jwtToken, c.env.JWT_PASSWORD);
        c.set("authorId", decode.id);
        await next();
      } catch (err) {
        return c.json(
          {
            message: "Invalid token",
          },
          403
        );
      }
    } else {
      return c.json(
        {
          message: "Invalid authorization header",
        },
        403
      );
    }
  }
  return c.json(
    {
      message: "Invalid header",
    },
    500
  );
};

const validateBlogPost = async (c: Context, next: Next) => {
  const requestBody: blogPostType = await c.req.json();
  const { success } = blogPostSchema.safeParse(requestBody);
  if (!success) {
    return c.json(
      {
        message: "Invalid request body",
      },
      403
    );
  }
  await next();
};

const validateBlogPut = async (c: Context, next: Next) => {
  const requestBody = await c.req.json();
  const { success } = blogPutSchema.safeParse(requestBody);
  if (!success) {
    return c.json(
      {
        message: "Invalid request body",
      },
      403
    );
  }
  await next();
};

export {
  signupType,
  validateUserSchema,
  signinType,
  validateSigninSchema,
  validateUser,
  blogPostType,
  validateBlogPost,
  blogPutType,
  validateBlogPut,
};
