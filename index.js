const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const {requestLogger, unknownEndpoint, errorHandler} = require('./utils/middleware')


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
app.use('/api/blogs',blogRouter)
app.use(unknownEndpoint)
app.use(errorHandler)



app.listen(config.PORT, ()=>{
    logger.info(`Server running on port ${config.PORT}`)
})

