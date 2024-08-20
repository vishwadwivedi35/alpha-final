// orderRoutes.js

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services
  auth: {
    user: "alphamuscle4@gmail.com",
    pass: "erxs szkk wiqy eqzh",
  },
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
            ${product.description}
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
    from: "alphamuscle4@gmail.com",
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
    console.error("Error sending invoice email:", error);
    res.status(500).send("Error sending invoice email");
  }
});

router.post("/", async (req, res) => {
  console.log("Received order:", req.body); // Log the incoming request
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error); // Log the error
    res
      .status(500)
      .json({ error: "Error creating order", details: error.message });
  }
});

module.exports = router;
