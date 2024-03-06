const express = require('express');
const router = express.Router();
const answersController = require('../controllers/answerController');

// Route to submit an answer
router.post('/submit', answersController.submitAnswer);
router.get('/answer', answersController.getAnswers);
// Other routes can be defined here

module.exports = router;