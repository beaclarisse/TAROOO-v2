const Video = require('../models/video');
const handleServerError = (res, error, defaultMessage) => {
  console.error('Error:', error);
  res.status(500).json({ success: false, error: defaultMessage });
};


// const getVideoByCategory = async (req, res) => {
//   const { category } = req.params;

//   try {
//     let query = {};
//     if (category) {
//       query = { category };
//     }

//     const videos = await Video.find(query);
//     res.json({ success: true, videos });
//   } catch (error) {
//     console.error('Error fetching videos:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

// exports.addVideo = async (req, res) => {
//   try {
//     const { title, description, category, link } = req.body;
//     const video = new Video({ title, description, category, link });
//     await video.save();
//     res.json({ success: true, video });
//   } catch (error) {
//     console.error('Error adding video:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({ success: true, videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.getVideoByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    let query = {};
    if (category && category !== 'all') {
      query = { category };
    }

    const videos = await Video.find(query);
    res.json({ success: true, videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.getVideoById = async (req, res) => {
  const videoId = req.params.id;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }

    res.status(200).json({ success: true, video });
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const { title, description, category, link } = req.body;
    const video = new Video({ title, description, category, link });
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

exports.likeVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    console.log(req);
    const userId = req.user?.id;

    if (!userId) {
      console.error('Error liking video: User ID not found in request');
      return res.status(401).json({ error: 'Unauthorized: User ID not found' });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const liked = req.body.liked;

    if (liked) {
      video.likes.unshift({ user: userId });
    } else {
      video.likes = video.likes.filter((like) => like.user.toString() !== userId);
    }

    await video.save();

    res.json({ likes: video.likes.length });
  } catch (error) {
    console.error('Error liking video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
