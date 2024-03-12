const mongoose = require('mongoose');

const consultSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
//   tags: {
//     type: String,
//     required: true,
//   },
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

const Consult = mongoose.model('Consult', consultSchema);

module.exports = Consult;
