const mongoose = require('mongoose')
const {server} = require('../index')
const {blogs, blogsInDb, api, getUserDefault, userDefault, getLogin} = require('./helper')
const Blog = require('../models/blog')
const User = require('../models/user')


const URL = "/api/blogs/"
beforeEach(async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({});
    const userCreated = await getUserDefault(userDefault)
    for(const blogItem of blogs){
        blogItem.user= userCreated.id
        const blog = new Blog(blogItem)
        await blog.save()
    }
})

describe("blog list",  ()=>{
    
    test("response api correctly", async()=>{
        const {username, password} = userDefault
        const loginResponse = await getLogin(username, password)
        await api
        .get(URL)
        .set("Authorization", `Bearer ${loginResponse.token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        
    })
    test("get length correctly", async ()=>{
        const {username, password} = userDefault
        const loginResponse = await getLogin(username, password)

        const response =  await api.get(URL).set("Authorization", `Bearer ${loginResponse.token}`)
        expect(response.body).toHaveLength(blogs.length)
                            
    })                      
    test("defined the property id", async()=>{
        const {username, password} = userDefault
        const loginResponse = await getLogin(username, password)
        const response = await api.get(URL).set("Authorization", `Bearer ${loginResponse.token}`)
        const {body:blogList} = response 
        blogList.forEach((item)=>{
            expect(item.id).toBeDefined()
        })
    })
      
})

describe("create blog", ()=>{
    test("when register correctly", async()=>{
        const {username, password} = userDefault
        const loginResponse = await getLogin(username, password)
        
        const newBlog = {
            title:"Ejemplo 1",
            author:"author",
            url:"http://localhost.com/api/blogs",
            likes:0
        }
        await api
            .post(URL)
            .set("Authorization", `Bearer ${loginResponse.token}`)
            .send(newBlog)
            .expect(200)
        const blogList = await blogsInDb()
        expect(blogList).toHaveLength(blogs.length +1)
        expect(blogList).toContainEqual(newBlog.title)

    })
    test("when do not send the property likes by default is zero", async()=>{
        const {username, password} = userDefault
        const loginResponse = await getLogin(username, password)
        const userCreated = await getUserDefault()
        const newBlog = {
            title:"Ejemplo sin likes",
            author:"author",
            url:"http://localhost.com/api/blogs",
            userId:userCreated.id
        }
        await api
                .post(URL)
                .set("Authorization", `Bearer ${loginResponse.token}`)
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
        const {username, password} = userDefault
        const loginResponse = await getLogin(username, password)
        await api 
            .post(URL)
            .set("Authorization", `Bearer ${loginResponse.token}`)
            .send(newBlog)
            .expect("Content-Type", /json/)
            .expect(400)
        
    })
})
describe("The blog fails", ()=>{
    test("when header Authorization  is empty", async()=>{
        const response = await api 
            .get(URL)
            .set("Authorization", '')
            .expect("Content-Type", /json/)
            .expect(401)

        expect(response.body.error).toBeDefined()
    })
    test("when not found header Authorization", async()=>{
        const response = await api 
            .get(URL)
            .expect("Content-Type", /json/)
            .expect(401)

        expect(response.body.error).toBeDefined()
    })
    test("when token is invalid", async()=>{
        const response = await api 
            .get(URL)
            .set("Authorization", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDBiYzFlNDk5Zjc0NGRmMGFmMTFkMCIsInVzZXJuYW1lIjoiZWRkeS5wZXJleiIsImlhdCI6MTYyNDMwNDY0Mn0.Plrff3JSgeB-CjP-FKNJHkCUQMG9Lc-YrFgxRP2gx7i')
            .expect("Content-Type", /json/)
            .expect(401)

        expect(response.body.error).toBeDefined()
    })
})

afterAll(()=>{
    mongoose.connection.close()
    server.close()
})
