const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/user');
const Filter = require('bad-words');
const filter = new Filter();

// const Filter = require('bad-words');
// const filipinoBarwords = require('filipino-badwords-list');

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


exports.createComment = async (req, res) => {
  try {
    const postId = req.body.postId;
    const { content, pendingDeletion } = req.body;
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
      pendingDeletion: pendingDeletion || false, // Set default value to false
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


exports.checkAndDeleteProfaneComments = async () => {
  try {
    console.log('Running profanity-based comment deletion check...');

    const currentDateTime = new Date();
    const profaneCommentsToDelete = await Comment.find({ pendingDeletion: true });

    for (const comment of profaneCommentsToDelete) {
      await comment.remove();
      console.log(`Profane Comment ID ${comment._id} deleted successfully.`);
    }
  } catch (error) {
    console.error('Error deleting profane comments:', error);
  }
};
let iterations = 0;
const maxIterations = 5;

const stopInterval = () => {
  iterations++;
  if (iterations >= maxIterations) {
    clearInterval(intervalId);
    console.log('Profanity-based comment deletion check stopped.');
  }
};

const intervalId = setInterval(async () => {
  await exports.checkAndDeleteProfaneComments();
  stopInterval();
}, 5000);



//  setInterval(checkAndDeleteComments, 24 * 60 * 60 * 1000); 

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

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    if (!(comment instanceof mongoose.Document)) {
      return res.status(500).json({ success: false, message: 'Invalid comment document' });
    }
    if (comment.pendingDeletion) {
      await comment.remove();
      return res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    }

    res.status(403).json({ success: false, message: 'You are not authorized to delete this comment' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



exports.addReplyToComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    console.log('Received commentId on the server:', commentId);

    // Fetch the parent comment using the provided commentId
    const parentComment = await Comment.findById(commentId);

    // Ensure that the comment is found
    if (!parentComment) {
      console.log('Comment not found');
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Log the existing replies before adding a new one
    console.log('Existing Replies:', parentComment.replies);

    // Ensure that req.user is defined and has an _id property
    const userId = req.user && req.user._id;

    if (!userId) {
      console.log('User ID not found in the request');
      return res.status(400).json({
        success: false,
        message: 'User ID not found in the request',
      });
    }

    // Assume replyText is defined somewhere in your code
    const replyText = req.body.content; // Change here

    // Add the new reply to the comment's replies array
    parentComment.replies.push({
      comment: replyText,
      user: userId,
    });

    // Save the changes
    await parentComment.save();

    console.log('Reply added successfully');

    // Log the updated comment with the new reply
    console.log('Updated Comment:', parentComment);

    res.status(200).json({
      success: true,
      parentComment: parentComment,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error occurred',
    });
  }
};




// user
// exports.deleteComment = async (req, res) => {
//   const commentId = req.params.commentId;
//   const userId = req.user._id;

//   try {
//     const comment = await Comment.findById(commentId);

//     if (!comment) {
//       return res.status(404).json({ success: false, message: 'Comment not found' });
//     }
//     if (comment.commentor.toString() !== userId.toString()) {
//       return res.status(403).json({ success: false, message: 'You are not authorized to delete this comment' });
//     }

//     await comment.remove();

//     res.status(200).json({ success: true, message: 'Comment deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };
