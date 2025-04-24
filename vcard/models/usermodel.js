// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     fullname: String,
//     email: { type: String, unique: true },
//     mobileno: String,
//     password: String,
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User; // CommonJS export


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  fullname: { type: String },
  email: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
