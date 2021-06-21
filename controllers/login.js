const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {JWT_SECRET} = require('../utils/config')


loginRouter.post('/', async (request, response, next)=>{
    const {username, password} = request.body
    const error = {error:'username or password is not valid'}
    const user = await User.findOne({username})
    // if username exist
    if(!user){
        response.status(401).send(error)
        return 
    }
    
    const comparePassword = await bcrypt.compare(password, user.password)
    // compare password
    if(comparePassword === false){
        response.status(401).send(error)
        return
    }
    const payload= {
        id:user._id,
        username:user.username
    }
    const token= jwt.sign(payload, JWT_SECRET)

    response.json({
        username:user.username,
        token
    })

    
})

module.exports = loginRouter