const Blog = require('../models/blog')
const User = require('../models/user')
const superTest = require('supertest')
const {app} = require('../index')
const api = superTest(app)
const blogs = [
    {
        "title":"Ejemplo 1",
        "author":"author 1",
        "url":"http://localhost.com/api/blogs",
        "likes":0
    },
    {
        "title":"Ejemplo 2",
        "author":"author 2",
        "url":"http://localhost.com/api/blogs",
        "likes":0
    },
    {
        "title":"Ejemplo 3",
        "author":"author 3",
        "url":"http://localhost.com/api/blogs",
        "likes":0
    }
]

const blogsInDb = async () =>{
    const blogs= await Blog.find({})
    const blogList = blogs.map(item => item.title)
    return blogList
}
const usersInDb = async()=>{
    const users = await User.find({})
    const userList = users.map(item => item.username)
    return userList
}
const getUserDefault = async ()=>{
    const userDefault = {
        username:'juan.perez',
        name:"Juan Perez",
        password:"JuanPerez"
    }
    const userCreated = await api.post('/api/users/').send(userDefault)
    return userCreated.body
}

module.exports = {
    blogs,
    blogsInDb,
    usersInDb,
    api,
    getUserDefault
}