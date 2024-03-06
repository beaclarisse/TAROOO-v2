const mongoose = require('mongoose');

const squestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

const squestions = mongoose.model('squestions', squestionSchema);

module.exports = squestions;