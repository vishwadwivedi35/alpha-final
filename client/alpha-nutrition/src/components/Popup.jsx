import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/cartContext";
import "../css/index.comp.css";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleBookNow = () => {
    const item = {
      image: "/img/nat-8.jpg",
      name: "Tour Package",
      description: "A wonderful tour package.",
      price: 299,
    };
    addToCart(item);
    setIsVisible(false);
    navigate("/cart");
  };

  return (
    isVisible && (
      <div className="popup" id="popup">
        <div className="popup__content">
          <div className="popup__left">
            <img src="/img/nat-8.jpg" alt="Tour photo" className="popup__img" />
            <img src="/img/nat-9.jpg" alt="Tour photo" className="popup__img" />
          </div>
          <div className="popup__right">
            <button className="popup__close" onClick={closePopup}>
              &times;
            </button>
            <h2 className="heading-secondary u-margin-bottom-small">
              Product Details Page
            </h2>
            <h3 className="heading-tertiary u-margin-bottom-small">
              Important – Please read these terms before booking
            </h3>
            <p className="popup__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              sed risus pretium quam. Aliquam sem et tortor consequat id.
              Volutpat odio facilisis mauris sit amet massa vitae. Mi bibendum
              neque egestas congue. Placerat orci nulla pellentesque dignissim
              enim sit. Vitae semper quis lectus nulla at volutpat diam ut
              venenatis. Malesuada pellentesque elit eget gravida cum sociis
              natoque penatibus et. Proin fermentum leo vel orci porta non
              pulvinar neque laoreet. Gravida neque convallis a cras semper.
              Molestie at elementum eu facilisis sed odio morbi quis. Faucibus
              vitae aliquet nec ullamcorper sit amet risus nullam eget. Nam
              libero justo laoreet sit. Amet massa vitae tortor condimentum
              lacinia quis vel eros donec. Sit amet facilisis magna etiam.
              Imperdiet sed euismod nisi porta.
            </p>
            <button className="btn btn--green" onClick={handleBookNow}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
