const express = require('express');
const router = express.Router();
const questionController = require('../controllers/sellerQController');

// Create a new question
router.post('/squestions', questionController.createQuestion);

// Get all questions
router.get('/squestions', questionController.getAllQuestions);

// Get a question by ID
router.get('/squestions/:id', questionController.getQuestionById);

// Update a question by ID
router.put('/squestions/:id', questionController.updateQuestion);

// Delete a question by ID
router.delete('/squestions/:id', questionController.deleteQuestion);

module.exports = router;