var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  text: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;