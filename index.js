const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const {requestLogger, unknownEndpoint, errorHandler, userExtractor } = require('./utils/middleware')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoURL = config.MONGO_URL
mongoose.connect(mongoURL, {
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useFindAndModify:false, 
    useCreateIndex:true})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(requestLogger) 
app.use('/api/blogs',userExtractor,blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
// only in test
if(process.env.NODE_ENV === "test"){
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)



const server = app.listen(config.PORT, ()=>{
    logger.info(`Server running on port ${config.PORT}`)
})

module.exports ={
    app,
    server
}