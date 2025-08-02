const Badge = require("../models/Badge");
exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.find({ user: req.user.id });
    res.json({ success: true, badges });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch badges" });
  }
};
exports.awardBadge = async (req, res) => {
  try {
    const { name, icon, description } = req.body;
    const badge = await Badge.create({ user: req.user.id, name, icon, description });
    res.json({ success: true, badge });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to award badge" });
  }
}; 