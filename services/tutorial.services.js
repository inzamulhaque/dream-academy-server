const Course = require("../models/Course");
const Tutorial = require("../models/Tutorial");

exports.addTutorialServices = async (data, user, course) => {
  const result = await Tutorial.create({
    ...data,
    "addedBy.name": user.name,
    "addedBy.email": user.email,
    "addedBy.id": user._id,
    "course.title": course.title,
    "course.id": course._id,
  });
  await Course.findByIdAndUpdate(
    { _id: course._id },
    {
      $push: { tutorials: { title: result.title, id: result._id } },
    }
  );
  return result;
};

exports.getAllTutorialServices = async (limit, page) => {
  return Tutorial.find({})
    .skip(page * limit)
    .limit(limit);
};
