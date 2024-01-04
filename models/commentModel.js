const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  post: { type: Schema.Types.ObjectId, ref: "blogpost" },
  subcomments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
});

commentSchema.virtual("dateConverted").get(function () {
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

module.exports = mongoose.model("Comment", commentSchema);
