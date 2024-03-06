const express = require('express');
const router = express.Router();
const forumController = require('../controllers/ForumController');
const upload = require('../utils/multer');

// router.post('/postComment', forumController.addComment);
// //router.post('/postComment', forumController.addComment);

router.get('/posts/:id', forumController.getPostById);
router.get('/posts', forumController.getAllPosts);
router.post('/posts', upload.array('images', 10), forumController.createPost);

router.put('/updatePost/:id', forumController.updatePost);
router.delete('/DeletePost/:id', forumController.deletePost);


module.exports = router;
