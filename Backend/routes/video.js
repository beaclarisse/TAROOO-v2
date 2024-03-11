const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController');
// const { isAuthenticatedUser } = require('../middlewares/auth');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../middlewares/auth");


// Get all videos
router.get('/AllVids', videoController.getAllVideos);

// Add a new video
router.post('/AddVids', isAuthenticatedUser, authorizeRoles("admin"), videoController.addVideo);

// Delete a video by ID
router.delete('/vid/:id', videoController.deleteVideoById);

// Like or unlike a video
router.post('/likeVideo/:videoId', isAuthenticatedUser, videoController.likeVideo);

router.get('/videos/:category', videoController.getVideoByCategory);

// Get videos by category
// router.get('/videos/:category', videoController.getVideoByCategory);

module.exports = router;
