const mongoose = require('mongoose');

const InfographicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

const Infographic = mongoose.model('Infographic', InfographicSchema);

module.exports = Infographic;
