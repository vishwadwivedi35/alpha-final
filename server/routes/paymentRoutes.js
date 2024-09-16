const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

// const INSTAMOJO_API_URL = "https://api.instamojo.com/v2/payment_requests/";
// const INSTAMOJO_TOKEN_URL = "https://api.instamojo.com/oauth2/token/";
// const INSTAMOJO_CLIENT_ID = process.env.INSTAMOJO_CLIENT_ID;
// const INSTAMOJO_CLIENT_SECRET = process.env.INSTAMOJO_CLIENT_SECRET;

let accessToken = null;
let tokenExpirationTime = null;

// Function to get access token
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://api.instamojo.com/oauth2/token/",
      new URLSearchParams({
        grant_type: "client_credentials",

        client_id: "lhQRw36lLmgf9vMNGu7CX3CpM5HO9i0v54BCPjzm",
        client_secret:
          "vXG9JBG2P8pQ0EVXKakoGjtC0TeSYe3XJXlpx5VAVViLp8ptKvcDkrpEVGLRNiq1fAiCVN7xnGe0ErvDqhxsDzdteQOh3ERm8jbvPH7QHPWFbom9Lo9RvWam6X3cXxOs",
      }),
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    console.log(accessToken);
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000; // Set expiration time

    console.log(
      "Access token retrieved successfully. Expires in:",
      response.data.expires_in
    );
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to retrieve access token.");
  }
};

const ensureValidAccessToken = async (req, res, next) => {
  try {
    if (!accessToken || Date.now() >= tokenExpirationTime) {
      console.log(
        "Access token is expired or missing. Requesting a new one..."
      );
      await getAccessToken();
    } else {
      console.log("Using existing valid access token.");
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve access token." });
  }
};

// Payment route
router.post("/", ensureValidAccessToken, async (req, res) => {
  const { amount, buyer_email } = req.body;

  const paymentData = {
    amount: amount,
    purpose: "Product Purchase",
    email: buyer_email,
    redirect_url: "https://api.alphamuscle.in/checkout",
    allow_repeated_payments: false,
    send_email: false,
  };

  try {
    console.log("Creating a new payment request...");

    const response = await axios.post(
      "https://api.instamojo.com/v2/payment_requests/",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentRequest = response.data;

    if (!paymentRequest || !paymentRequest.longurl) {
      console.error("Payment request creation failed: No longurl in response");
      return res
        .status(500)
        .json({ error: "Payment creation failed: No payment URL received." });
    }

    const paymentUrl = paymentRequest.longurl;
    console.log("Payment URL generated:", paymentUrl);
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
