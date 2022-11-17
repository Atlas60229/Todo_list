const mongoose = require('mongoose')
const Todo = require('../todo')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
const dataBase = mongoose.connection
dataBase.on('error',()=>{
    console.log("mongoDB error")
})
dataBase.once('open',()=>{
    console.log('MongoDB connected!')
     for (let i = 0;i < 10;i ++){
        Todo.create({name: `name-${i}`})

     }
    
})