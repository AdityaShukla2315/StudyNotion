const User = require("../models/User");
const Course = require("../models/Course");

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch wishlist" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ success: false, message: "Course ID required" });
    const user = await User.findById(req.user.id);
    if (!user.wishlist.includes(courseId)) {
      user.wishlist.push(courseId);
      await user.save();
    }
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add to wishlist" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(id => id.toString() !== courseId);
    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to remove from wishlist" });
  }
}; 