var express = require("express");
var router = express.Router();

const commentController = require("../controller/commentController");

router.get("/comments", commentController.get_comments);
router.get("/comments/:commentid", commentController.get_single_comment);
router.put("/comments/:commentid", commentController.update_single_comment);
router.delete("/comments/:commentid", commentController.delete_single_comment);

module.exports = router;
