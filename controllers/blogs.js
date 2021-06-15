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

blogRouter.delete('/:id', async (request, response, next)=>{
    try{
        
        const id = request.params.id
        const blogDeleted = await Blog.findByIdAndDelete(id)
        if(blogDeleted){
            response.status(204).end()
        }else{
            next()
        }
        

    }catch(error){
        next(error)
    }

})

blogRouter.put('/:id', async (request, response, next)=>{
    try{
        const blog = request.body
        const id = request.params.id
        const blogUpdated = await Blog.findByIdAndUpdate(id, blog, {new:true})
        if(blogUpdated){
            response.json(blogUpdated)
        }else{
            next()
        }
        

    }catch(error){
        next(error)
    }

})


module.exports = blogRouter