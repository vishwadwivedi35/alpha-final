// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import "../css/index.comp.css";

// const CheckoutSummary = ({
//   cartItems,
//   totalPrice,
//   address,
//   sessionUserInfo,
// }) => {
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(totalPrice);
//   const navigate = useNavigate();

//   const applyCoupon = () => {
//     if (couponCode === "DISCOUNT10") {
//       const discountAmount = (totalPrice * 0.1).toFixed(2);
//       setDiscount(discountAmount);
//       setFinalPrice(Number((totalPrice - discountAmount).toFixed(2)));
//     } else {
//       setDiscount(0);
//       setFinalPrice(totalPrice);
//     }
//   };

//   const sendInvoiceEmail = async (email, order) => {
//     try {
//       const response = await fetch(
//         "https://api.alphamuscle.in/api/send-invoice",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, order }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       console.log("Invoice sent successfully");
//     } catch (error) {
//       console.error("Error sending invoice email:", error);
//     }
//   };

//   // const handleProceedToPay = async () => {
//   //   const order = {
//   //     user: sessionUserInfo[0].uid,
//   //     email: sessionUserInfo[0].email,
//   //     products: cartItems.map((item) => ({
//   //       product: item._id,
//   //       name: item.name,
//   //       longDescription: item.longDescription,
//   //       quantity: item.quantity,
//   //       price: item.price,
//   //       selectedSize: item.selectedSize,
//   //       selectedFlavour: item.selectedFlavour,
//   //     })),
//   //     totalPrice: Number(finalPrice),
//   //     shippingAddress: address,
//   //     status: "Pending",
//   //   };

//   //   console.log("Order Payload:", order);

//   //   try {
//   //     const response = await fetch("https://api.alphamuscle.in/api/orders", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(order),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Network response was not ok");
//   //     }

//   //     await sendInvoiceEmail(sessionUserInfo[0].email, order);

//   //     console.log("Order placed and invoice sent successfully");
//   //   } catch (error) {
//   //     console.error("Error creating order:", error);
//   //   }
//   //   navigate("/checkout");
//   // };

//   // const handleProceedToPay = async () => {
//   //   const order = {
//   //     user: sessionUserInfo[0].uid,
//   //     email: sessionUserInfo[0].email,
//   //     products: cartItems.map((item) => ({
//   //       product: item._id,
//   //       name: item.name,
//   //       quantity: item.quantity,
//   //       price: item.price,
//   //       selectedSize: item.selectedSize,
//   //       selectedFlavour: item.selectedFlavour,
//   //     })),
//   //     totalPrice: Number(finalPrice),
//   //     shippingAddress: address,
//   //     status: "Pending",
//   //   };

//   //   console.log("Order Payload:", order);

//   //   try {
//   //     // First, create an order in your backend
//   //     const { data } = await axios.post(
//   //       "https://api.alphamuscle.in/api/orders",
//   //       order
//   //     );

//   //     // Then, get the payment link from the backend
//   //     const paymentResponse = await axios.post(
//   //       "https://api.alphamuscle.in/api/payment",
//   //       {
//   //         amount: finalPrice,
//   //         buyer_email: sessionUserInfo[0].email,
//   //       }
//   //     );

//   //     const paymentUrl = paymentResponse.data.payment_request.longurl;

//   //     // Redirect the user to the payment page
//   //     window.location.href = paymentUrl;
//   //   } catch (error) {
//   //     console.error("Error creating order or initiating payment:", error);
//   //   }
//   // };

//   const handleProceedToPay = async () => {
//     const order = {
//       user: sessionUserInfo[0].uid,
//       email: sessionUserInfo[0].email,
//       products: cartItems.map((item) => ({
//         product: item._id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         selectedSize: item.selectedSize,
//         selectedFlavour: item.selectedFlavour,
//       })),
//       totalPrice: Number(finalPrice),
//       shippingAddress: address,
//       status: "Pending",
//     };

//     try {
//       console.log("Placing order in backend...");
//       await axios.post("https://api.alphamuscle.in/api/orders", order);
//       console.log("Order placed successfully. Now generating payment URL...");

//       const paymentResponse = await axios.post(
//         "https://api.alphamuscle.in/api/payment",
//         {
//           amount: finalPrice,
//           email: sessionUserInfo[0].email,
//         }
//       );

//       const paymentUrl = paymentResponse.data.paymentUrl;

//       if (!paymentUrl) {
//         throw new Error("Payment URL is not provided by the server");
//       }

//       console.log("Redirecting to payment URL:", paymentUrl);
//       window.location.href = paymentUrl; // Redirect to the payment page
//     } catch (error) {
//       console.error("Error creating order or initiating payment:", error);
//     }
//   };

//   return (
//     <div className="checkout-summary">
//       <h1 className="heading-secondary">Order Summary</h1>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item._id}>
//             <div>
//               <h2>{item.name}</h2>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: ₹{item.price}</p>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="subtotal">
//         <h2>Subtotal: ₹{totalPrice}</h2>
//       </div>

//       <div className="coupon-section">
//         <input
//           type="text"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//           placeholder="Enter coupon code"
//           className="coupon-input"
//         />
//         <button onClick={applyCoupon} className="btn btn--green">
//           Apply Coupon
//         </button>
//       </div>

//       <div className="price-summary">
//         <p>Subtotal: ₹{totalPrice}</p>
//         <p>Coupon Discount: ₹{discount}</p>
//         <p>Final Price: ₹{finalPrice}</p>
//       </div>

//       <button
//         className="btn btn--green btn--proceed-to-pay"
//         onClick={handleProceedToPay}
//       >
//         Proceed To Pay ₹{finalPrice}
//       </button>
//     </div>
//   );
// };

// export default CheckoutSummary;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/index.comp.css";

const CheckoutSummary = ({
  cartItems,
  totalPrice,
  address,
  sessionUserInfo,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(totalPrice);
  const [codSelected, setCodSelected] = useState(false); // New COD state
  const [deliveryCharge, setDeliveryCharge] = useState(0); // To track delivery charge
  const navigate = useNavigate();

  const applyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      const discountAmount = (totalPrice * 0.1).toFixed(2);
      setDiscount(discountAmount);
      setFinalPrice(Number((totalPrice - discountAmount).toFixed(2)));
    } else {
      setDiscount(0);
      setFinalPrice(totalPrice);
    }
  };

  const handleCODToggle = () => {
    setCodSelected(!codSelected); // Toggle COD selection

    if (!codSelected) {
      // Add delivery charge if COD is selected
      setDeliveryCharge(100);
      setFinalPrice(Number(totalPrice) + 100);
    } else {
      // Remove delivery charge when COD is deselected
      setDeliveryCharge(0);
      setFinalPrice(Number(totalPrice) - discount); // Reapply coupon if any
    }
  };

  const handleProceedToPay = async () => {
    const order = {
      user: sessionUserInfo[0].uid,
      email: sessionUserInfo[0].email,
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
      paymentMethod: codSelected ? "COD" : "Online", // Track payment method
    };

    try {
      console.log("Placing order in backend...");
      await axios.post("https://api.alphamuscle.in/api/orders", order);
      console.log("Order placed successfully. Now generating payment URL...");

      if (!codSelected) {
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
        window.location.href = paymentUrl; // Redirect to the payment page
      } else {
        console.log("COD selected. Order placed without online payment.");
        navigate("/order-success");
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
        <label>
          <input
            type="checkbox"
            checked={codSelected}
            onChange={handleCODToggle}
          />
          Cash on Delivery (COD) - ₹100 Delivery Charges
        </label>
      </div>

      {/* Disable coupon if COD is selected */}
      {!codSelected && (
        <div className="coupon-section">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="coupon-input"
            disabled={codSelected} // Disable if COD is selected
          />
          <button onClick={applyCoupon} className="btn btn--green">
            Apply Coupon
          </button>
        </div>
      )}

      <div className="price-summary">
        <p>Subtotal: ₹{totalPrice}</p>
        {discount > 0 && <p>Coupon Discount: ₹{discount}</p>}
        {codSelected && <p>Delivery Charges: ₹{deliveryCharge}</p>}
        <p>Final Price: ₹{finalPrice}</p>
      </div>

      <button
        className="btn btn--green btn--proceed-to-pay"
        onClick={handleProceedToPay}
      >
        {codSelected ? `Place COD Order` : `Proceed To Pay ₹${finalPrice}`}
      </button>
    </div>
  );
};

export default CheckoutSummary;
