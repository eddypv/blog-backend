const mongoose =  require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String, 
        minLength:3,
        required:true
    },
    author:{
        type:String, 
        minLength:3,
        required:true
    },
    url:{
        type:String, 
        
        required:true,
        validate: {
            validator: function(v) {
              return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    likes:{
        type:Number, 
        min:0,
        required:true
    }
})
blogSchema.set('toJSON',{
    transform :(document, returnedObject) =>{
        returnedObject.id = returnedObject._id 
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Blog = new mongoose.model('Blog', blogSchema)

module.exports = Blog

