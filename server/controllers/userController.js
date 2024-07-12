const userModel = require("../models/userModel");

exports.getUserInfo = async (req, res) => {
  // Check if session data is available = req.session.user exists and contains a userId ?
  try {
    const userId = req.session.userId;
    const userInfo = await userModel.getUserById(userId);
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
