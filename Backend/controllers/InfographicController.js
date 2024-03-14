const Infographic = require("../models/Infographic");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler.js");
const cloudinary = require("cloudinary");
 
  exports.newInfo = async (req, res, next) => {

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
          folder: 'gabi-info',
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
  
    const infographic = await Infographic.create(req.body);
    if (!infographic) {
      return res.status(400).json({
        success: false,
        message: 'Post Info not created',
      });
    }
  
    res.status(201).json({
      success: true,
      infographic,
    })
  }

  exports.getAllInfo = async (req, res) => {
    try {
      const info = await Infographic.find().populate('user', 'name');
      res.status(200).json(info);
    } catch (error) {
      console.error('Error fetching infographic:', error);
      handleServerError(res, error, 'Internal Server Error');
    }
  };

  exports.getInfoById = async (req, res) => {
    const infoId = req.params.id;
    try {
      const infographic = await Infographic.findById(infoId)
        .populate('user', 'name')
  
      if (!infographic) {
        handleNotFound(res, 'Info not found');
        return;
      }
      res.status(200).json(infographic);
    } catch (error) {
      console.error('Error fetching post details:', error);
      handleServerError(res, error, 'Internal Server Error');
    }
  };
  