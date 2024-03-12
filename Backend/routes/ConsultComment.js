const express = require('express');
const router = express.Router();
const commentController = require('../controllers/ConsultCommentController');
const {isAuthenticatedUser } = require('../middlewares/auth');

router.post('/addConsultComment', isAuthenticatedUser, commentController.createComment);
router.get('/getConsultComment/:postId', isAuthenticatedUser, commentController.getCommentsByPostId);
// router.get('/deleteComment/:commentId', isAuthenticatedUser, commentController.deleteComment);
router.delete('/deleteConsultComment/:commentId', isAuthenticatedUser, commentController.deleteComment);
// router.post('/addReply/:commentId', isAuthenticatedUser, commentController.addReplyToComment);
router.post('/addConsultReply/:commentId', isAuthenticatedUser, commentController.addReplyToComment );

module.exports = router;
