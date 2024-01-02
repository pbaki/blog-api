const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Comment = require("../models/blogModel");
const User = require("../models/blogModel");

exports.get_blogposts = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.create_blogpost = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.get_single_blogpost = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.update_single_blogpost = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.delete_single_blogpost = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.get_blogpost_comments = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.create_blogpost_comment = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.get_single_blogpost_comment = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.update_single_blogpost_comment = asyncHandler(
  async (req, res, next) => {
    res.send(`Not implemented yet`);
  }
);
exports.delete_single_blogpost_comment = asyncHandler(
  async (req, res, next) => {
    res.send(`Not implemented yet`);
  }
);
