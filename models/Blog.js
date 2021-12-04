const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'please add a title'],
    },

    image: {
      type: String,
      default:
        'https://wealthresult.com/wp-content/uploads/2013/09/Make-Money-Blogging.png',
    },

    description: {
      type: String,
      required: [true, 'add a blog description'],
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
