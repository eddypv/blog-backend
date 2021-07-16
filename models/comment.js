const {Schema, model} = require('mongoose')

const CommentSchema = Schema({
  content:{
    type:String,
    default:"",
    required:true
  },
  blog:{
    type:Schema.Types.ObjectId,
    ref:'Blog',
    required:true
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
