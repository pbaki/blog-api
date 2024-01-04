var express = require("express");
var router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.get_users);
router.post("/users", userController.create_user);

router.get("/users/:username", userController.get_single_user);
router.put("/users/:username", userController.update_single_user);
router.delete("/users/:username", userController.delete_single_user);

router.get("/users/:username/posts", userController.get_user_posts);
router.get(
  "/users/:username/posts/:posttitle",
  userController.get_single_user_post
);

router.get("/users/:username/comments", userController.get_user_comments);
router.get(
  "/users/:username/comments/:commentid",
  userController.get_single_user_comment
);

module.exports = router;
