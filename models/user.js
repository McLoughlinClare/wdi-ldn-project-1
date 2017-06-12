const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  fitbitId: { type: String }
});

userSchema
.virtual('passwordConfirmation')
.set(function setPasswordConfirmation(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation;
});

//check passwords match or user has a fitbit ID.
userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.fitbitId) {
    this.invalidate('password', 'required');
  }
  if(this.password && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

//if they do match, hash the password
userSchema.pre('save', function hashPassword(next){
  if(!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
