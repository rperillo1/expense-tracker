const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
  name: String,
  email: String,
  googleId: String,
  imageUrl: String,
  //accounts reference
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }]
}, {
  timestamps: true
});

//User model should have an accounts reference


module.exports = mongoose.model('User', userSchema);