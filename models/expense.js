const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  name: { type: String, require: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Icon', index: true, required: true },
  date: { type: String, require: true },
  amount: { type: Number, require: true }, createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true }
})

module.exports = mongoose.model('Expense', expenseSchema)