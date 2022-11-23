const User = require("../models/User");

exports.createNewUserServices = async (data, randomToken, tokenExpire) => {
  const result = await User.create({
    ...data,
    verificationToken: randomToken,
    tokenExpire,
  });
  return result;
};
