var express = require("express");
var router = express.Router();
const blogController = require("../controller/blogController");

router.get("/posts", blogController.get_blogposts);
router.post("/posts", blogController.create_blogpost);

router.get("/posts/:posttitle", blogController.get_single_blogpost);
router.put("/posts/:posttitle", blogController.update_single_blogpost);
router.delete("/posts/:posttitle", blogController.delete_single_blogpost);

router.get("/posts/:posttitle/comments", blogController.get_blogpost_comments);
router.post(
  "/posts/:posttitle/comments",
  blogController.create_blogpost_comment
);

router.get(
  "/posts/:posttitle/comments/:commentid",
  blogController.get_single_blogpost_comment
);
router.put(
  "/posts/:posttitle/comments/:commentid",
  blogController.update_single_blogpost_comment
);
router.delete(
  "/posts/:posttitle/comments/:commentid",
  blogController.delete_single_blogpost_comment
);

module.exports = router;
