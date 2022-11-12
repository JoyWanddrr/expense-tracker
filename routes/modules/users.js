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
  res.redirect('/users/login')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ email })
    .then(user => {
      if (user) {
        // 放入錯誤提示
        errors.push({ message: 'email has been registered!' })
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


// logout

module.exports = router