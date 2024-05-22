const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true, "please provide a title"]
  },
  description:{
    type:String,
    required:[true, "please provide a description"]
  },
  image:{
    type:String,
    // required:[true, "please provide an image"]
  },
  role:{
    type:String,
    default:"user",
  },
  waterLevel:{
    type:Number,
  },
   postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);