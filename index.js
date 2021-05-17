const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const blogSchema = new mongoose.Schema({
    title:String,
    author:String,
    url:String,
    likes:Number
})
const Blog = new mongoose.model('Blog', blogSchema)

const mongoURL = config.MONGO_URL
mongoose.connect(mongoURL, {
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useFindAndModify:false, 
    useCreateIndex:true})

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs =>{
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response)=> {
    const newBlog = request.body
    const blog = new Blog(newBlog)
    blog.save()
        .then(result => {
            response.json(result)
        })
})



app.listen(config.PORT, ()=>{
    logger.info(`Server running on port ${config.PORT}`)
})

