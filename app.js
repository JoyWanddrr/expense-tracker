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
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// app.use
app.use(express.urlencoded({ extended: true }))// post、put會用到，跟資料庫請求、寫入所需要的解析。
app.use(routes)
// 靜態檔案


// listen
app.listen(port, () => {
  console.log(`we are now in ${port}!`)
})