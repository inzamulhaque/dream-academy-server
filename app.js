const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

// import routes
const user = require("./routes/user");
const tutorial = require("./routes/tutorial");
const blog = require("./routes/blog");

// routes
app.use("/api/v1/user", user);
app.use("/api/v1/tutorial", tutorial);
app.use("/api/v1/blog", blog);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
