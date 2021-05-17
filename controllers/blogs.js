const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs =>{
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response)=> {
    const newBlog = request.body
    const blog = new Blog(newBlog)
    blog.save()
        .then(result => {
            response.json(result)
        })
})

module.exports = blogRouter