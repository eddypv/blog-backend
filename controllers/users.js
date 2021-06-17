const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next)=>{
    const {name, username, password} = request.body
    try{
        const salt = 10
        const passwordHash= bcrypt.hash(password, salt)
        const newUser = new User({
            name, username, passwordHash
        })
        
        const userCreated = await newUser.save()
        response.json(userCreated)

    }catch(error){
        next(error)
    }

})
module.exports = usersRouter