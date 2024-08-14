import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useLocation, Link } from "react-router-dom";
import logo from "../img/ALPHA-Logo.png";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const getCategoryFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("category") || "All";
  };

  const [category, setCategory] = useState(getCategoryFromQuery());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCategory(getCategoryFromQuery());
  }, [location.search]);

  const renderProductCards = () => {
    return products
      .filter((product) => {
        if (category === "All") return true;
        return product.category === category;
      })
      .map((product) => (
        <Card
          key={product._id}
          id={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.images[0]}
        />
      ));
  };

  return (
    <section className="section-shop">
      <h1 className="shop-heading">
        <Link className="header__logo-box  heading-primary--shop" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <span className="heading-primary--main">
          {" "}
          OUR WIDE RANGE OF PRODUCTS{" "}
        </span>
      </h1>
      <div className="category-container">
        <label htmlFor="category" className="heading-primary heading-category">
          Categories:
        </label>
        <select
          id="category"
          value={category}
          className="btn btn--animation btn--category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Whey">Whey Protein</option>
          <option value="Gainers">Weight And Mass Gainers</option>
          <option value="Pre and Post Workouts">Pre and Post Workouts</option>
          <option value="Vitamins">Daily Essentials</option>
        </select>
      </div>
      <div className="section-card">
        <div className="row">{renderProductCards()}</div>
      </div>
    </section>
  );
};

export default ShopPage;
