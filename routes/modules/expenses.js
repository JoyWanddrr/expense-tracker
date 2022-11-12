const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')


// 新增
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  Expense.create({ name, date, category, amount, userId })
    .then((expense) => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// 修改
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .lean()
    .then(expense => res.render('edit', { expense })
    )
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const newExpense = req.body
  return Expense.findByIdAndUpdate({ _id, userId }, newExpense)
    .then(() => { return res.redirect('/') })//icon消失，待修
    .catch(err => console.log(err))
})

// 刪除
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Expense.findOne({ _id, userId })
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router

