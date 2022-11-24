const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const {
  createNewUserServices,
  getUserByTokenServices,
  activedUserServices,
} = require("../services/user.services");

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

    let transporter = nodemailer.createTransport({
      host: "mail.softbd.tk",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: result.email, // list of receivers
      subject: "Verification Mail", // Subject line
      html: `<h1>Please verify your account <a href="http://localhost:7000/api/v1/user/verify/${randomToken}">Click</a></h1>`, // html body
    });

    const { name, email, role, status } = result || {};

    res.status(201).json({
      success: true,
      result: { name, email, role, status },
      emailInfo: info,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "user not created" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params || {};
    const user = await getUserByTokenServices(token);
    const expired = user?.tokenExpire < new Date().getTime();
    if (expired) {
      return res.status(400).json({ success: false, error: "token expired" });
    }

    const result = await activedUserServices(user?._id);
    if (!result) {
      return res.status(500).json({ success: false, error: "token not valid" });
    }
    res.status(200).json({ success: true, message: "user actived" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "token not valid" });
  }
};
