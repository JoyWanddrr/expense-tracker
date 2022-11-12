const express = require('express')
const router = express.Router()

// 引入modules模組
const users = require('./modules/users')
const home = require('./modules/home')
const expenses = require('./modules/expenses')


router.use('/users', users)
router.use('/', home)
router.use('/expenses', expenses)

module.exports = router
