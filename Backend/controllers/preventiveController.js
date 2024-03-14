const Preventive = require("../models/preventive.js");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler.js");
const cloudinary = require("cloudinary");

// // Create, Get, Update, Delete Preventive Measures
exports.newPreventive = async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    let imageDataUri = images[i];
    try {
      const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
        folder: "preventive",
        width: 150,
        crop: "scale",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const preventive = await Preventive.create(req.body);
  if (!preventive)
    return res.status(400).json({
      success: false,
      message: "Preventive post not created",
    });

  res.status(201).json({
    success: true,
    preventive,
  });
};

exports.allPreventives = async (req, res, next) => {
  const preventive = await Preventive.find();
  let filteredPostsCount = preventive.length;

  res.status(200).json({
    success: true,
    filteredPostsCount,
    preventive,
  });
};

exports.getPreventives = async (req, res, next) => {
  const preventive = await Preventive.find();
  let filteredPreventivesCount = preventive.length;

  res.status(200).json({
    success: true,
    filteredPreventivesCount,
    preventive,
  });
};

exports.getSinglePreventive = async (req, res, next) => {
  const preventive = await Preventive.findById(req.params.id);

  console.log(preventive);

  if (!preventive) {
    return next(new ErrorHandler("Preventive post not found", 404));
  }

  res.status(200).json({
    success: true,
    preventive,
  });
};

exports.updatePreventive = async (req, res, next) => {
  let preventive = await Preventive.findById(req.params.id);

  if (!preventive) {
    return next(new ErrorHandler("Preventive post not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the preventive

    for (let i = 0; i < preventive.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        preventive.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "preventives",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  preventive = await Preventive.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    preventive,
  });
};

exports.deletePreventive = async (req, res, next) => {
  let preventive = await Preventive.findById(req.params.id);

  if (!preventive) {
    return res.status(404).json({
      success: false,
      message: "Preventive post not found",
    });
  }

  if (!preventive) {
    return next(new ErrorHandler("Preventive post not found", 404));
  }
  preventive = await Preventive.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    preventive,
  });
};
