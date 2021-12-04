const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
