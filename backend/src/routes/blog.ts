import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  validateUser,
  validateBlogPut,
  validateBlogPost,
  blogPostType,
  blogPutType,
} from "../middleware";

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    authorId: number;
  };
}>();

blog.get("/id/:id", validateUser, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json(
        {
          message: "Invalid request parameter",
        },
        403
      );
    } else {
      const response = await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
        select: {
          title: true,
          content: true,
          authorId: true,
          author : {
            select : {
              firstName : true,
              lastName : true,
              email : true
            }
          }
        },
      });
      return c.json({
        data: response,
      });
    }
  } catch (err) {
    return c.json(
      {
        message: err,
      },
      500
    );
  }
});

blog.post("/", validateUser, validateBlogPost, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body: blogPostType = await c.req.json();
    const response = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("authorId"),
      },
    });
    return c.json({
      message: "Post created successfully",
      data: response,
    });
  } catch (err) {
    return c.json(
      {
        message: err,
      },
      500
    );
  }
});

blog.put("/", validateUser, validateBlogPut, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: blogPutType = await c.req.json();
    const response = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      message: "Post updated successfully",
      data: response,
    });
  } catch (err) {
    return c.json(
      {
        message: err,
      },
      500
    );
  }
});

// Todo : Add pagination
blog.get("/bulk", validateUser, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const response = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        authorId: true,
        id : true,
        author : {
          select : {
            firstName : true,
            lastName : true,
            email : true 
          }
        }
      },
    });
    return c.json({
      data: response,
    });
  } catch (err) {
    return c.json(
      {
        message: err,
      },
      500
    );
  }
});

export { blog };
