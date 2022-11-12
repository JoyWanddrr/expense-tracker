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
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    .lean()
    .then(expense => res.render('edit', { expense })
    )
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newExpense = req.body
  return Expense.findByIdAndUpdate(id, newExpense)
    .then(() => { return res.redirect('/') })//icon消失，待修
    .catch(err => console.log(err))
})

// 刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  return Expense.findById(id)
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router

