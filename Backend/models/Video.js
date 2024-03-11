const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please select category for this video'],
    enum: {
        values: [
            'Cultivation',
            'Taro Diseases',
            'Preventive Measures',
            'Practices',
            'Benefits',
            'Risks',
        ],
        message: 'Please select correct category for video'
    }
},
   link: {
    type: String,
    required: true,
  },
  // likes: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User', 
  //     },
  //   },
  // ],
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
