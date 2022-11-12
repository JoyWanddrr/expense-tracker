const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .lean()
    .then(expenses => {
      // 計算總花費
      let totalAmount = 0
      expenses.forEach(cost => { return totalAmount += cost.amount })
      res.render('index', { expenses, totalAmount })
    })
    .catch(err => console.log(err))
})

// sort
router.get('/sort', (req, res) => {
  const cateSort = req.query.sort
  const userId = req.user._id
  const _id = req.params.id
  Expense.findById()
    .lean()
    .then(cate => {
      console.log(cate)
      const filterCategory = cate.filter((data) => {
        return data.category.includes(cateSort)
      })
      if (filterCategory.length === 0) {
        req.flash('warning_msg', '此類別沒有花費')
        res.redirect('/')
        //新增錯誤訊息，表示沒找到"此類別沒有花費"
      }
      let totalAmount = 0
      filterCategory.forEach(cost => { return totalAmount += cost.amount }
      )
      res.render('index', { expenses: filterCategory, cateSort, totalAmount })
    })
    .catch(err => console.log(err))

})
module.exports = router