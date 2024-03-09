const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
const {isAuthenticatedUser } = require('../middlewares/auth');

router.post('/addComment', isAuthenticatedUser, commentController.createComment);
router.get('/getComment/:postId',isAuthenticatedUser,commentController.getCommentsByPostId);

module.exports = router;
