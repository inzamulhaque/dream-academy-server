const Tutorial = require("../models/Tutorial");

exports.addTutorialServices = async (data, user) => {
  return await Tutorial.create({
    ...data,
    "addedBy.name": user.name,
    "addedBy.email": user.email,
    "addedBy.id": user._id,
  });
};
