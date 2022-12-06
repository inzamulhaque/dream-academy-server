const {
  createTestimonialServices,
  getAllTestimonialsServices,
} = require("../services/testimonial.services");
const { findUserByEmailServices } = require("../services/user.services");

exports.getAllTestimonials = async (req, res) => {
  try {
    const result = await getAllTestimonialsServices();

    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "testimonial not found" });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "testimonial not found" });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { email } = req.user;
    const data = req.body;
    const user = await findUserByEmailServices(email);

    if (!user) {
      return res.status(400).json({ success: false, error: "user not found" });
    }

    const result = await createTestimonialServices(data, user);

    if (!result) {
      return res
        .status(400)
        .json({ success: false, error: "testimonial not created" });
    }

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "testimonial not created" });
  }
};
