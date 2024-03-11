const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  commentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

commentSchema.methods.getUser = async function () {
  await this.populate('commentor').execPopulate();
  return this.commentor;
};

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
