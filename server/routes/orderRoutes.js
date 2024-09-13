// orderRoutes.js

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const crypto = require("crypto");
const {
  createOrder,
  findOrderByPaymentRequestId,
} = require("../controllers/orderController");

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services
  auth: {
    user: "vishwadwivedi22@gmail.com",
    pass: "hwgl pnhw nlur ihuy",
  },
});

router.post("/instamojo/webhook", async (req, res) => {
  try {
    const secret = process.env.INSTAMOJO_WEBHOOK_SECRET; // Set your webhook secret in .env
    const instamojoSignature = req.headers["x-instamojo-signature"]; // Get signature from headers

    // Validate webhook signature
    const payloadBody = JSON.stringify(req.body);
    const generatedSignature = crypto
      .createHmac("sha1", secret)
      .update(payloadBody)
      .digest("hex");

    if (generatedSignature !== instamojoSignature) {
      return res.status(400).send("Invalid Webhook Signature");
    }

    const { payment_request_id, payment_id, status } = req.body;

    // Find the order associated with this payment_request_id
    const order = await findOrderByPaymentRequestId(payment_request_id);
    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Update order status based on webhook response
    if (status === "Credit") {
      order.status = "Paid"; // Payment successful
      order.payment_id = payment_id;
    } else {
      order.status = "Failed"; // Payment failed
    }

    // Save the updated order to the database
    await order.save();

    // Send back success response to Instamojo
    res.status(200).send("Webhook received and processed");
  } catch (error) {
    console.error("Error processing webhook:", error.message, error.stack);
    res.status(500).send("Server error");
  }
});

// Send Invoice Email
router.post("/send-invoice", async (req, res) => {
  const { email, order } = req.body;
  console.log(req.body);

  // Construct the email content
  const productDetails = order.products
    .map(
      (product) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #dddddd;">
            ${product.name}
          </td>
          <td style="padding: 10px; border: 1px solid #dddddd;">
            ${product.longDescription}
          </td>
          <td style="padding: 10px; border: 1px solid #dddddd;">
            ${product.quantity}
          </td>
          <td style="padding: 10px; border: 1px solid #dddddd;">
            ₹${product.price}
          </td>
        </tr>
      `
    )
    .join("");

  const mailOptions = {
    from: "vishwadwivedi22@gmail.com",
    to: email,
    subject: "Your Order Invoice",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="text-align: center; color: #4CAF50;">Thank you for your order!</h1>
        <p><strong>User Email:</strong> ${order.email}</p>
        <h2>Order Details:</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="padding: 10px; border: 1px solid #dddddd; background-color: #f2f2f2;">Product Name</th>
              <th style="padding: 10px; border: 1px solid #dddddd; background-color: #f2f2f2;">Description</th>
              <th style="padding: 10px; border: 1px solid #dddddd; background-color: #f2f2f2;">Quantity</th>
              <th style="padding: 10px; border: 1px solid #dddddd; background-color: #f2f2f2;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${productDetails}
          </tbody>
        </table>
        <p style="margin-top: 20px;"><strong>Total Price:</strong> ₹${order.totalPrice}</p>
        <p><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Invoice email sent successfully");
  } catch (error) {
    console.error("Error sending invoice email:", error.message, error.stack); // log the error message and stack trace
    res.status(500).json({
      error: "Error sending invoice email",
      message: error.message,
      stack: error.stack,
    });
  }
});

router.post("/", async (req, res) => {
  console.log("Received order:", req.body); // Log the incoming request

  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error.message, error.stack); // Log the error with details
    res.status(500).json({
      error: "Error creating order",
      message: error.message,
      stack: error.stack, // Include stack trace for detailed debugging
    });
  }
});

module.exports = router;
