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
  },
  impression:{
    type:Number,
    default:0
  },
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'User',
  }
});

module.exports=mongoose.model('Article',articleSchema);