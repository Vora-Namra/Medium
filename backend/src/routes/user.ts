import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@100xdevs/medium-common'
import bcrypt from 'bcryptjs';
import { z } from "zod"

export const userRouter = new Hono<{
  Bindings: {//Binding represents what c.env contains 
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()



userRouter.post('/signup', async(c) => {
  try {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({ error: "Invalid input" });
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const existingUser = await prisma.user.findUnique({
      where: {
        username: body.username
      }
    });
    
    if (existingUser) {
      c.status(409);
      return c.json({ error: "Username already taken" });
    }
    const hashedpass = await bcrypt.hash(body.password, 10);
    
    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: hashedpass,
      },
    });

    const jwt = await sign({id:user.id},c.env.JWT_SECRET);

    
    return c.json({ 
      message: "User created successfully",
      userId: user.id,
      token:jwt
    });
    
  } catch (err) {
    c.status(500);
    return c.json({ error: "Server error" });
  }
})


userRouter.post('/signin', async(c) => {
  try {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({ error: "Invalid input" });
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
      }
    });
    
    if (!user) {
      c.status(403);
      return c.json({ error: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      c.status(403);
      return c.json({ error: "Invalid username or password" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "Logged in successfully",
      token: jwt
    });
  } catch (err) {
    c.status(500);
    return c.json({ error: "Server error" });
  }
})

userRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization') || ''
  if (!authHeader) {
    c.status(401)
    return c.json({ error: 'Unauthorized' })
  }

  try {
    const user = await verify(authHeader, c.env.JWT_SECRET)
    // @ts-ignore
    c.set('userId', user.id)
    return next()
  } catch {
    c.status(401)
    return c.json({ error: 'Invalid or expired token' })
  }
})

userRouter.get('/profile', async (c) => {
      //@ts-ignore
  const userId = Number(c.get('userId'))
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL })
    .$extends(withAccelerate())

  const userWithBlogs = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      blogs: {
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
        },
      },
    },
  })

  if (!userWithBlogs) {
    c.status(404)
    return c.json({ error: 'User not found' })
  }

  return c.json({ user: userWithBlogs })
})

const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
})

userRouter.put('/profile', async (c) => {
  // @ts-ignore
  const userId = Number(c.get('userId'))

  const body = await c.req.json()

  // ✂️ Replace signupInput with updateUserSchema here:
  const parsed = updateUserSchema.safeParse(body)
  if (!parsed.success) {
    c.status(400)
    return c.json({ error: 'Invalid input', details: parsed.error.errors })
  }
  const { name, username, password } = parsed.data

  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL })
    .$extends(withAccelerate())

  const dataToUpdate: any = { name, username }
  if (password) {
    dataToUpdate.password = await bcrypt.hash(password, 10)
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
        username: true,
        blogs: {
          select: {
            id: true,
            title: true,
            content: true,
            published: true,
          },
        },
      },
    })
    return c.json({ user: updatedUser })
  } catch (err: any) {
    if (err.code === 'P2002') {
      c.status(409)
      return c.json({ error: 'Email already in use' })
    }
    c.status(500)
    return c.json({ error: 'Could not update profile' })
  }
})