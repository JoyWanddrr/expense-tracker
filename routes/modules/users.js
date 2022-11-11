const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  // 將在passport.js裡驗證
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  // 放入錯誤提示
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('email has been registered!')
        res.render('register', { name, email, password })
      }
      else {
        return User.create({ name, email, password })
          .then(() => res.redirect('/users/login'))
      }
    })
})


// logout

module.exports = router