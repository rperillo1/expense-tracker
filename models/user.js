const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
  name: String,
  email: String,
  googleId: String,
  imageUrl: String,
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }]
}, {
  timestamps: true
});



module.exports = mongoose.model('User', userSchema);