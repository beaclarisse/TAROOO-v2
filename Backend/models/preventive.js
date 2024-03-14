const mongoose = require("mongoose");

const preventiveSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: [true, "Please enter disease name"],
    trim: true,
    maxLength: [50, "Disease name cannot exceed 50 characters"],
  },

  description: {
    type: String,
    required: [true, "Please enter preventive measures for the disease"],
  },

  reference: {
    type: String,
    required: [true, "Please enter the reference"],
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: false,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Preventive", preventiveSchema);
