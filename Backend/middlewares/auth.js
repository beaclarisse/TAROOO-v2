const User = require("../models/user");
const Consult = require("../models/consultation");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

// Checks if user is authenticated 
exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (req.originalUrl.includes('/api/v1/posts')) {
    return next();
  }

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

exports.authorizeRoles = (...roles) => {
  console.log(roles);

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// Middleware admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler("Only admins can access this resource", 403));
  }
  next();
};

// Middleware owner of the consultation
exports.isConsultOwner = async (req, res, next) => {
  try {
    const consultation = await Consult.findById(req.params.id);
    console.log('Consultation User:', consultation ? consultation.user : 'Consultation not found');
    console.log('Request User:', req.user ? req.user._id : 'User not found');

    if (!consultation || consultation.user.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You are not the owner of this consultation", 403));
    }
    next();
  } catch (error) {
    console.error('Error checking consultation ownership:', error);
    return next(new ErrorHandler("Error checking consultation ownership", 500));
  }
};

// exports.isForumOwner = async (req, res, next) => {
//   try {
//     const consultation = await Consult.findById(req.params.id);
//     console.log('Forum User:', consultation ? consultation.user : 'Forum Post not found');
//     console.log('Request User:', req.user ? req.user._id : 'User not found');

//     if (!consultation || consultation.user.toString() !== req.user._id.toString()) {
//       return next(new ErrorHandler("You are not the owner of this Forum", 403));
//     }
//     next();
//   } catch (error) {
//     console.error('Error checking forum ownership:', error);
//     return next(new ErrorHandler("Error checking forum ownership", 500));
//   }
// };
