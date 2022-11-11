const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  itemName: { type: String, require: true },
  category: { type: String, require: true },
  date: { type: String, require: true },
  amount: { type: Number, require: true },
  icon: { type: String, require: true },
  // userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true }
})

module.exports = mongoose.model('Item', itemSchema)