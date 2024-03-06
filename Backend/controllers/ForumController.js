const Post = require('../models/Post');
const cloudinary = require("cloudinary");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    handleServerError(res, error, 'Internal Server Error');
  }
};


exports.createPost = async (req, res, next) => {

  let imagesLinks = [];
  let images = [];

  if (req.files.length > 0) {
    req.files.forEach(image => {
      images.push(image.path)
    })
  }


  if (req.file) {
    images.push(req.file.path);
  }


  if (req.body.images) {
    if (typeof req.body.images === 'string') {
      images.push(req.body.images);
    } else {
      images = req.body.images
    }
  }


  for (let i = 0; i < images.length; i++) {
    let imageDataUri = images[i];
    try {
      const result = await cloudinary.uploader.upload(`${imageDataUri}`, {
        folder: 'ff-jbrew',
        width: 1000,
        crop: 'auto',
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error uploading image to Cloudinary',
      });
    }
  }

  req.body.images = imagesLinks;

  const post = await Post.create(req.body);
  if (!post) {
    return res.status(400).json({
      success: false,
      message: 'Post not created',
    });
  }

  res.status(201).json({
    success: true,
    post,
  })
}
// exports.createPost = async (req, res) => {
//   const { title, content } = req.body;
//   let imagesLinks = [];

//   try {

//     const images = await Promise.all(req.files.map(async (image) => {
//       const result = await cloudinary.uploader.upload(image.path, {
//         folder: 'ff-gabi',
//         width: 1000,
//         crop: 'auto',
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });

//       return imagesLinks;
//     }));

//     const post = await Post.create({
//       title,
//       content,
//       images: images.flat(),
//     });

//     res.status(201).json({
//       success: true,
//       post,
//     });
//   } catch (error) {
//     console.error(error);
//     handleServerError(res, error, 'Error creating post');
//   }
//  };

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      handleNotFound(res, 'Post not found');
      return;
    }

    // Delete images from Cloudinary
    if (post.images && post.images.length > 0) {
      for (const image of post.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    // Remove the post from the database
    await post.remove(); // Use remove method to delete the document

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    handleServerError(res, error, 'Error deleting post');
  }
};



// exports.addComment = async (req, res) => {
//   try {
//     const { postId, content, userId } = req.body;
//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     const imagesLinks = await Promise.all(req.files.map(handleImageUpload));

//     // Add the new comment to the comments array
//     post.comments.push({
//       content,
//       userId,
//       images: imagesLinks,
//     });

//     // Save the updated post with the new comment
//     await post.save();

//     res.status(201).json({ success: true, comment: post.comments[post.comments.length - 1] });
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

// exports.getComments = async (req, res) => {
//   const postId = req.params.id;

//   try {
//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     } 
//     const comments = post.comments;
//     res.status(200).json({
//       success: true,
//       comments,
//     });
//   } catch (error) {
//     handleServerError(res, error, 'Error fetching comments');
//   }
// };

exports.getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      handleNotFound(res, 'Post not found');
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post details:', error);
    handleServerError(res, error, 'Internal Server Error');
  }
};

const handleServerError = (res, error, defaultMessage) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: defaultMessage || 'Internal Server Error',
  });
};

const handleNotFound = (res, message) => {
  res.status(404).json({
    success: false,
    message: message || 'Not Found',
  });
};
