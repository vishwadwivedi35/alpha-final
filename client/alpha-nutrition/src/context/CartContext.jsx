import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (i) =>
        i._id === item._id &&
        i.selectedSize === item.selectedSize &&
        i.selectedFlavour === item.selectedFlavour
    );

    if (existingItem) {
      updateCartItem(
        item._id,
        existingItem.quantity + item.quantity,
        item.selectedSize,
        item.selectedFlavour
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: item.quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== id));
  };

  const updateCartItem = (itemId, quantity, selectedSize, selectedFlavour) => {
    const newCartItems = cartItems.map((item) =>
      item._id === itemId &&
      item.selectedSize === selectedSize &&
      item.selectedFlavour === selectedFlavour
        ? { ...item, quantity }
        : item
    );
    setCartItems(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
