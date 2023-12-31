const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, maxLength: 100 },
  email: { type: String, required: false },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  membership: {
    type: [String],
    enum: ["basic", "creator", "admin"],
    default: ["basic"],
  },
  date: { type: Date, default: Date.now },
  meta: {
    blogupvotes: { type: Number, default: 0 },
    blogdownvotes: { type: Number, default: 0 },
    commentupvotes: { type: Number, default: 0 },
    commentdownvotes: { type: Number, default: 0 },
  },
});

userSchema.virtual("dateConverted").get(function () {
  const formattedDate = this.date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formattedDate;
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
