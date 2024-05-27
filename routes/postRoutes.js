const express = require("express");
const { requireSingIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsContoller,
  getUserPostsController,
  deletePostController,
  updatePostController,
  fillWaterLevelController,
  getWaterLevelController,
} = require("../controllers/postController");

//router object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSingIn, createPostController);

// Update water level to 100%
router.put("/fill-water-level/:id", fillWaterLevelController);

// GET water level for a post
router.get("/water-level/:id", getWaterLevelController);

//GET ALL POSTs
router.get("/get-all-post", getAllPostsContoller);

//GET USER POSTs
router.get("/get-user-post", requireSingIn, getUserPostsController);

//DELEET POST
router.delete("/delete-post/:id", requireSingIn, deletePostController);

//UPDATE POST
router.put("/update-post/:id", requireSingIn, updatePostController);

//export
module.exports = router;
