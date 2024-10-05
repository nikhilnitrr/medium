import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { validateUserSchema, signupType } from "../middleware";
import * as jwt from "hono/jwt";

const signup = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PASSWORD: string;
  };
}>();

signup.post("/", validateUserSchema, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const requestBody: signupType = await c.req.json();
    const userExist = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });
    if (userExist) {
      return c.json(
        {
          message: "User already exist",
        },
        403
      );
    }
    const userId = await prisma.user.create({
      data: {
        email: requestBody.email,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
        password: requestBody.password,
      },
    });
    const token = await jwt.sign({ id: userId.id }, c.env.JWT_PASSWORD);
    return c.json(
      {
        message: "User created successfully",
        token,
      },
      200
    );
  } catch (err) {
    return c.json(
      {
        message: err,
      },
      500
    );
  }
});

export { signup };
