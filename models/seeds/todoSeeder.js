const Todo = require('../todo')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const dataBase = require("../../config/mongoose")
const bcrypt = require('bcryptjs')
const User = require('../user')
const SEED_USER = {
    name: "seed",
    email: "seed@alpha.camp",
    password: "12345678"

}

dataBase.once('open',()=>{
    console.log('MongoDB connected!')
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt)) 
        .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
        }))
        
        .then(user =>{
            const userID = user._id
            return Promise.all(Array.from(
                {length: 10},
                (_,i) => Todo.create({ name:`todo-${i}`, userID})
            ))
        })
        .then(() =>{
            console.log('seed established'),
            process.exit()
        }
    )
})