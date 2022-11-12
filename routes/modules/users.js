const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位必填 ヽ(#`Д´)ﾉ' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼輸入不一致 ヽ(#`Д´)ﾉ' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password })
  }


  User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('warning_msg', 'email已被註冊 ヽ(#`Д´)ﾉ')
        return res.render('register', { name, email, password })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name, email, password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})


module.exports = router