const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//新增
router.get('/new', (req, res) => {
  return res.render('new')
})

// detail
router.get('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Todo.findOne({_id, userID})  //  兩個條件以上找一個東西使用 findOne
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//create
router.post('/', (req, res) => {
  const userID = req.user._id
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name, userID})     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//編輯
router.get('/:id/edit', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Todo.findOne({_id, userID})
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({_id, userID})
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === "on"
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

//delete
router.delete('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Todo.findOne({_id, userID})
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router