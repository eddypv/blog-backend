const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name:{
        type:String,
        default:""
    },
    username :{
        type:String,
        required:true,
        unique:true,
        minLength:3
    },
    password:{
        type:String,
        required:true,
        minLength:3
    },
    blogs:[
        {
            type:Schema.Types.ObjectId,
            ref:"Blog"
        }
    ]

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
