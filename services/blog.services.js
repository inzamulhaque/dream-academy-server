const Blog = require("../models/Blog");

exports.addBlogServices = async (data, image, user) => {
  return await Blog.create({
    ...data,
    image,
    "createBy.name": user.name,
    "createBy.email": user.email,
    "createBy.role": user.role,
    "createBy.id": user._id,
  });
};

exports.getAllBlogServices = async (limit, page) => {
  return await Blog.find({})
    .skip(page * limit)
    .limit(limit);
};
