const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.get_blogposts = asyncHandler(async (req, res, next) => {
  const blogposts = await Blog.find();
  console.log(`Get blogposts, How many : ${blogposts.length}`);
  if (blogposts.length === 0) {
    res.json({});
  } else if (blogposts.length > 0) {
    res.json(blogposts);
  }
});
exports.create_blogpost = asyncHandler(async (req, res, next) => {
  const isValidImageURL = (value) => {
    const imgURLPattern = /\.(jpg|png)$/i;
    return imgURLPattern.test(value);
  };
  [
    body("title", "Title must contain at least 1 character")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("authors", "There must be atleast 1 author")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("body", "Blog content must be at least 5 characters long")
      .trim()
      .isLength({ min: 5 })
      .escape(),
    body("img", "img must be either jpg or png")
      .trim()
      .custom(isValidImageURL)
      .escape(),
    body("comment").trim().escape(),
    body("date").trim().escape(),
    body("hidden").trim().escape(),
    body("hidden", "Hidden must be a boolean value").isBoolean().toBoolean(),
  ];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("Creating blogpost");
  const titleexist = await Blog.find({ title: req.body.title });
  if (!req.body.title) {
    console.log(req.body);
    return res.status(400).json({ error: "Title cannot be empty" });
  }
  if (titleexist.length > 0) {
    return res.status(409).json({
      error: "Blog post with the same title already exists",
      blogpost: titleexist,
    });
  } else {
    const authors =
      typeof req.body.authors === String
        ? [req.body.authors]
        : req.body.authors;
    const newblogpost = new Blog({
      title: req.body.title,
      authors: authors,
      body: req.body.body,
      img: req.body.img,
      comments: req.body.comment,
    });
    await newblogpost.save();
    res.status(201).json({ success: true, blogpost: newblogpost });
  }
});

exports.get_single_blogpost = asyncHandler(async (req, res, next) => {
  const findpost = await Blog.find({ title: req.body.title });
  findpost.length > 0
    ? res.status(200).json({ success: true, blogpost: findpost })
    : res.status(404).json({ error: "Blog post not found" });
});
exports.update_single_blogpost = asyncHandler(async (req, res, next) => {
  const isValidImageURL = (value) => {
    const imgURLPattern = /\.(jpg|png)$/i;
    return imgURLPattern.test(value);
  };
  [
    body("title", "Title must contain at least 1 character")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("authors", "There must be atleast 1 author")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("body", "Blog content must be at least 5 characters long")
      .trim()
      .isLength({ min: 5 })
      .escape(),
    body("img", "img must be either jpg or png")
      .trim()
      .custom(isValidImageURL)
      .escape(),
    body("comment").trim().escape(),
    body("date").trim().escape(),
    body("hidden").trim().escape(),
    body("hidden", "Hidden must be a boolean value").isBoolean().toBoolean(),
  ];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("Updating single blogpost");
  console.log(`Fields with updated values: ${req.body}`);

  const filter = { title: req.params.posttitle };
  const update = req.body;
  const postupdate = await Blog.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (!postupdate) {
    return res
      .status(404)
      .json({ error: "Blog post not found or not updated" });
  }

  res.status(200).json({ success: true, blogpost: postupdate });
});

exports.delete_single_blogpost = asyncHandler(async (req, res, next) => {
  const deleted = await Blog.findOneAndDelete({ title: req.params.posttitle });

  if (deleted) {
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: "Blog post not found or not deleted" });
  }
});

exports.get_blogpost_comments = asyncHandler(async (req, res, next) => {
  console.log("Getting comments for blogpost: " + req.params.posttitle);
  const blog = await Blog.find({ title: req.params.posttitle }).populate(
    "comments"
  );

  if (blog.length > 0) {
    res.status(200).json({ success: true, comments: blog[0].comments });
  } else {
    res.status(404).json({ error: "Blog post not found or doesnt exist" });
  }
});

exports.create_blogpost_comment = asyncHandler(async (req, res, next) => {
  [
    body("author", "Author must contain at least 1 character")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("body", "comment content body must be at least 5 characters long")
      .trim()
      .isLength({ min: 5 })
      .escape(),
    body("date").trim().escape(),
    body("hidden").trim().escape(),
    body("hidden", "Hidden must be a boolean value").isBoolean().toBoolean(),
  ];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("Creating comment and adding to blogpost");

  const newcomment = new Comment(req.body);
  await newcomment.save();
  console.log("Comment created");

  const updatedBlogPost = await Blog.findOneAndUpdate(
    { title: req.params.posttitle },
    { $push: { comments: newcomment.id } },
    { new: true }
  );

  if (updatedBlogPost) {
    res.status(200).json({ success: true, newcomment: newcomment });
  } else {
    res.status(404).json({ error: "Blog post not found or did not update" });
  }
});

exports.get_single_blogpost_comment = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented yet`);
});
exports.update_single_blogpost_comment = asyncHandler(
  //To be sanitized
  async (req, res, next) => {
    res.send(`Not implemented yet`);
  }
);
exports.delete_single_blogpost_comment = asyncHandler(
  async (req, res, next) => {
    res.send(`Not implemented yet`);
  }
);
