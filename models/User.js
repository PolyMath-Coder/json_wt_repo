const mongoose = require('mongoose');
const { isEmail } = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a Password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});
const User = mongoose.model('user', userSchema);

module.exports = User;
