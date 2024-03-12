const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  rep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, { timestamps: true });

replySchema.methods.getUser = async function () {
  await this.populate('rep', 'name avatar').execPopulate();
  return this.rep;
};

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
  replies: [replySchema],
}, { timestamps: true });

commentSchema.methods.getUser = async function () {
  await this.populate('commentor', 'name avatar').execPopulate();
  return this.commentor;
};

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
