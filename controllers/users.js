const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next)=>{
    const {name, username, password} = request.body
    try{
        if(password.length < 3){
            const error = new Error('The password is not valid')
            error.name = 'MongoError'
            next(error)
            return 
        }
        const salt = 10
        const passwordHash= await bcrypt.hash(password, salt)
        const newUser = new User({
            name, username, password:passwordHash
        })
        
        const userCreated = await newUser.save()
        response.status(201).json(userCreated)

    }catch(error){
        
        next(error)
    }

})
usersRouter.get('/', async(request, response, next)=>{
    try{
        const users = await User.find({}).populate('blogs', {
            url:1,
            title:1,
            author:1
        })
        response.json(users)
    }catch(error){
        next(error)
    }

})
module.exports = usersRouter