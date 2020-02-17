const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean
  }
});

module.exports = mongoose.model('Todo', schema);

