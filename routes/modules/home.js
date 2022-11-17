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
  const categorySort = req.query.sort
  const userId = req.user._id
  const _id = req.params.id
  let totalAmount = 0
  const categorySelector = []

  Icon.find({})
    .lean()
    .then(categories => {
      categories.forEach(category => {
        // 若選擇的分類有吻合，則將之標記為"selected"
        if (category._id.toString().includes(categorySort.toString())) {
          category.selected = 'selected'
          categorySelector.push(categorySort)
        }
        else if (!categorySort) {
          categorySelector.push(category)
        }
      })
      // 在expense的資料裡找出符合userId，以及將剛才的篩選放入categoryId
      Expense.find({ userId, categoryId: categorySelector })
        .populate('categoryId')
        .lean()
        // 關聯icons  
        .sort({ date: 'desc' })
        .then(expense => {
          // 提出每個品項的amount，然後加總
          expense.forEach(cost => {
            totalAmount += cost.amount
          })
          // if (totalAmount === 0) {
          //   let noCost = '快點花錢'
          //   res.render('index', { expenses: expense, iconForRender: categories, totalAmount, noCost })
          // }
          if (categorySort === '1') {
            res.redirect('/')
          }
          res.render('index', { expenses: expense, iconForRender: categories, totalAmount })
        })
        .catch(err => console.log(err))
    })
})
// Icon.find()
//   .lean()
//   .then(data => iconForRender.push(...data))
//   .then(() => {
//     Expense.find({ userId })
//       .populate('categoryId')
//       .lean()
//       .sort({ date: 'desc' })
//       .then(cate => {
//         const filterCategory = cate.filter((data) => {
//           return data.categoryId._id.toString().includes(cateSort.toString())
//         })
//         if (filterCategory.length === 0) {
//           // error({ message: '此類別沒有花費' })
//           res.redirect('/')
//         }
//         let totalAmount = 0
//         filterCategory.forEach(cost => { return totalAmount += cost.amount }
//         )
//         res.render('index', { expenses: filterCategory, iconForRender, totalAmount })
//       })
//   })
//   .catch(err => console.log(err))
// })


module.exports = router