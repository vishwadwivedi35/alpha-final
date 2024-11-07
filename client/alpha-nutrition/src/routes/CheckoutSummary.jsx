import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/index.comp.css";

const CheckoutSummary = ({
  cartItems,
  phone,
  totalPrice,
  address,
  sessionUserInfo,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(totalPrice);
  const [codSelected, setCodSelected] = useState(false);
  const navigate = useNavigate();

  // When a coupon is applied, COD is deselected and final price is recalculated
  const applyCoupon = () => {
    setCodSelected(false); // Automatically unselect COD when applying a coupon

    if (couponCode === "ALPHA10") {
      const discountAmount = (totalPrice * 0.1).toFixed(2);
      setDiscount(discountAmount);
      setFinalPrice(Number((totalPrice - discountAmount).toFixed(2)));
    } else {
      setDiscount(0);
      setFinalPrice(totalPrice);
    }
  };

  // COD Toggle - Ensure no extra charges when COD is selected
  const handleCODToggle = () => {
    setCodSelected(!codSelected); // Toggle COD selection

    if (!codSelected) {
      // If COD is selected, no delivery charge and final price remains same
      setDiscount(0);
      setFinalPrice(totalPrice); // Set final price to be same as total price
    } else {
      // Reapply coupon if COD is deselected
      setFinalPrice(Number(totalPrice) - discount);
    }
  };

  const handleProceedToPay = async () => {
    const order = {
      user: sessionUserInfo[0].uid,
      email: sessionUserInfo[0].email,
      phone: phone,
      products: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        selectedSize: item.selectedSize,
        selectedFlavour: item.selectedFlavour,
      })),
      totalPrice: Number(finalPrice),
      shippingAddress: address,
      status: "Pending",
      paymentMethod: codSelected ? "COD" : "Online",
    };

    try {
      console.log("Placing order in backend...");
      await axios.post("https://api.alphamuscle.in/api/orders", order);
      console.log("Order placed successfully.");

      if (codSelected) {
        // If COD is selected, redirect directly to success page
        console.log("COD selected. Order placed without online payment.");
        navigate("/checkout");
      } else {
        // Proceed to payment gateway if not COD
        console.log("Generating payment URL...");
        const paymentResponse = await axios.post(
          "https://api.alphamuscle.in/api/payment",
          {
            amount: finalPrice,
            email: sessionUserInfo[0].email,
          }
        );

        const paymentUrl = paymentResponse.data.paymentUrl;

        if (!paymentUrl) {
          throw new Error("Payment URL is not provided by the server");
        }

        console.log("Redirecting to payment URL:", paymentUrl);
        window.location.href = paymentUrl; // Redirect to payment page
      }
    } catch (error) {
      console.error("Error creating order or initiating payment:", error);
    }
  };

  return (
    <div className="checkout-summary">
      <h1 className="heading-secondary">Order Summary</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <div>
              <h2>{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="subtotal">
        <h2>Subtotal: ₹{totalPrice}</h2>
      </div>

      {/* COD Toggle */}
      <div className="cod-toggle">
        <label className="cod-toggle_label">
          <input
            type="checkbox"
            checked={codSelected}
            onChange={handleCODToggle}
          />
          Cash on Delivery (COD) - No extra charges
        </label>
      </div>

      {/* Coupon section only if COD is not selected */}
      {!codSelected && (
        <div className="coupon-section">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="coupon-input"
          />
          <button onClick={applyCoupon} className="btn btn--coupon">
            Apply Coupon
          </button>
        </div>
      )}

      <div className="price-summary">
        <p>Subtotal: ₹{totalPrice}</p>
        {discount > 0 && <p>Coupon Discount: ₹{discount}</p>}
        <p>Final Price: ₹{finalPrice}</p>
      </div>

      <button
        className="btn btn--green btn--proceed-to-pay"
        onClick={handleProceedToPay}
      >
        {codSelected ? `Place Your COD Order` : `Proceed To Pay ₹${finalPrice}`}
      </button>
    </div>
  );
};

export default CheckoutSummary;
