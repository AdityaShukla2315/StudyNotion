const Doubt = require("../models/Doubt");
exports.getCourseDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find({ course: req.params.id }).populate("user", "firstName lastName").populate("answeredBy", "firstName lastName");
    res.json({ success: true, doubts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch doubts" });
  }
};
exports.addCourseDoubt = async (req, res) => {
  try {
    const { question } = req.body;
    const course = req.params.id;
    const user = req.user.id;
    const doubt = await Doubt.create({ course, user, question });
    res.json({ success: true, doubt });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add doubt" });
  }
};
exports.answerDoubt = async (req, res) => {
  try {
    const { answer } = req.body;
    const doubt = await Doubt.findById(req.params.doubtId);
    if (!doubt) return res.status(404).json({ success: false, message: "Doubt not found" });
    doubt.answer = answer;
    doubt.answeredBy = req.user.id;
    await doubt.save();
    res.json({ success: true, doubt });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to answer doubt" });
  }
}; 