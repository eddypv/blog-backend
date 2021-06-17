const mongoose = require('mongoose')
const {server} = require('../index')
const {api, usersInDb} = require('./helper')
const User = require('../models/user')

const URL = '/api/users/'
beforeEach(async ()=>{
    await User.deleteMany({})
    const UserTest = new User({
        username:"eddy.perez.velasques",
        password:"Howie"
    })
    await UserTest.save()

})
describe('create a user', () =>{
    test('when all fields are correct', async()=>{
        const userBefore = await usersInDb()
        const newUser = {
            name:"Eddy Perez",
            username:"eddy.perez",
            password:"Howie"
        }
        await api
            .post(URL)
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /json/)
        const userAfter = await usersInDb()
        expect(userAfter).toHaveLength(userBefore.length+1)
        expect(userAfter).toContain(newUser.username)

    })
    test('when username already exist', async()=>{
        const usersBefore = await usersInDb()
        const newUser = {
            username:"eddy.perez.velasques",
            password:"Howie"
        }
        const response =await api
            .post(URL)
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /json/)
        
        const usersAfter = await usersInDb()
        expect(response.body.error).toBeDefined()
        expect(usersBefore).toHaveLength(usersAfter.length)
        
    })
    
    test('validating username minimum length', async()=>{
        const usersBefore = await usersInDb()
        const newUser = {
            username:"ed",
            password:"Howie"
        }
        const response =await api
            .post(URL)
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /json/)
        
        const usersAfter = await usersInDb()
        expect(response.body.error).toBeDefined()
        expect(usersBefore).toHaveLength(usersAfter.length)
        
    })
    test('validating password minimum length', async()=>{
        const usersBefore = await usersInDb()
        const newUser = {
            username:"edsd",
            password:"Ho"
        }
        const response =await api
            .post(URL)
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /json/)
        
        const usersAfter = await usersInDb()
        expect(response.body.error).toBeDefined()
        expect(usersBefore).toHaveLength(usersAfter.length)
        
    })
})

afterAll(()=>{
    mongoose.connection.close()
    server.close()
})