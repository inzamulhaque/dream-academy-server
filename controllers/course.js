const {
  createNewCourseServices,
  getAllCourseService,
  getCourseByIdServices,
} = require("../services/course.services");
const { findUserByEmailServices } = require("../services/user.services");

exports.createNewCourse = async (req, res) => {
  try {
    const data = req.body;
    const { email } = req.user;
    const user = await findUserByEmailServices(email);

    if (!user) {
      return res.status(500).json({ success: false, error: "user not found" });
    }

    const result = await createNewCourseServices(data, user);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "course not created" });
    }

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "course not created" });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const result = await getAllCourseService(limit, page);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "course not found" });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "course not found" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getCourseByIdServices(id);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "course not found" });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "course not found" });
  }
};
