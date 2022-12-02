const User = require("../models/User");

exports.getAllUserServices = async (pageNum, usersNum) => {
  return await User.find({})
    .sort("-password")
    .skip(pageNum * usersNum)
    .limit(usersNum);
};

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
  return await User.findByIdAndUpdate({ _id: id }, { status: "active" });
};

exports.findUserByEmailServices = async (email) => {
  return await User.findOne({ email });
};

exports.forgotPasswordServices = async (
  id,
  forgotPasswordToken,
  forgotPasswordTokenExpire
) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { forgotPasswordToken, forgotPasswordTokenExpire }
  );
};

exports.getUserByResetPasswordTokenServices = async (token) => {
  return await User.findOne({ forgotPasswordToken: token });
};

exports.resetPasswordServices = async (id, password) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    {
      password,
      status: "active",
    }
  );
};

exports.updateUserRoleServices = async (id, role) => {
  await User.findByIdAndUpdate(
    { _id: id },
    { role },
    {
      runValidators: true,
    }
  );
  return await User.findById(id);
};
