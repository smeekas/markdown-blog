const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sanitized:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model('Article',articleSchema);