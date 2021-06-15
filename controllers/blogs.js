const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next)=> {
    try{
        const newBlog = request.body
        const blog = new Blog(newBlog)
        const result = await blog.save()
        response.json(result)
    }catch(error){
        next(error)
    }
    
})

module.exports = blogRouter