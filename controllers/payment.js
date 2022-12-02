const SSLCommerzPayment = require("sslcommerz");
const { findUserByEmailServices } = require("../services/user.services");

exports.payment = async (req, res) => {
  try {
    const data = req.body;
    const { email } = req.user;

    const user = await findUserByEmailServices(email);

    if (!user) {
      return res.status(500).json({ success: false, error: "user not found" });
    }

    const paymentData = {
      total_amount: data.amount,
      currency: "BDT",
      tran_id: "REF123",
      success_url: "http://yoursite.com/success",
      fail_url: "http://yoursite.com/fail",
      cancel_url: "http://yoursite.com/cancel",
      ipn_url: "http://yoursite.com/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: user.name || "Customer Name",
      cus_email: email || "cust@yahoo.com",
      cus_add1: data?.address || "address",
      cus_city: data?.city || "city",
      cus_state: data?.state || "state",
      cus_postcode: data?.postcode || "postcode",
      cus_country: data?.country || "Bangladesh",
      cus_phone: data?.phone || "000",
      cus_fax: data?.phone || "000",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };

    const sslcommer = new SSLCommerzPayment("testbox", "qwerty", false);

    const sslData = await sslcommer.init(paymentData);

    if (!sslData) {
      return res
        .status(500)
        .json({ success: false, error: "payment unsuccessful" });
    }

    res.status(200).json({ success: true, result: sslData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "payment unsuccessful" });
  }
};
