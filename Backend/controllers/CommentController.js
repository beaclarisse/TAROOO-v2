const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { comus, content } = req.body;
    const comment = await Comment.create({
      postId,
      content,
      comus,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId }).populate({
      path: 'comus',
      select: 'name avatar'
    });

    console.log('Comments:', comments);

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    console.error('Error in getCommentsByPostId:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

