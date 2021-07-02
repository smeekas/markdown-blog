const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  posts: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
