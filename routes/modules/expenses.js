const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Icon = require('../../models/icons')


// 新增
router.get('/new', (req, res) => {
  Icon.find()
    .lean()
    .then(iconForRender => res.render('new', { iconForRender }))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  return Expense.create({ name, date, categoryId: category, amount, userId })
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// 修改
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const iconForRender = []
  Icon.find()
    .lean()
    .then(category => { iconForRender.push(...category) })
    .then(() => {
      Expense.findOne({ _id, userId })
        .lean()
        //修改時，類別被選取，顯示選取的類別
        .then(expense => {
          iconForRender.forEach(icon => {
            // 假設Expense裡的categoryId與iconForRender裡的相符，則selected。
            if (expense.categoryId.toString() === icon._id.toString()) {
              icon.selected = true
            }
          })
          res.render('edit', { expense, iconForRender })
        })
        .catch(err => console.log(err))
    })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  return Expense.findByIdAndUpdate({ _id, userId }, {
    name, date, categoryId: category, amount
  })
    .then(() => { return res.redirect('/') })
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

