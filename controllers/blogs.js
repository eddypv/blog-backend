const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs =>{
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response, next)=> {
    const newBlog = request.body
    const blog = new Blog(newBlog)
    blog.save()
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error) )
})

module.exports = blogRouter