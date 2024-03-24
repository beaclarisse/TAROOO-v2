const express = require('express');
const router = express.Router();
const forumController = require('../controllers/ForumController');
const upload = require('../utils/multer');
const { isAuthenticatedUser,
    authorizeRoles } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

// router.post('/postComment', forumController.addComment);
// //router.post('/postComment', forumController.addComment);

// admin routes
router.get('/admin/posts', forumController.getAllPostsForAdmin);
router.delete('/admin/deletePost/:id', forumController.deletePostAdmin);
// authorizeRoles("admin"),

// user routes
router.post('/AddPost', isAuthenticatedUser, upload.array('images', 10), forumController.createPost);
router.get('/posts/:id', isAuthenticatedUser, forumController.getPostById);
router.get('/posts', isAuthenticatedUser, forumController.getAllPosts);
router.get('/userPost/:id', isAuthenticatedUser, forumController.getPostToEdit )


router.get('/user/forumList/:id', isAuthenticatedUser, forumController.getForumByUser);

router.post('/posts/:postId/like', isAuthenticatedUser, forumController.likePost);

router.put('/updatePost/:id',  isAuthenticatedUser, upload.array('images', 10), forumController.updatePost);
router.delete('/deletePost/:id', forumController.deletePost);

router.get('/userPosts', forumController.getUserPosts);

module.exports = router;
