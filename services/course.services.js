const Course = require("../models/Course");

exports.createNewCourseServices = async (data, user) => {
  return await Course.create({
    ...data,
    "createdBy.name": user.name,
    "createdBy.email": user.email,
    "createdBy.id": user._id,
  });
};

exports.getAllCourseService = async (limit, page) => {
  return await Course.find({})
    .skip(page * limit)
    .limit(limit);
};

exports.getCourseByIdServices = async (id) => {
  return await Course.findById(id);
};
