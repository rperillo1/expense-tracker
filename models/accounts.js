const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accountSchema = new Schema({
    balance: Number,
    income: { amount: Number, frequency: Array },
    deposits: { amount: Number, note: String, date: Date },
    withdrawals: { amount: Number, note: String, date: Date },
    expenses: {
      bills: { amount: Number, note: String, date: Date },
      mortgage: { amount: Number, note: String, date: Date },
      rent: { amount: Number, note: String, date: Date },
      hoa: { amount: Number, note: String, date: Date },
      gas: { amount: Number, note: String, date: Date },
      restaurants: { amount: Number, note: String, date: Date },
      pets: { amount: Number, note: String, date: Date },
      homeImprovement: { amount: Number, note: String, date: Date },
      automobile: { amount: Number, note: String, date: Date },
      medical: { amount: Number, note: String, date: Date },
      groceries: { amount: Number, note: String, date: Date },
      transportation: { amount: Number, note: String, date: Date },
      shopping: { amount: Number, note: String, date: Date },
      entertainment: { amount: Number, note: String, date: Date },
      personal: { amount: Number, note: String, date: Date },
      other: { amount: Number, note: String, date: Date },
    }
  }, {
    timestamps: true
  })
  
  
  module.exports = mongoose.model('Account', accountSchema);