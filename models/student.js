const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  gpa: Number,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
