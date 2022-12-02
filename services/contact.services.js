const Contact = require("../models/Contact");

exports.createNewContactServices = async (data) => {
  return await Contact.create(data);
};
