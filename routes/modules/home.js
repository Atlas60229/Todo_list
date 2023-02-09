const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/',(req,res)=>{
    const userID = res.locals.user._id
    Todo.find({userID: userID}) //取得資料庫資料
        .lean() //內建整理資料function
        .sort({_id: 'asc'}) //反序：desc
        .then( todos => res.render('index', {todos}))
        .catch(error => console.error(error))      
})

module.exports = router