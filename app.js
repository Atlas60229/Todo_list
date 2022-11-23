// require
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000 // PORT會由heroku自動提供到環境
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')


// use
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