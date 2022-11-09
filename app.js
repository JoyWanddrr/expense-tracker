const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT

// views
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.send('aaaaaaaa');
});

// 靜態檔案


// listen
app.listen(port, () => {
  console.log(`we are now in ${port}!`)
})