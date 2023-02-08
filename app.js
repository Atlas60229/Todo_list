// require
const express = require('express')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3000 // PORT會由heroku自動提供到環境
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')  //執行app.js時會一併執行mongoose.js

// use
app.use(session({               //  需在較前端載入
    secret: "ThisIsMySecret",
    resave: false,              //  每次使用者發出request時，是否即使 Session 沒做變動，強制重新儲存進 Store。
    saveUninitialized: true     //  是否強制將未初始化的 Session 儲存至 Store。（新產生的 Session）
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)



//設定template engine:
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//設定路由
// 移動到routes資料夾中

//啟動server
app.listen(PORT, () => {
    console.log(`success initiate Server localhost:${PORT}`)
})