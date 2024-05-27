const postModel = require("../models/postModel");

// create post
const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //validate
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Create Post APi",
      error,
    });
  }
};

const fillWaterLevelController = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findByIdAndUpdate(
      id,
      { waterLevel: 100 },
      { new: true }
    );
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Water level updated to 100%",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating water level",
      error,
    });
  }
};

const getWaterLevelController = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id, "waterLevel");
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Water level retrieved successfully",
      waterLevel: post.waterLevel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving water level",
      error,
    });
  }
};

// GET ALL POSTS
const getAllPostsContoller = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Posts Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In GETALLPOSTS API",
      error,
    });
  }
};

// get user posts
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User POST API",
      error,
    });
  }
};

// delete post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete post api",
      error,
    });
  }
};

//UPDATE POST
const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //post find
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide post title or description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post Updated Successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in update post api",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsContoller,
  getUserPostsController,
  deletePostController,
  updatePostController,
  fillWaterLevelController,
  getWaterLevelController,
};
