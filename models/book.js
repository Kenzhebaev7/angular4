const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  publicationYear: Number,
});

const Book = mongoose.model('Books', bookSchema);

module.exports = Book;
