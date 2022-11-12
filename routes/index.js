const express = require('express')
const router = express.Router()

// 引入modules模組
const users = require('./modules/users')
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const { authenticator } = require('../middleware/auth')
const fbAuth = require('./modules/fbAuth')


router.use('/expenses', authenticator, expenses)
router.use('/users', users)
router.use('/fbAuth', fbAuth)
router.use('/', authenticator, home)

module.exports = router
