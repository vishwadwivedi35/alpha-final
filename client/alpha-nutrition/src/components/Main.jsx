// src/components/Main.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import img1 from "../img/BULK-1kg-CHOCOLATE.png";
import img2 from "../img/hydro-iso-2lbs-malai-kulfi.png";
import img3 from "../img/LEAN-1kg-COCOLATE.png";
import img4 from "../img/whey-plus-1kg-KKP.png";
import "../css/index.comp.css";
const Main = () => {
  const [products, setProducts] = useState([]);
  const specificIds = [
    "66c066da95772e5820ee15dd",
    "66c0678495772e5820ee15df",
    "66c06ac095772e5820ee15e9",
  ]; // Replace with actual product IDs

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/products");
        const data = await response.json();
        const filteredProducts = data.filter((product) =>
          specificIds.includes(product._id)
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <section className="section-about">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary">Product Categories</h2>
        </div>

        <div className="row">
          <div className="col-1-of-2">
            <h3 className="heading-tertiary u-margin-bottom-small">
              Power Up with Premium Whey Protein
            </h3>
            <p className="paragraph">
              Boost your fitness journey with our top-tier whey protein
              selections. Crafted for peak performance, our whey protein offers
              the perfect blend of taste and nutrition to help you achieve your
              health goals.
            </p>

            <h3 className="heading-tertiary u-margin-bottom-small">
              Elevate Your Wellness with Quality Supplements
            </h3>
            <p className="paragraph">
              Explore our extensive range of supplements designed to enhance
              your overall well-being. From vitamins to specialty formulas, find
              everything you need to support a balanced and active lifestyle.
            </p>

            <a href="#" className="btn-text">
              Learn more &rarr;
            </a>
          </div>
          <div className="col-1-of-2">
            <div className="composition">
              <img
                // srcSet="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w"
                // sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 1"
                className="composition__photo composition__photo--p1"
                src={img1}
              />

              <img
                // srcSet="img/nat-2.jpg 300w, img/nat-2-large.jpg 1000w"
                // sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 2"
                className="composition__photo composition__photo--p2"
                src={img2}
              />

              <img
                // srcSet="img/nat-3.jpg 300w, img/nat-3-large.jpg 1000w"
                // sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 3"
                className="composition__photo composition__photo--p3"
                src={img3}
              />
              <img
                // srcSet="img/nat-3.jpg 300w, img/nat-3-large.jpg 1000w"
                // sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 4"
                className="composition__photo composition__photo--p4"
                src={img4}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-features">
        <div className="section-features__slider">
          <div className="section-features__slide section-features__slide--1"></div>
          <div className="section-features__slide section-features__slide--2"></div>
          <div className="section-features__slide section-features__slide--3"></div>
        </div>
      </section>

      <section className="section-tours" id="section-tours">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary">Our Popular Products</h2>
        </div>

        <div className="row">
          {products.map((product, index) => (
            <div className="col-1-of-3" key={product._id}>
              <div className="card">
                <div className={`card__side card__side--front`}>
                  <div className={`card__picture card__picture--${index + 1}`}>
                    &nbsp;
                  </div>
                  <h4 className="card__heading"></h4>
                  <div className="card__details">
                    <ul>
                      <h3 className="heading-tertiary u-margin-bottom-small">
                        {product.name}
                      </h3>
                      <li style={{ fontWeight: "bolder", color: "black" }}>
                        {product.description}
                      </li>
                      <li style={{ fontWeight: "bold", color: "black" }}>
                        Price: {product.price}/-
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`card__side card__side--back card__side--back-${
                    index + 1
                  }`}
                >
                  <div className="card__cta">
                    <div className="card__price-box">
                      <p className="card__price-only">Only</p>
                      <p className="card__price-value">{product.price}/-</p>
                    </div>
                    <Link
                      to={`/product/${product._id}`}
                      className="btn btn--white"
                    >
                      SHOP NOW!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="u-center-text u-margin-top-huge">
          <Link to="/shop" className="btn btn--green">
            All Products
          </Link>
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Main;
