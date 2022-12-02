const {
  addBlogServices,
  getAllBlogServices,
} = require("../services/blog.services");
const { findUserByEmailServices } = require("../services/user.services");

exports.addBlog = async (req, res) => {
  try {
    const data = req.body;
    const image = req.imageName;
    const { email } = req.user;

    const user = await findUserByEmailServices(email);

    if (!user) {
      return res.status(500).json({ success: false, error: "user not found" });
    }

    const result = await addBlogServices(data, image, user);

    if (!result) {
      return res.status(500).json({ success: false, error: "blog not added" });
    }

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "blog not added" });
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const result = await getAllBlogServices(limit, page);

    if (!result) {
      return res.status(500).json({ success: false, error: "blog not found" });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "blog not found" });
  }
};
