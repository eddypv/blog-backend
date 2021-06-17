const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{
       username:1,
       name:1 
    })
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next)=> {
    try{
        const {title, author, likes, url, userId} = request.body
        const blog = new Blog({
            title, 
            author, 
            likes, 
            url, 
            user:userId
        })
        const blogCreated = await blog.save()
        const user = await User.findById(userId)
        user.blogs = user.blogs.concat(blogCreated)
        await user.save()
        response.json(blogCreated)
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