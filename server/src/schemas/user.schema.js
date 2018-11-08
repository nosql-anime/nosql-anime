const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  anime: [{id: Schema.Types.ObjectId, score: Number}]
});

module.exports = UserSchema;