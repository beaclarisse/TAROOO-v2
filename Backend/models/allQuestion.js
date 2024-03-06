const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

const allQuestions = mongoose.model('allquestions', questionSchema);

module.exports = allQuestions;