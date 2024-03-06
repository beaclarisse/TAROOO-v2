const Answer = require('../models/allAnswer');
const Question = require('../models/allQuestion'); // Fix the import statement
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const allAnswerController = {
  submitAnswer: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract questions and selectedOption from the request body
      const answerDataArray = req.body; // Get the array from the request body
      const questions = answerDataArray.map(answerData => answerData.questions); // Extract questions from each object

      console.log('Received questions:', questions); // Log the received questions

      // Validate and convert questionIds to ObjectIds if necessary
      const questionIds = questions.map(questionId => {
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
          throw new Error('Invalid questionId');
        }
        return mongoose.Types.ObjectId.createFromHexString(questionId); // Fix the conversion
      });

      // Retrieve question texts based on the questionIds
      const retrievedQuestions = await Question.find({ _id: { $in: questionIds } });
      if (retrievedQuestions.length !== questions.length) {
        console.log('Questions not found for ids:', questions); // Log that questions were not found
        return res.status(404).json({ message: 'Some questions not found' });
      }

      // Create new answer objects
      const newAnswers = answerDataArray.map((answerData, index) => ({
        questionId: questionIds[index], // Use the corresponding questionId
        questionText: answerData.questionText,
        selectedOption: answerData.selectedOption,
        createdAt: new Date(),
        questions: answerData.questions // Add this line to populate the 'questions' field
      }));

      // Create a new answer document
      const answerDocument = new Answer({
        answers: newAnswers
      });

      // Save the new answer document
      await answerDocument.save();

      res.status(201).json({ message: 'Answers submitted successfully' });
    } catch (error) {
      console.error('Error submitting answers:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getAnswers: async (req, res) => {
    try {
      // Fetch all answers from the database
      const answers = await Answer.find();
      console.log('Fetched answers:', answers); // Log the fetched answers

      // Check if answers is an array before sending the response
      if (!Array.isArray(answers)) {
        throw new Error('Fetched data is not an array');
      }

      res.status(200).json({ answers });
    } catch (error) {
      console.error('Error fetching answers:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};




module.exports = allAnswerController;