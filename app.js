const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

// import routes
const user = require("./routes/user");
const tutorial = require("./routes/tutorial");

// routes
app.use("/api/v1/user", user);
app.use("/api/v1/tutorial", tutorial);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
