const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  authors: [{ type: String }],
  body: String,
  img: { type: Buffer },
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    upvotes: Number,
    downvotes: Number,
  },
});

blogSchema.virtual("dateConverted").get(function () {
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

module.exports = mongoose.model("Blog", blogSchema);
