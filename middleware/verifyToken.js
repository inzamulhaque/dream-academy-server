const jwt = require("jsonwebtoken");
// const { promisify } = require("util");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "You are not logged in",
      });
    }

    // const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_KEY);

    // req.user = decoded;

    // next();

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "forbidden access", err });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      error: error,
    });
  }
};

module.exports = verifyToken;
