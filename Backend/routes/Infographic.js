const express = require('express');
const router = express.Router();
const InfographicController = require('../controllers/InfographicController');
const upload = require('../utils/multer');
const { isAuthenticatedUser,
    authorizeRoles } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

router.post('/admin/AddInfo', isAuthenticatedUser, upload.array('images', 10), InfographicController.newInfo);
router.get('/Infographic', isAuthenticatedUser, InfographicController.getAllInfo);
router.get('/Infographic/:id', isAuthenticatedUser, InfographicController.getInfoById);
router.delete("/delete/Infographic/:id", isAuthenticatedUser, authorizeRoles("admin"), InfographicController.deleteInfographic);

router.get('/admin/Infographic', InfographicController.allInfographic);

module.exports = router;