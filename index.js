const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')


const mongoURL = config.MONGO_URL
mongoose.connect(mongoURL, {
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useFindAndModify:false, 
    useCreateIndex:true})

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRouter)




app.listen(config.PORT, ()=>{
    logger.info(`Server running on port ${config.PORT}`)
})

