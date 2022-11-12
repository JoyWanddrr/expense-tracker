const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

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
  res.redirect('/users/login')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  console.log(req.use.id)
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