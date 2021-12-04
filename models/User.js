const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'please input your fullname'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'email is already used'],
      lowercase: true,
    },
    profileImg: String,
    password: {
      type: String,
      required: true,
      min: 8,
      max: 15,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
