const logger = require('./logger')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../utils/config')

const requestLogger = (request, response, next) =>{
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('--------------------')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }else if(error.name === "MongoError"){
      return response.status(400).json({ error: error.message })
    }else if(error.name === 'JsonWebTokenError'){
      console.log("Middleware JSONWeb")
      return response.status(401).json({error:'Token is invalid or missing'})
    }
    
    next(error)
  }
const userExtractor = (request, response, next) =>{
  try{
    const authorization = request.get('Authorization')
    if(!authorization){
      const error = new Error('Error')
      error.name ='JsonWebTokenError'
      next(error)
      return 
    }
    let [type, token] = authorization.split(' ')
    type = type.toLowerCase()

    
    if(type  !== 'bearer'){
      const error = new Error('Error')
      error.name ='JsonWebTokenError'
      next(error)
      return 
    }
    console.log("virify")
    const payload  = jwt.verify(token, JWT_SECRET)
    request.user = payload.id
    next()
  }catch(error){
    // pass the error to middleware error 
    console.log("errooooo r", error)
    next(error)
  }
}
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userExtractor
}