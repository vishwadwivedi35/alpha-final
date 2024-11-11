import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import CheckoutSummary from "./CheckoutSummary";
import "../css/index.comp.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);
  const { sessionUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold the phone number
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [showCheckoutSummary, setShowCheckoutSummary] = useState(false); // To show CheckoutSummary after proceed

  const calculateTotalPrice = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateOverallTotal = () => {
    return Number(
      cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
  };

  const handleProceedToCheckout = () => {
    if (!sessionUserInfo || sessionUserInfo.length === 0) {
      setShowSignInPrompt(true);
      return;
    }

    if (!address) {
      setShowAddressForm(true);
      return;
    }

    // Show CheckoutSummary if user is logged in and address is set
    setShowCheckoutSummary(true);
  };

  const handleAddressSubmit = () => {
    const addressData = document.getElementById("addressTextarea").value;
    if (addressData && phoneNumber) {
      setAddress(`${addressData}, Contact: ${phoneNumber}`);
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
            {cartItems.map((item) => {
              // Find the selected flavour object
              const selectedFlavourObject = item.flavours.find(
                (flavour) => flavour.flavourName === item.selectedFlavour
              );

              // Get the images array for the selected flavour
              const images = selectedFlavourObject
                ? selectedFlavourObject.images
                : [];

              return (
                <li
                  key={`${item._id}-${item.selectedSize}-${item.selectedFlavour}-${item.selectedFreebie}`}
                  className="cart-item"
                >
                  <img
                    src={images[0] || "default-image-url.jpg"}
                    alt={item.name}
                  />
                  <div>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Size: {item.selectedSize || "Not Selected"}</p>
                    <p>Flavour: {item.selectedFlavour || "Not Selected"}</p>
                    <p>Freebie: {item.selectedFreebie || "Not Selected"}</p>
                    <p className="price">
                      Total Price: ₹
                      {calculateTotalPrice(item.price, item.quantity)}
                    </p>
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          updateCartItem(
                            item._id,
                            item.name,
                            item.quantity - 1,
                            item.selectedSize,
                            item.selectedFlavour,
                            item.selectedFreebie
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
                            item.name,
                            item.quantity + 1,
                            item.selectedSize,
                            item.selectedFlavour,
                            item.selectedFreebie
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
              );
            })}
          </ul>

          {/* Show address summary if already filled */}
          {address ? (
            <div className="address-summary">
              <h3>Shipping Address</h3>
              <p>{address}</p>
            </div>
          ) : null}

          {/* Toggle for showing the address form */}
          {!showAddressForm && !address && (
            <div className="form__group">
              <button
                className="btn btn--green"
                onClick={() => setShowAddressForm(true)}
              >
                Add Shipping Address
              </button>
            </div>
          )}

          {/* Address Form */}
          {showAddressForm && (
            <div className="row">
              <div className="address-form">
                <div className="u-margin-bottom-medium">
                  <h2 className="heading-secondary">Add Shipping Address</h2>
                </div>
                <div className="form__group">
                  <textarea
                    id="addressTextarea"
                    className="form__input"
                    placeholder="Enter Your Address"
                    required
                  ></textarea>
                  <label htmlFor="addressTextarea" className="form__label">
                    Address
                  </label>
                </div>
                <div className="form__group">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="form__input"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                  <label className="form__label">Phone Number</label>
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

          {/* Sign-in Prompt if user is not logged in */}
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

          {/* Total and Proceed button */}
          <div className="cart-total">
            <span className="total-price">Total:</span>
            <span className="total-amount">₹{calculateOverallTotal()}</span>
            <button
              onClick={handleProceedToCheckout}
              className="btn btn--green btn--proceed-to-checkout"
            >
              Proceed
            </button>
          </div>

          {/* Conditionally render CheckoutSummary after "Proceed" */}
          {showCheckoutSummary && (
            <CheckoutSummary
              phone={phoneNumber}
              cartItems={cartItems}
              totalPrice={calculateOverallTotal()}
              address={address}
              sessionUserInfo={sessionUserInfo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
