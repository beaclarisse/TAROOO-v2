const express = require('express');
const router = express.Router();
const answersController = require('../controllers/allAnswer');

// Route to submit an answer
router.post('/allsubmit', answersController.submitAnswer);
router.get('/allanswer', answersController.getAnswers);
// Other routes can be defined here

module.exports = router;