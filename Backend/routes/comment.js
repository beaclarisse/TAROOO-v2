const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
const {isAuthenticatedUser } = require('../middlewares/auth');

router.post('/addComment', isAuthenticatedUser, commentController.createComment);
router.get('/getComment/:postId', isAuthenticatedUser, commentController.getCommentsByPostId);
// router.get('/deleteComment/:commentId', isAuthenticatedUser, commentController.deleteComment);
router.delete('/deleteComment/:commentId', isAuthenticatedUser, commentController.deleteComment);
// router.post('/addReply/:commentId', isAuthenticatedUser, commentController.addReplyToComment);
router.post('/addReply/:commentId', isAuthenticatedUser, commentController.addReplyToComment );
router.get('/getRepliesByCommentId/:commentId', commentController.getRepliesByCommentId);

module.exports = router;
