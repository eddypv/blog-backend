const mongoose = require('mongoose')
const {server} = require('../index')
const {blogs, blogsInDb, api, getUserDefault} = require('./helper')
const Blog = require('../models/blog')
const User = require('../models/user')


const URL = "/api/blogs/"
beforeEach(async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({});
    for(const blogItem of blogs){
        const blog = new Blog(blogItem)
        await blog.save()
    }
})

describe("blog list",  ()=>{
    
    test("response api correctly", async()=>{
        await api
        .get(URL)
        .expect("Content-Type", /json/)
        .expect(200)
        
    })
    test("get length correctly", async ()=>{
        const response =  await api.get(URL)
        expect(response.body).toHaveLength(blogs.length)
                            
    })                      
    test("defined the property id", async()=>{
        const response = await api.get(URL)
        const {body:blogList} = response 
        blogList.forEach((item)=>{
            expect(item.id).toBeDefined()
        })
    })  
})

describe("create blog", ()=>{
    test("when register correctly", async()=>{
        const userCreated = await getUserDefault()
        
        const newBlog = {
            title:"Ejemplo 1",
            author:"author",
            url:"http://localhost.com/api/blogs",
            likes:0,
            userId:userCreated.id
        }
        await api
            .post(URL)
            .send(newBlog)
            .expect(200)
        const blogList = await blogsInDb()
        expect(blogList).toHaveLength(blogs.length +1)
        expect(blogList).toContainEqual(newBlog.title)

    })
    test("when do not send the property likes by default is zero", async()=>{
        const userCreated = await getUserDefault()
        const newBlog = {
            title:"Ejemplo sin likes",
            author:"author",
            url:"http://localhost.com/api/blogs",
            userId:userCreated.id
        }
        await api
                .post(URL)
                .send(newBlog)
                .expect(200)
                .expect("Content-Type", /json/)
        
        const blogList = await blogsInDb()
        expect(blogList).toHaveLength(blogs.length +1)
        expect(blogList).toContain(newBlog.title)
    })
    test("when do not send the properties title and url and response Bad request", async()=>{
        const newBlog = {
            author:"author"
        }
        await api 
            .post(URL)
            .send(newBlog)
            .expect("Content-Type", /json/)
            .expect(400)
        
    })
})
afterAll(()=>{
    mongoose.connection.close()
    server.close()
})
