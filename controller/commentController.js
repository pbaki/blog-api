const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Comment = require("../models/blogModel");
const User = require("../models/blogModel");

exports.get_comments = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
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
