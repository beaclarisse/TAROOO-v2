const Video = require('../models/Video');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({ success: true, videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const video = new Video({ title, description, link });
    await video.save();
    res.json({ success: true, video });
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.deleteVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    await Video.findByIdAndDelete(videoId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
