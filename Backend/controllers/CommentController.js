const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { postId, content, userId } = req.body;

    const comment = await Comment.create({
      postId,
      content,
      userId,
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
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ postId });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
