const express = require('express');
const router = express.Router();
const forumController = require('../controllers/ForumController');
const upload = require('../utils/multer');


router.post('/posts/:postId/comments', forumController.createComment);
router.get('/posts/:postId/comments', forumController.getComments);


router.get('/posts',  forumController.getAllPosts);
router.get('/posts/:id', forumController.getPostById); 
router.post('/posts', upload.array('images'), forumController.createPost);

module.exports = router;
