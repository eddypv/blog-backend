require('dotenv').config() 
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
let MONGO_URL =""

if(NODE_ENV === "test")
    MONGO_URL = process.env.MONGO_URL_TEST
else 
    MONGO_URL = process.env.MONGO_URL

module.exports ={
    PORT,
    MONGO_URL
}