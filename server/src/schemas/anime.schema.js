const mongoose = require('mongoose');


let AnimeSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  genre: [String]
});


module.exports = AnimeSchema