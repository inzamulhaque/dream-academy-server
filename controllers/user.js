const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { createNewUserServices } = require("../services/user.services");

exports.createNewUser = async (req, res) => {
  try {
    const data = req.body;
    const randomToken = crypto.randomBytes(32).toString("hex");
    const tokenExpire = new Date().getTime() + 1000 * 300;
    data.password = bcrypt.hashSync(data.password);

    const result = await createNewUserServices(data, randomToken, tokenExpire);

    if (!result) {
      res.status(500).json({ success: false, error: "user not created" });
    }

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "user not created" });
  }
};
