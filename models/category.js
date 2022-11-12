const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({

})
module.exports
const categories = [
  ['食', 'fa-solid fa-utensils'],
  ['衣', 'fa-solid fa-shirt'],
  ['住', 'fa-solid fa-house'],
  ['行', 'fa-solid fa-car'],
  ['其他', 'fa-solid fa-pen']
].map(category => ({
  title: category[0],
  // 加入item schema的icon裡
  icon: `<i class="fas ${category[1]}"></i>`
}))