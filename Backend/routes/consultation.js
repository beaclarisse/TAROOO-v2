const express = require('express');
const router = express.Router();
const consultController = require('../controllers/consultationController');
const { isAuthenticatedUser, authorizeRoles, isConsultOwner } = require('../middlewares/auth');
const upload = require('../utils/multer');

// Route for creating a new consultation
router.post('/consultations', isAuthenticatedUser, upload.array('images', 10), consultController.createConsult);

// Route for fetching all consultations
router.get('/consultations', consultController.getAllConsults);

// Route for fetching a specific consultation by ID
router.get('/consultations/:id', isAuthenticatedUser, consultController.getConsultById);

// Route for updating a consultation by ID
router.put('/consultations/:id', isAuthenticatedUser, consultController.updateConsult);

// Route for deleting a consultation by ID
router.delete('/consultations/:id', isAuthenticatedUser, consultController.deleteConsult);

// Route for fetching consultations by user
router.get('/consultations/user/:userId',  consultController.getConsultsByUser);

// Additional routes or middleware can be added based on your requirements

module.exports = router;
