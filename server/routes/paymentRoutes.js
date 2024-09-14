// const express = require("express");
// const router = express.Router();
// const Instamojo = require("instamojo-nodejs");
// const dotenv = require("dotenv");

// dotenv.config();

// Instamojo.setKeys(
//   process.env.INSTAMOJO_API_KEY,
//   process.env.INSTAMOJO_AUTH_TOKEN
// );
// Instamojo.isSandboxMode(true);

// router.post("/", (req, res) => {
//   const { amount, buyer_email } = req.body;

//   const paymentData = new Instamojo.PaymentData();
//   paymentData.purpose = "E-commerce Order Payment";
//   paymentData.amount = amount;
//   paymentData.buyer_email = buyer_email;
//   paymentData.redirect_url = "https://api.alphamuscle.in/chekout";

//   Instamojo.createPayment(paymentData, (error, response) => {
//     if (error) {
//       return res.status(500).json({ error: "Payment creation failed" });
//     } else {
//       const responseObject = JSON.parse(response);
//       const paymentUrl = responseObject.payment_request.longurl;
//       return res.status(200).json({ paymentUrl });
//     }
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const INSTAMOJO_API_URL = "https://api.instamojo.com/v2/";
const INSTAMOJO_TOKEN_URL = "https://api.instamojo.com/oauth2/token/";
const INSTAMOJO_API_KEY = process.env.INSTAMOJO_API_KEY;
const INSTAMOJO_CLIENT_SECRET = process.env.INSTAMOJO_CLIENT_SECRET;

let accessToken = null;

// Function to get access token
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      INSTAMOJO_TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: INSTAMOJO_API_KEY,
        client_secret: INSTAMOJO_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    console.log("Access token retrieved successfully.");
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to retrieve access token.");
  }
};

// Payment route
router.post("/", async (req, res) => {
  const { amount, buyer_email } = req.body;

  if (!accessToken) {
    try {
      await getAccessToken();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve access token." });
    }
  }

  const paymentData = {
    purpose: "E-commerce Order Payment",
    amount: amount,
    buyer_email: buyer_email,
    redirect_url: "https://api.alphamuscle.in/chekout",
  };

  try {
    const response = await axios.post(
      `${INSTAMOJO_API_URL}payment-requests/`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      !response.data.payment_request ||
      !response.data.payment_request.longurl
    ) {
      console.error("Payment request creation failed: No longurl in response");
      return res
        .status(500)
        .json({ error: "Payment creation failed: No payment URL received." });
    }

    const paymentUrl = response.data.payment_request.longurl;
    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error(
      "Error creating payment:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Payment creation failed." });
  }
});

module.exports = router;
