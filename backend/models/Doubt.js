const mongoose = require("mongoose");
const doubtSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: String, required: true },
  answer: { type: String },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
module.exports = mongoose.model("Doubt", doubtSchema); 