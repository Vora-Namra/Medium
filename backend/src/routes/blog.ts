
import { createBlogInput, updateBlogInput } from '@100xdevs/medium-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { decode, verify } from 'hono/jwt';

export const blogRouter = new Hono<{
  Bindings: {//Binding represents what c.env contains 
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId :string
  }
}>()

blogRouter.use("/*",async (c, next)=>{
const authheader =  c.req.header("Authorization") || c.req.header("authorization") ||"";
if(authheader === ""){
    c.status(401);  
    return c.json({error:"Unauthorized"})
    }
const user = await  verify(authheader, c.env.JWT_SECRET)
if(user){
    //@ts-ignore
    c.set("userId", user.id);
   await next();
}else {
    c.status(401);
    return c.json({error:"Unauthorized"})
}
    
});


blogRouter.post('/', async(c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({ error: "Invalid input" });
      }
  const userId = c.get("userId");
  
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(userId)
        }
    })
    return c.json({
        message: "Blog created successfully", id: blog.id})
})


blogRouter.put('/', async(c) => {
 const body = await c.req.json(); 
 const {success} = updateBlogInput.safeParse(body);
     if(!success){
       c.status(411);
       return c.json({ error: "Invalid input" });
     }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const blog = await prisma.blog.update({
        where: {
            id: Number(body.id)
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        message: "Blog updated successfully", id: blog.id})
    }catch(err){
        c.status(411);
        return c.json({ error: "error updating blog" });
    }
})


blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})


blogRouter.get('/:id', async(c) => {
      const id =  c.req.param("id"); 
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

      try{

       const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                },
            }
        })

        return c.json({
            blog
        })
    }catch(err){
        c.status(411);
        return c.json({ error: "error fetching blog" });
    }



})


