const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value != 25,
      message: 'You cant be 25',
    },
  },
  email: {
    type: String,
    lowercase: true,
  },
  hobbies: [String],
  ceratedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
