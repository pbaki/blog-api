const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const passport = require("passport");
const User = require("../models/userModel");

exports.get_users = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (users.length > 0) {
    res.status(200).json({ success: true, users: users });
  } else {
    res.status(404).json({ error: "Users not found" });
  }
});
exports.create_user = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.register(
      new User({ username: req.body.username }),
      req.body.password
    );
    passport.authenticate("local")(req, res, () => {
      res.json({ success: true, user });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
exports.get_single_user = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.update_single_user = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.delete_single_user = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.get_user_posts = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.get_single_user_post = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.get_user_comments = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.get_single_user_comment = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
