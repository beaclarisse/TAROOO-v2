const Comment = require('../models/Comment');
//  const { getUser } = require('../../Frontend/src/utils/helpers');
const Post = require('../models/Post'); 
const User = require('../models/user'); 
// const Filter = require('bad-words')
// const filipinoBarwords = require('filipino-badwords-list');

exports.createComment = async (req, res) => {
  try {
    const postId = req.body.postId;
    const { content } = req.body;
    const userId = req.user._id; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const comment = await Comment.create({
      postId,
      content,
      commentor: userId,
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


// exports.createComment = async (req, res) => {
//   try {
//     const postId = req.body.postId;
//     const { content } = req.body;
//     const userId = req.user._id; 

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     const comment = await Comment.create({
//       postId,
//       content,
//       commentor: userId,
//     });

//     res.status(201).json({
//       success: true,
//       comment,
//     });
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

// exports.createComment = async (req, res) => {
//   try {
//     const postId = req.body.postId;
//     const { content } = req.body;
//     const userId = req.user._id; 

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     // Fetch user details, including avatar
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     const comment = await Comment.create({
//       postId,
//       content,
//       commentor: {
//         id: user._id,
//         name: user.name,
//         avatar: user.avatar,
//       },
//     });

//     res.status(201).json({
//       success: true,
//       comment,
//     });
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

// exports.createComment = async (req, res) => {
//   try {
//     const postId = req.body.postId;
//     const { content } = req.body;
//     const userId = req.user._id; 

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     const comment = await Comment.create({
//       postId,
//       content,
//       commentor: {
//         id: user._id,
//         name: user.name,
//       },
//     });

//     res.status(201).json({
//       success: true,
//       comment,
//     });
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };


exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId }).populate({
      path: 'commentor',
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


exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user._id; 

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    if (comment.commentor.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this comment' });
    }

    await comment.remove();

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
