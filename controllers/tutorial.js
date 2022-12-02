const { getCourseByIdServices } = require("../services/course.services");
const {
  addTutorialServices,
  getAllTutorialServices,
} = require("../services/tutorial.services");
const { findUserByEmailServices } = require("../services/user.services");

exports.addTutorial = async (req, res) => {
  try {
    const { email } = req.user;
    const data = req.body;
    const user = await findUserByEmailServices(email);

    if (!user) {
      return res.status(403).json({ success: false, error: "no user found" });
    }

    const course = await getCourseByIdServices(data.courseId);

    if (!course) {
      return res.status(500).json({ success: false, error: "no course found" });
    }

    const result = await addTutorialServices(data, user, course);

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

exports.getAllTutorial = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const result = await getAllTutorialServices(limit, page);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "tutorial not found" });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "tutorial not found" });
  }
};
