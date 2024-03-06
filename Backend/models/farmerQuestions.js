const mongoose = require('mongoose');

const fquestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

const fquestions = mongoose.model('fquestions', fquestionSchema);

module.exports = fquestions;