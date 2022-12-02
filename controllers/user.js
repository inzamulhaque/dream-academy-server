const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const {
  createNewUserServices,
  getUserByTokenServices,
  activedUserServices,
  findUserByEmailServices,
  forgotPasswordServices,
  getUserByResetPasswordTokenServices,
  resetPasswordServices,
  getAllUserServices,
  updateUserRoleServices,
} = require("../services/user.services");
const generateToken = require("../utils/generateToken");

exports.getAllUser = async (req, res) => {
  try {
    const pageNum = parseInt(req.query.pageNum);
    const usersNum = parseInt(req.query.usersNum);

    const result = await getAllUserServices(pageNum, usersNum);

    if (!result) {
      return res.status(500).json({ success: false, error: "user not found" });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "user not found" });
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const data = req.body;
    const randomToken = crypto.randomBytes(32).toString("hex");
    const tokenExpire = new Date().getTime() + 1000 * 300;

    if (data.password !== data.confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "password and confirm password doe's not match.",
      });
    }

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

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByEmailServices(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        error: "Password is not correct",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        success: false,
        error: "Your account is not active.",
      });
    }
    const token = generateToken(user.email, user.role);

    const { password: pass, ...others } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Successfully signed In",
      data: {
        token,
        user: others,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "signin error" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params || {};

    if (!token) {
      return res.status(403).json({
        success: false,
        error: "no token found",
      });
    }

    const user = await getUserByTokenServices(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "No user found.",
      });
    }

    const expired = user?.tokenExpire < new Date().getTime();
    if (expired) {
      return res.status(403).json({ success: false, error: "token expired" });
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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Please provide your email",
      });
    }

    const user = await findUserByEmailServices(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "No user found. Please create an account",
      });
    }

    const randomToken = crypto.randomBytes(32).toString("hex");
    const tokenExpire = new Date().getTime() + 1000 * 300;

    const result = await forgotPasswordServices(
      user._id,
      randomToken,
      tokenExpire
    );

    if (!result) {
      return res.status(500).json({ success: false, error: "no user found" });
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
      subject: "Reset Password", // Subject line
      html: `<h1>Reset your password <a href="http://localhost:7000/api/v1/user/resetpass/${randomToken}">Click</a></h1>`, // html body
    });

    if (!info) {
      return res.status(500).json({ success: false, error: "mail not sended" });
    }

    res.status(200).json({ success: true, result: info });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "no user found" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params || {};

    let { password, confirmPassword } = req.body;

    if (!token) {
      return res.status(403).json({
        success: false,
        error: "no token found",
      });
    }

    const user = await getUserByResetPasswordTokenServices(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "No user found.",
      });
    }

    const expired = user?.forgotPasswordTokenExpire < new Date().getTime();
    if (expired) {
      return res.status(403).json({ success: false, error: "token expired" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "password and confirm password doe's not match.",
      });
    }

    password = bcrypt.hashSync(password);

    const result = await resetPasswordServices(user._id, password);

    if (!result) {
      return res.status(500).json({
        success: false,
        error: "password not reseted.",
      });
    }

    const { password: pass, ...others } = user.toObject();

    res.status(200).json({ success: false, result: others });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "token not valid" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.query;
    const result = await updateUserRoleServices(id, role);

    if (!result) {
      return res.status(500).json({ success: false, error: "user not found" });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "user not found" });
  }
};
