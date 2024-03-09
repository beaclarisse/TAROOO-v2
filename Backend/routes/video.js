const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController');

// Get all videos
router.get('/AllVids', videoController.getAllVideos);

// Add a new video
router.post('/AddVids', videoController.addVideo);

// Delete a video by ID
router.delete('/vid/:id', videoController.deleteVideoById);

module.exports = router;
