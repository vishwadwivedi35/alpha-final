import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import "../css/index.comp.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);
  const { sessionUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const calculateTotalPrice = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateOverallTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const sendInvoiceEmail = async (email, order) => {
    try {
      const response = await fetch(
        "https://api.alphamuscle.in/api/orders/send-invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, order }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Invoice email sent successfully");
    } catch (error) {
      console.error("Error sending invoice email:", error);
    }
  };

  const handleProceedToCheckout = async () => {
    if (!sessionUserInfo || sessionUserInfo.length === 0) {
      setShowSignInPrompt(true);
      return;
    }

    const order = {
      user: sessionUserInfo[0].uid,
      email: sessionUserInfo[0].email,
      products: cartItems.map(
        ({
          _id,
          quantity,
          price,
          name,
          description,
          longDescription,
          selectedSize,
          selectedFlavour,
        }) => ({
          product: _id,
          name,
          description,
          longDescription,
          quantity,
          price,
          selectedSize,
          selectedFlavour,
        })
      ),
      totalPrice: calculateOverallTotal(),
      shippingAddress: address,
      status: "Pending",
    };

    console.log("Order Payload:", order);

    try {
      const response = await fetch("https://api.alphamuscle.in/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Send invoice email
      await sendInvoiceEmail(sessionUserInfo[0].email, order);

      navigate("/checkout");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleAddressSubmit = () => {
    const addressData = document.getElementById("addressTextarea").value;
    if (addressData) {
      setAddress(addressData);
      setShowAddressForm(false);
    }
  };

  return (
    <div className="cart">
      <h1 className="heading-secondary">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li
                key={`${item._id}-${item.selectedSize}-${item.selectedFlavour}`}
                className="cart-item"
              >
                <img src={item.images[0]} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p>Size: {item.selectedSize || "Not Selected"}</p>
                  <p>Flavour: {item.selectedFlavour || "Not Selected"}</p>
                  <p className="price">
                    Total Price: ₹
                    {calculateTotalPrice(item.price, item.quantity)}
                  </p>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateCartItem(
                          item._id,
                          item.quantity - 1,
                          item.selectedSize,
                          item.selectedFlavour
                        )
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItem(
                          item._id,
                          item.quantity + 1,
                          item.selectedSize,
                          item.selectedFlavour
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn--green"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {address ? (
            <div className="address-summary">
              <h3>Shipping Address</h3>
              <p>{address}</p>
            </div>
          ) : null}

          {!showAddressForm && (
            <div className="form__group">
              <button
                className="btn btn--green"
                onClick={() => setShowAddressForm(true)}
              >
                Add Shipping Address
              </button>
            </div>
          )}

          {showAddressForm && (
            <div className="row">
              <div className="address-form">
                <div className="u-margin-bottom-medium">
                  <h2 className="heading-secondary">
                    Add Shipping Address With Phone Number
                  </h2>
                </div>
                <div className="form__group">
                  <textarea
                    id="addressTextarea"
                    className="form__input"
                    placeholder="Please Provide Your Contact number"
                    required
                  ></textarea>
                  <label htmlFor="addressTextarea" className="form__label">
                    Address
                  </label>
                </div>
                <div className="form__group">
                  <button
                    className="btn btn--green"
                    onClick={handleAddressSubmit}
                  >
                    Save Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {showSignInPrompt && (
            <div className="sign-in-prompt">
              <p className="heading-tertiary">
                You need to sign in before proceeding to checkout.
              </p>
              <button
                className="btn btn--green"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </button>
            </div>
          )}

          <div className="cart-total">
            <span className="total-price">Total:</span>
            <span className="total-amount">₹{calculateOverallTotal()}</span>
            <button
              onClick={handleProceedToCheckout}
              className="btn btn--green btn--proceed-to-checkout"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
