const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const passport = require("passport");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

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

// const userSchema = new Schema({
//   username: { type: String, required: true, maxLength: 100 },
//   password: { type: String, maxLength: 100 },
//   email: { type: String, required: false },
//   comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
//   posts: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
//   membership: {
//     type: [String],
//     enum: ["basic", "creator", "admin"],
//     default: ["basic"],
//   },
//   date: { type: Date, default: Date.now },
//   meta: {
//     blogupvotes: { type: Number, default: 0 },
//     blogdownvotes: { type: Number, default: 0 },
//     commentupvotes: { type: Number, default: 0 },
//     commentdownvotes: { type: Number, default: 0 },
//   },
// });

exports.get_single_user = asyncHandler(async (req, res, next) => {
  console.log("Looking for single user");
  const user = await User.findOne({ username: req.params.username })
    .populate("comments")
    .populate("posts");
  user
    ? res.status(200).json({ success: true, user })
    : res.status(404).json({ error: "User not found or doesnt exist" });
});
exports.update_single_user = asyncHandler(async (req, res, next) => {
  [
    body("username", "Username must contain at least 1 character")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("email", "Email must contain at least 3 character")
      .trim()
      .isLength({ min: 3 })
      .escape(),
    body("comments").trim().isArray().escape(),
    body("posts").trim().isArray().escape(),
    body("membership").trim().escape(),
    body("date").trim().escape(),
    body("meta").trim().escape(),
  ];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("Updating single user");
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const allowedFields = [
      "username",
      "email",
      "comments",
      "posts",
      "membership",
      "meta",
    ];
    const updateFields = Object.fromEntries(
      allowedFields.map((field) => [field, req.body[field]])
    );

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      updateFields,
      { new: true }
    );
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
exports.delete_single_user = asyncHandler(async (req, res, next) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      username: req.params.username,
    });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
exports.get_user_posts = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "posts"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, posts: user.posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
exports.get_single_user_post = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "posts"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = user.posts.find((post) => post.title === req.params.posttitle);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ success: true, post: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
exports.get_user_comments = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "comments"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, comments: user.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
exports.get_single_user_comment = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "comments"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const comment = user.comments.find(
      (comment) => comment._id.toString() === req.params.commentid
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ success: true, comment: comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
