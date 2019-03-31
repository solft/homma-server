const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  group: String,
  name: String,
  homma: String,
  home: String,
  date: String,
  photos: [String],
  tags: [String],
  meta: {
    views: { type: Number, default: 0 },
    hearts: { type: Number, default: 0 }
  }
});

module.exports = postSchema;