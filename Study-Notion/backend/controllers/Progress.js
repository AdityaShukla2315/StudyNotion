const Progress = require("../models/Progress");
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.user.id, course: req.params.courseId });
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch progress" });
  }
};
exports.updateProgress = async (req, res) => {
  try {
    const { completedSections, completed } = req.body;
    let progress = await Progress.findOne({ user: req.user.id, course: req.params.courseId });
    if (!progress) {
      progress = await Progress.create({ user: req.user.id, course: req.params.courseId, completedSections, completed });
    } else {
      progress.completedSections = completedSections;
      progress.completed = completed;
      await progress.save();
    }
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update progress" });
  }
}; 