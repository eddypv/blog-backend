const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name:{
        type:String
    },
    username :{
        type:String
    },
    password:{
        type:String
    }

})
UserSchema.set("toJSON", {
    transform : (document, returnedObject)=>{
        returnedObject.id = returnedObject._id,
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password

    }
})

const User = new model('User', UserSchema)

module.exports = User
