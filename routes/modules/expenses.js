const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')


// 新增
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  Expense.create({ name, date, category, amount })
    .then((expense) => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// 修改

// 刪除

module.exports = router

