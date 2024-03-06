const express = require('express');
const router = express.Router();
const questionController = require('../controllers/farmerQController');

// Create a new question
router.post('/fquestions', questionController.createQuestion);

// Get all questions
router.get('/fquestions', questionController.getAllQuestions);

// Get a question by ID
router.get('/fquestions/:id', questionController.getQuestionById);

// Update a question by ID
router.put('/fquestions/:id', questionController.updateQuestion);

// Delete a question by ID
router.delete('/fquestions/:id', questionController.deleteQuestion);

module.exports = router;