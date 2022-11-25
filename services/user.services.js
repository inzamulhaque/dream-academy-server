const User = require("../models/User");

exports.createNewUserServices = async (data, randomToken, tokenExpire) => {
  const result = await User.create({
    ...data,
    verificationToken: randomToken,
    tokenExpire,
  });
  return result;
};

exports.getUserByTokenServices = async (token) => {
  return await User.findOne({ verificationToken: token });
};

exports.activedUserServices = async (id) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { status: "active", verificationToken: null }
  );
};

exports.findUserByEmailServices = async (email) => {
  return User.findOne({ email });
};
