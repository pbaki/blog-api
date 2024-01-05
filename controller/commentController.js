const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

exports.get_comments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find();
  if (comments.length > 0) {
    res.status(200).json({ success: true, comments: comments });
  } else {
    res
      .status(404)
      .json({ error: "Comments not found or there are no comments" });
  }
});

exports.get_single_comment = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.update_single_comment = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.delete_single_comment = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
