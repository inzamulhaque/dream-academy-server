const fs = require("fs");
const path = require("path");

exports.getImage = async (req, res) => {
  try {
    const { img } = req.params;
    // fs.readFile(`./blogImage/${img}`, "utf-8", (err, image) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).json({ success: false, error: "internal error" });
    //   } else {
    //     res.status(200).json({ success: true, image });
    //   }
    // });

    res.sendFile(path.join(__dirname, `../blogImage/${img}`));
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "image not found" });
  }
};
