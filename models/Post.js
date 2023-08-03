const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
