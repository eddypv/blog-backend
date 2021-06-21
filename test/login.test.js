const {api, getUserDefault} = require('./helper')
const {server} = require('../index')
const URL = '/api/login/'
const User = require('../models/user')
const mongoose = require('mongoose')
const userDefault = {
    name:'Juan Perez',
    username:'juan.perez',
    password:'howie.pez'
}
beforeEach(async()=>{
    await User.deleteMany({})
    const user = await getUserDefault(userDefault)
    

})

describe('login', ()=>{
    test('when username and password are correct', async ()=>{
        const {username, password } = userDefault
        const credential = {
            username,
            password
        }
        await api 
            .post(URL)
            .send(credential)
            .expect(200)
            .expect('Content-Type', /json/)

    })
    test('when username is invalid', async ()=>{
        const {password } = userDefault
        const credential = {
            username:'test',
            password
        }
        const response = await api 
            .post(URL)
            .send(credential)
            .expect(401)
            .expect('Content-Type', /json/)
        const {body} = response
        expect(body.error).toBeDefined()

    })
    test('when password is invalid', async ()=>{
        const {username } = userDefault
        const credential = {
            username,
            password:'12313123'
        }
        const response = await api 
            .post(URL)
            .send(credential)
            .expect(401)
            .expect('Content-Type', /json/)
        const {body} = response
        expect(body.error).toBeDefined()

    })
})

afterAll(()=>{
    mongoose.connection.close()
    server.close()
})

