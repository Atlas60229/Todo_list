// const
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

// use (照順序比對)
router.use('/todos', authenticator, todos) // 將網址結構符合 /todos 字串的 request 導向 todos 模組 
router.use('/users', users)  // 將網址結構符合 /users 字串的 request 導向 todos 模組 
router.use('/auth', auth)
router.use('/', authenticator, home)       // 將網址結構符合 / 字串的 request 導向 home 模組 
console.log('test')

module.exports = router