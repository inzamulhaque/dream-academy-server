const { addTutorialServices } = require("../services/tutorial.services");
const { findUserByEmailServices } = require("../services/user.services");

exports.addTutorial = async (req, res) => {
  try {
    const { email } = req.user;
    const data = req.body;
    const user = await findUserByEmailServices(email);

    if (!user) {
      return res.status(403).json({ success: false, error: "no user found" });
    }

    const result = await addTutorialServices(data, user);

    if (!result) {
      return res
        .status(400)
        .json({ success: false, error: "tutorial not added" });
    }

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "tutorial not added" });
  }
};
