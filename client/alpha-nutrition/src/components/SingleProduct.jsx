import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import logo from "../img/ALPHA-Logo-round-white.png";
import "../css/index.comp.css"; // Add your custom CSS here

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart, updateCartItem, cartItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.alphamuscle.in/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);

        // Update quantity if product is already in cart
        const cartItem = cartItems.find((item) => item.id === data.id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }

        // Initialize default size and flavour if available
        setSelectedSize(data.sizes ? data.sizes[0] : "");
        setSelectedFlavour(data.flavours ? data.flavours[0] : "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, cartItems]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedSize, selectedFlavour });
    navigate("/cart"); // Redirect to cart page after adding to cart
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      updateCartItem(product.id, newQuantity); // Update the quantity in CartContext
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const sizeOptions = () => {
    switch (product.category) {
      case "Whey Protein":
        return ["1kg", "2kg"];
      case "Weight And Mass Gainers":
        return ["1kg", "2kg", "3kg", "5kg"];
      case "Pre and Post Workouts":
        return ["100gm", "200gm", "250gm", "300gm"];
      default:
        return [];
    }
  };

  const flavourOptions = () => {
    switch (product.category) {
      case "Whey Protein":
        return ["Rich Chocolate", "Kaju Keshar Pista", "Malai Kulfi", "Mango"];
      case "Weight And Mass Gainers":
        return ["Malai Kulfi", "Rich Chocolate", "Keshar Pista"];
      case "Pre and Post Workouts":
        return ["Blackcurrent", "Blueberry"];
      default:
        return [];
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="section-book section-book__singleProduct">
        <Link className="header__logo-box" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <section className="section-about section-about__singleProduct">
          <div className="u-center-text u-margin-bottom-big">
            <h1 className="heading-secondary heading-secondary__singleProduct">
              Product Details
            </h1>
          </div>
          <div className="line"></div>
          <div className="row">
            <div className="col-1-of-2">
              <div className="single-product">
                <div className="single-product__images">
                  <button
                    onClick={handlePreviousImage}
                    className="btn btn--green slider-button slider-button--left"
                  >
                    &lt;
                  </button>
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="single-product__image"
                  />
                  <button
                    onClick={handleNextImage}
                    className="btn btn--green slider-button slider-button--right"
                  >
                    &gt;
                  </button>
                </div>
                <div className="single-product__preview">
                  <div className="single-product__thumbnails">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        className={`single-product__thumbnail ${
                          index === currentImageIndex
                            ? "single-product__thumbnail--active"
                            : ""
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1-of-2">
              <div className="single-product__details">
                <h1 className="heading-tertiary u-margin-bottom-small heading-tertiary__singleProduct">
                  {product.name}
                </h1>
                <p className="heading-tertiary u-margin-bottom-small">
                  {product.description}
                </p>
                <p className="heading-tertiary u-margin-bottom-small single-product__price">
                  Price: ₹{product.price}
                </p>
                <div className="line"></div>
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(quantity - 1)}>
                    -
                  </button>
                  <span className="heading-tertiary">{quantity}</span>
                  <button onClick={() => handleQuantityChange(quantity + 1)}>
                    +
                  </button>
                </div>
                {sizeOptions().length > 0 && (
                  <>
                    <div className="size-selection">
                      <label htmlFor="size" className="heading-tertiary">
                        Size:
                      </label>
                      <select
                        id="size"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="btn btn--green btn--dropdown"
                      >
                        {sizeOptions().map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {flavourOptions().length > 0 && (
                  <div className="flavour-selection">
                    <label htmlFor="flavours" className="heading-tertiary">
                      Flavours:
                    </label>
                    <select
                      id="flavours"
                      value={selectedFlavour}
                      onChange={(e) => setSelectedFlavour(e.target.value)}
                      className="btn btn--green btn--dropdown"
                    >
                      {flavourOptions().map((flavour) => (
                        <option key={flavour} value={flavour}>
                          {flavour}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  onClick={handleAddToCart}
                  className="btn btn--green btn--addToCart"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <h1 className="heading-tertiary u-margin-bottom-small heading-tertiary--description">
            Product Description
          </h1>
          <p>
            {product.longDescription || "No additional description available."}
          </p>
        </section>
      </div>
    </>
  );
};

export default SingleProduct;
