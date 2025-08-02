const mongoose = require("mongoose");
const badgeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  icon: { type: String },
  description: { type: String },
  awardedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Badge", badgeSchema); 