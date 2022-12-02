const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const image = path.join(__dirname, "./blogImage");

app.use(express.static(image));

//middlewares
app.use(express.json());
app.use(cors());

// import routes
const user = require("./routes/user");
const tutorial = require("./routes/tutorial");
const blog = require("./routes/blog");
const course = require("./routes/course");
const payment = require("./routes/payment");
const contact = require("./routes/contact");

// routes
app.use("/api/v1/user", user);
app.use("/api/v1/tutorial", tutorial);
app.use("/api/v1/blog", blog);
app.use("/api/v1/course", course);
app.use("/api/v1/payment", payment);
app.use("/api/v1/contact", contact);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
