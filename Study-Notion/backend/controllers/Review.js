const Review = require("../models/Review");
exports.getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ course: req.params.id }).populate("user", "firstName lastName");
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};
exports.addCourseReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const course = req.params.id;
    const user = req.user.id;
    // Only one review per user per course
    const existing = await Review.findOne({ course, user });
    if (existing) return res.status(400).json({ success: false, message: "You have already reviewed this course." });
    const review = await Review.create({ course, user, rating, comment });
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add review" });
  }
}; 