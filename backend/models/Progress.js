const mongoose = require("mongoose");
const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedSections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  completed: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model("Progress", progressSchema); 