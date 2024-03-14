const Taro = require("../models/taro.js");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler.js");
const cloudinary = require("cloudinary");

// Create, Get, Update, Delete Posts
exports.newTaro = async (req, res, next) => {
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
        folder: "taro",
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

  const taros = await Taro.create(req.body);
  if (!taros)
    return res.status(400).json({
      success: false,
      message: "Post not created",
    });

  res.status(201).json({
    success: true,
    taros,
  });
};

exports.allTaros = async (req, res, next) => {
  const taros = await Taro.find();
  let filteredPostsCount = taros.length;

  res.status(200).json({
    success: true,
    filteredPostsCount,
    taros,
  });
};

exports.getTaro = async (req, res, next) => {
  const resPerPage = 3;
  const postsCount = await Taro.countDocuments();

  const apiFeatures = new APIFeatures(Taro.find(), req.query).search().filter();

  apiFeatures.pagination(resPerPage);
  const taros = await apiFeatures.query;
  let filteredPostsCount = taros.length;

  res.status(200).json({
    success: true,
    resPerPage,
    postsCount,
    filteredPostsCount,
    taros,
  });
};

exports.getSingleTaro = async (req, res, next) => {
  const taros = await Taro.findById(req.params.id);

  console.log(taros);

  if (!taros) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    taros,
  });
};

exports.updateTaro = async (req, res, next) => {
  let taros = await Taro.findById(req.params.id);

  if (!taros) {
    return next(new ErrorHandler("Post not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the post

    for (let i = 0; i < taros.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        taros.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "taro",
      });

      imagesLinks.push({
        public_id: result.public_id,

        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  taros = await Taro.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    taros,
  });
};

exports.deleteTaro = async (req, res, next) => {
  let taros = await Taro.findById(req.params.id);

  if (!taros) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  if (!taros) {
    return next(new ErrorHandler("Post not found", 404));
  }
  taros = await Taro.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    taros,
  });
};