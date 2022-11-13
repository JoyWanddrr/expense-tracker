const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Icon = require('../../models/icons')//載入圖示模組，需要資料庫資料


// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  const iconForRender = []
  Icon.find()
    .lean()
    .then(data => iconForRender.push(...data))
    .then(() => {
      Expense.find({ userId })
        .populate('categoryId')
        .lean()
        // 依時間排序，最新的在最上面
        .sort({ date: 'desc' })
        .then(expenses => {
          // 計算總花費
          let totalAmount = 0
          expenses.forEach(cost => { return totalAmount += cost.amount })
          res.render('index', { expenses, totalAmount, iconForRender })
        })
        .catch(err => console.log(err))
    })
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
      }
      let totalAmount = 0
      filterCategory.forEach(cost => { return totalAmount += cost.amount }
      )
      res.render('index', { expenses: filterCategory, cateSort, totalAmount })
    })
    .catch(err => console.log(err))

})
module.exports = router