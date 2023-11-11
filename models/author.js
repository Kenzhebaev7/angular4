const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
