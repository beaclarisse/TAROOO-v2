const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.post('/addComment', commentController.createComment);
router.get('/getComment/:postId', commentController.getCommentsByPostId);

module.exports = router;
