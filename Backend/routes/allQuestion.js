const express = require('express');
const router = express.Router();
const questionController = require('../controllers/allQuestion');

// Create a new question
router.post('/allQuestions', questionController.createQuestion);

// Get all questions
router.get('/allQuestions', questionController.getAllQuestions);

// Get a question by ID
router.get('/allQuestions/:id', questionController.getQuestionById);

// Update a question by ID
router.put('/allQuestions/:id', questionController.updateQuestion);

// Delete a question by ID
router.delete('/allQuestions/:id', questionController.deleteQuestion);

module.exports = router;