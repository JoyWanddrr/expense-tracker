const express = require('express')
const router = express.Router()

// 引入modules模組
const users = require('./modules/users')


router.use('/users', users)

module.exports = router
