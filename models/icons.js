const mongoose = require('mongoose')
const iconSchema = new mongoose.Schema({
  name: { type: String, require: true },
  icon: { type: String, require: true }
})

module.exports = mongoose.model('Icon', iconSchema)