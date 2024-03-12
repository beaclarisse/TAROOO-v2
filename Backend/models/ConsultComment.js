const mongoose = require('mongoose');

const ConsultCommentSchema = new mongoose.Schema({
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
  replies: [{
    content: {
      type: String,
      required: true,
    },
    commentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Add any other properties you need for replies
  }],
}, { timestamps: true });

ConsultCommentSchema.methods.getUser = async function () {
  await this.populate('commentor').execPopulate();
  return this.commentor;
};

const ConsultComment = mongoose.model('ConsultComment', ConsultCommentSchema);

module.exports = ConsultComment;
