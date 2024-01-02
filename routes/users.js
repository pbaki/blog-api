var express = require("express");
var router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.get_users);
router.post("/users", userController.create_user);

router.get("/users/:userid", userController.get_single_user);
router.put("/users/:userid", userController.update_single_user);
router.delete("/users/:userid", userController.delete_single_user);

router.get("/users/:userid/posts", userController.get_user_posts);
router.get("/users/:userid/posts/:postid", userController.get_single_user_post);

router.get("/users/:userid/comments", userController.get_user_comments);
router.get(
  "/users/:userid/comments/:commentid",
  userController.get_single_user_comment
);

module.exports = router;
