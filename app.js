// require
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Todo = require('./models/todo') 
const bodyParser = require('body-parser')

// use
app.use(bodyParser.urlencoded({ extended: true }))

// 資料庫設定
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const dataBase = mongoose.connection


dataBase.on('error',()=>{
    console.log("mongoDB error")
})
dataBase.once('open',()=>{
    console.log('MongoDB connected!')
})

//設定template engine:
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//設定路由
app.get('/',(req,res)=>{

    //取得資料庫資料
    Todo.find()
        .lean()
        .then( todos => res.render('index', {todos}))
        .catch(error => console.error(error))
    
        
})

app.get('/todos/new', (req, res) => {
    return res.render('new')
  })

app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})



//啟動server
app.listen(port,()=>{
    console.log('success initiate Server localhost:3000')
})