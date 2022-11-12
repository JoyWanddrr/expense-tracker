const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  name: { type: String, require: true },
  category: { type: String, require: true },
  date: { type: String, require: true },
  amount: { type: Number, require: true },
  icon: { type: String, require: true },
  createdAt: { type: Date, default: Date.now }
  // userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true }
})

module.exports = mongoose.model('Expense', expenseSchema)