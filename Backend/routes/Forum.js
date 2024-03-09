const express = require('express');
const router = express.Router();
const forumController = require('../controllers/ForumController');
const upload = require('../utils/multer');
const {isAuthenticatedUser } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

// router.post('/postComment', forumController.addComment);
// //router.post('/postComment', forumController.addComment);

router.get('/posts/:id', forumController.getPostById);
router.get('/posts', forumController.getAllPosts);
router.post('/AddPost', isAuthenticatedUser, upload.array('images', 10), forumController.createPost);

router.put('/updatePost/:id', forumController.updatePost);
router.delete('/deletePost/:id',  forumController.deletePost);

router.get('/userPosts',  forumController.getUserPosts);

module.exports = router;
