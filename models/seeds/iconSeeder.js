if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Icon = require('../icons')//model
const iconList = require('./icons.json').results

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', (req, res) => {
  Icon.create(iconList)
    .then(() => console.log('icons done!'))
    .catch(err => console.log(err))
    .finally(() => process.exit())
})