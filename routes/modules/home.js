const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

// 首頁
router.get('/', (req, res) => {

  Expense.find()
    .lean()
    .then((expenses) => {
      res.render('index', { expenses })
    })
    .catch(err => console.log(err))
})

// sort
router.get('/sort', (req, res) => {
  const cateSort = req.query.sort
  Expense.find({})
    .lean()
    .then(cate => {
      const filterCategory = cate.filter((data) => {
        return data.category.includes(cateSort)
      })
      if (filterCategory.length === 0) {
        res.redirect('/')
        //新增錯誤訊息，表示沒找到
      }
      res.render('index', { expenses: filterCategory, cateSort })

    })
    .catch(err => console.log(err))

})
module.exports = router