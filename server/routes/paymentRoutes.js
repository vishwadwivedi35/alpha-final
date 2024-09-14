const express = require("express");
const router = express.Router();
const Instamojo = require("instamojo-nodejs");
const dotenv = require("dotenv");

dotenv.config();

Instamojo.setKeys(
  process.env.INSTAMOJO_API_KEY,
  process.env.INSTAMOJO_AUTH_TOKEN
);
Instamojo.isSandboxMode(true);

router.post("/", (req, res) => {
  const { amount, buyer_email } = req.body;

  const paymentData = new Instamojo.PaymentData();
  paymentData.purpose = "E-commerce Order Payment";
  paymentData.amount = amount;
  paymentData.buyer_email = buyer_email;
  paymentData.redirect_url = "https://alphamuscle.in/chekout";

  Instamojo.createPayment(paymentData, (error, response) => {
    if (error) {
      return res.status(500).json({ error: "Payment creation failed" });
    } else {
      const responseObject = JSON.parse(response);
      const paymentUrl = responseObject.payment_request.longurl;
      return res.status(200).json({ paymentUrl });
    }
  });
});

module.exports = router;
