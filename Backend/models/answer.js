const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answers: [
    {
      questions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', // Reference to the Question model
        required: true,
      },
      questionText: {
        type: String,
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }
  ]
});

const answer = mongoose.model('answer', answerSchema);

module.exports = answer;