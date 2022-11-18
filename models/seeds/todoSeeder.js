const Todo = require('../todo')
const dataBase = require("../../config/mongoose")

dataBase.once('open',()=>{
    console.log('MongoDB connected!')
    for (let i = 0;i < 10;i ++){
        Todo.create({name: `name-${i}`})

    }
    console.log('seed established')
    
})