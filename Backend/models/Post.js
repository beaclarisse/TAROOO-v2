const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
 
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  Comments: [{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      //  ref: 'User'
    },
    comment: {
        type: String,
        required: true,
    },
    // replies: [{
    //     user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //       //  ref: 'User'
    //     },
    //     comment: {
    //         type: String,
    //         required: true,
    //     },
        
    //     createdAt: {
    //         type: Date,
    //         default: Date.now()
    //     },
    //     updatedAt: {
    //         type: Date,
    //         default: Date.now()
    //     }
    // }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}]
}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
