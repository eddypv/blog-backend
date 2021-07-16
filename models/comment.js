const {Schema, model} = require('mongoose')

const CommentSchema = Schema({
  content:{
    type:String,
    default:""
  },
  blog:{
    type:Schema.Types.ObjectId,
    ref:'Blog'
  }

})
CommentSchema.set("toJSON",{
  transform:(document, returnedObject)=>{
    returnedObject.id = returnedObject._id,
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})
const Comment = new model("Comment", CommentSchema)
module.exports = Comment
