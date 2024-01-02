var express = require("express");
var router = express.Router();
const blogController = require("../controller/blogController");

router.get("/posts", blogController.get_blogposts);
router.post("/posts", blogController.create_blogpost);

router.get("/posts/:postid", blogController.get_single_blogpost);
router.put("/posts/:postid", blogController.update_single_blogpost);
router.delete("/posts/:postid", blogController.delete_single_blogpost);

router.get("/posts/:postid/comments", blogController.get_blogpost_comments);
router.post("/posts/:postid/comments", blogController.create_blogpost_comment);

router.get(
  "/posts/:postid/comments/:commentid",
  blogController.get_single_blogpost_comment
);
router.put(
  "/posts/:postid/comments/:commentid",
  blogController.update_single_blogpost_comment
);
router.delete(
  "/posts/:postid/comments/:commentid",
  blogController.delete_single_blogpost_comment
);

module.exports = router;
