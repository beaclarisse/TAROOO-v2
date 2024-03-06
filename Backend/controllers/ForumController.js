const Post = require('../models/Post');
const cloudinary = require('cloudinary')


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
  
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
  
    try {
     
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
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error creating post',
        });
      }
    };


  exports.createComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      const comment = await Comment.create({ content, postId });
      post.comments.push(comment);
      await post.save();
  
      res.status(201).json({ success: true, comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error creating comment' });
    }
  };
  
  // Get comments for a specific post
  exports.getComments = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId).populate('comments');
  
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      res.status(200).json({ success: true, comments: post.comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching comments' });
    }
  };

  exports.getPostById = async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
};
