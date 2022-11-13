const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Expense = require('../expense')
const User = require('../user')
const Icon = require('../icons')
const db = require('../../config/mongoose')
const expensesList = require('./expenses.json').results

const SEED_USER = [{
  name: "User1",
  email: "user1@example.com",
  password: "123"
}]


db.once('open', () => {
  // 先將expenses.json的category部分轉成categoryId(與圖示做連結)
  console.log('replace categoryId!')
  Icon.find({})
    .then(icons => {
      expensesList.forEach(seeds => {
        // 如果icon的name與預設的expenses categoryId相同，則找出icon的_id並替換expenses categoryId
        seeds.categoryId = icons.find(icon => icon.name === seeds.categoryId)._id
      })
    })
    .then(() => {
      const { name, email, password } = SEED_USER[0]
      return User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) })
    })
    .then((user) => {
      expensesList.forEach(expenses => {
        const userId = user._id
        const { name, categoryId, date, amount } = expenses
        return Expense.create({ name, categoryId, date, amount, userId })
      })
    })
    .then(() => {
      console.log('link userId with expense!')
      console.log('Seeds done!')
    })
    .catch(error => console.log(error))
  // .finally(() => process.exit()) //// 加上之後即使加上promise.all Expense無法寫入。
})

