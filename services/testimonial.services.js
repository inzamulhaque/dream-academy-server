const Testimonial = require("../models/Testimonial");

exports.getAllTestimonialsServices = async () => {
  return await Testimonial.find({});
};

exports.createTestimonialServices = async (data, user) => {
  return await Testimonial.create({
    ...data,
    "rivewedBy.name": user.name,
    "rivewedBy.email": user.email,
    "rivewedBy.role": user.role,
    "rivewedBy.id": user._id,
  });
};
