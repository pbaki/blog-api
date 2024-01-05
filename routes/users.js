var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../models/userModel");

const userController = require("../controller/userController");

router.post("/register", userController.create_user);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.status(200).json({ success: true });
  });
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};
// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.membership.includes("admin")) {
    return next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

router.get("/users", ensureAuthenticated, isAdmin, userController.get_users);

router.get(
  "/users/:username",
  ensureAuthenticated,
  isAdmin,
  userController.get_single_user
);

router.put(
  "/users/:username",
  ensureAuthenticated,
  isAdmin,
  userController.update_single_user
);
router.delete(
  "/users/:username",
  ensureAuthenticated,
  isAdmin,
  userController.delete_single_user
);

router.get(
  "/users/:username/posts",
  ensureAuthenticated,
  isAdmin,
  userController.get_user_posts
);
router.get(
  "/users/:username/posts/:posttitle",
  ensureAuthenticated,
  isAdmin,
  userController.get_single_user_post
);

router.get(
  "/users/:username/comments",
  ensureAuthenticated,
  isAdmin,
  userController.get_user_comments
);
router.get(
  "/users/:username/comments/:commentid",
  ensureAuthenticated,
  isAdmin,
  userController.get_single_user_comment
);

module.exports = router;
