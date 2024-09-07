import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import logo from "../img/ALPHA-Logo-round-white.png";
import "../css/index.comp.css"; // Add your custom CSS here
import Card from "../components/Card";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart, updateCartItem, cartItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [selectedFreebie, setSelectedFreebie] = useState("");
  const [currentFlavourImages, setCurrentFlavourImages] = useState([]);
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
        console.log("Fetched product:", data);
        setProduct(data);

        // Update quantity if product is already in cart
        const cartItem = cartItems.find((item) => item.id === data._id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }

        // Initialize selected size and flavour from fetched product data
        setSelectedSize(
          data.sizes && data.sizes.length > 0 ? data.sizes[0] : ""
        );
        setSelectedFreebie(
          data.freebies && data.freebies.length > 0 ? data.freebies[0] : ""
        );
        if (data.flavours && data.flavours.length > 0) {
          setSelectedFlavour(data.flavours[0].flavourName);
          setCurrentFlavourImages(data.flavours[0].images);
        }

        console.log("Initialized size:", data.sizes[0]); // Debugging
        console.log("Initialized flavour:", data.flavours[0].flavourName); // Debugging
        console.log("Initialized freebie:", data.freebies[0]); // Debugging
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, cartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.alphamuscle.in/api/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    if (product) {
      fetchProducts();
    }
  }, [product]);

  useEffect(() => {
    // Update the images when the selected flavour changes
    if (product && selectedFlavour) {
      const flavour = product.flavours.find(
        (flavour) => flavour.flavourName === selectedFlavour
      );
      if (flavour) {
        setCurrentFlavourImages(flavour.images);
        setCurrentImageIndex(0); // Reset image index when changing flavour
      }
    }
  }, [selectedFlavour, product]);

  const handleAddToCart = () => {
    // Use the selected size and flavour
    const size = selectedSize;
    const flavour = selectedFlavour;
    const freebie = selectedFreebie;

    console.log("Adding to cart with size:", size); // Debugging
    console.log("Adding to cart with flavour:", flavour); // Debugging
    console.log("Adding to cart with freebie:", freebie); // Debugging

    addToCart({
      ...product,
      quantity,
      selectedSize: size,
      selectedFlavour: flavour,
      selectedFreebie: freebie,
    });
    navigate("/cart"); // Redirect to cart page after adding to cart
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      updateCartItem(product._id, newQuantity); // Update the quantity in CartContext
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === currentFlavourImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentFlavourImages.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const getAlternativeCategories = (currentCategory) => {
    switch (currentCategory) {
      case "Whey Protein":
        return ["Pre and Post Workouts", "Daily Essentials"];
      case "Pre and Post Workouts":
        return ["Whey Protein", "Weight And Mass Gainers"];
      case "Daily Essentials":
        return ["Whey Protein", "Pre and Post Workouts"];
      case "Weight And Mass Gainers":
        return ["Pre and Post Workouts", "Whey Protein"];
      default:
        return ["All"];
    }
  };

  // Calculate discount percentage
  const discountPercentage = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  // const renderProductCards = () => {
  //   return products
  //     .filter(
  //       (product) =>
  //         product.category === getAlternativeCategory(product.category)
  //     )
  //     .map((product) => (
  //       <Card
  //         key={product._id}
  //         id={product._id}
  //         name={product.name}
  //         description={product.description}
  //         price={product.price}
  //         flavours={product.flavours}
  //       />
  //     ));
  // };
  const renderProductCards = () => {
    const alternativeCategory = getAlternativeCategories(product.category)[0]; // Get the first alternative category
    return products
      .filter((product) => product.category === alternativeCategory)
      .map((product) => (
        <Card
          key={product._id}
          id={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          flavours={product.flavours}
        />
      ));
  };

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
                    src={currentFlavourImages[currentImageIndex]}
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
                    {currentFlavourImages.map((image, index) => (
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
                <p className="heading-tertiary u-margin-bottom-small heading-tertiary__description">
                  {product.description}
                </p>
                <div className="single-product__pricing">
                  {product.mrp && (
                    <p className="heading-tertiary u-margin-bottom-small single-product__mrp">
                      MRP:{" "}
                      <span style={{ textDecoration: "line-through" }}>
                        ₹{product.mrp}
                      </span>
                    </p>
                  )}
                  <p className="heading-tertiary u-margin-bottom-small single-product__price">
                    Price: ₹{product.price}{" "}
                    {discountPercentage > 0 && (
                      <span className="single-product__discount">
                        ({discountPercentage}% off)
                      </span>
                    )}
                  </p>
                </div>
                <div className="line"></div>
                <div className="quantity-control">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                {product.sizes && product.sizes.length > 0 && (
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
                        {product.sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {product.flavours && product.flavours.length > 0 && (
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
                      {product.flavours.map((flavour) => (
                        <option
                          key={flavour.flavourName}
                          value={flavour.flavourName}
                        >
                          {flavour.flavourName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {product.freebies && product.freebies.length > 0 && (
                  <>
                    <div className="size-selection">
                      <label htmlFor="freebie" className="heading-tertiary">
                        Select Your Freebie!!! :
                      </label>
                      <select
                        id="freebie"
                        value={selectedFreebie}
                        onChange={(e) => setSelectedFreebie(e.target.value)}
                        className="btn btn--green btn--dropdown"
                      >
                        {product.freebies.map((freebie) => (
                          <option key={freebie} value={freebie}>
                            {freebie}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <button
                  onClick={handleAddToCart}
                  className="btn btn--green btn--addToCart"
                >
                  {" "}
                  Add to Cart{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <h1 className="heading-tertiary u-margin-bottom-small heading-tertiary--description heading-secondary">
            {" "}
            Product Description{" "}
          </h1>{" "}
          <p className="long-description--para">
            {" "}
            {product.longDescription ||
              "No additional description available."}{" "}
          </p>{" "}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="section-card section__you-might-also-like">
              <h2>You Might Also Like</h2>
              <div className="row">{renderProductCards()}</div>
            </div>
          )}
        </section>{" "}
      </div>{" "}
    </>
  );
};

export default SingleProduct;
