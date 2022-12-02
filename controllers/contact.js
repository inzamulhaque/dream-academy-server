const { createNewContactServices } = require("../services/contact.services");

exports.createNewContact = async (req, res) => {
  try {
    const data = req.body;

    const result = await createNewContactServices(data);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "message not sended" });
    }

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "message not sended" });
  }
};
