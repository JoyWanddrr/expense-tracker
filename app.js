const express = require('express')
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
const port = process.env.PORT
const routes = require('./routes')
// require
require('./config/mongoose')


// views
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main', helpers: {
    getIcon: function (category) {
      const categoryIcons = { '食': 'fa-solid fa-utensils', '衣': 'fa-solid fa-shirt', '住': 'fa-solid fa-house', '行': 'fa-solid fa-car', '樂': 'fa-solid fa-dice', '其他': 'fa-solid fa-pen' }
      return categoryIcons[category]
    }
  }
}))
app.set('view engine', 'handlebars');


// app.use，middleware
app.use(express.urlencoded({ extended: true }))// post、put會用到，跟資料庫請求、寫入所需要的解析。
app.use(routes)


// listen
app.listen(port, () => {
  console.log(`we are now in ${port}!`)
})