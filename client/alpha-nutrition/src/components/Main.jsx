// src/components/Main.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import img1 from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import img4 from "../img/img4.jpg";
import "../css/index.comp.css";
const Main = () => {
  const [products, setProducts] = useState([]);
  const specificIds = [
    "66a09f35d097fd069bf5b4ef",
    "66a09f7fd097fd069bf5b4f1",
    "66a09f8dd097fd069bf5b4f3",
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
        {/* <div className="row">
          <div className="col-1-of-4">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-world"></i>
              <h3 className="heading-tertiary u-margin-bottom-small">
                Explore the world
              </h3>
              <p className="feature-box__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, ipsum sapiente aspernatur.
              </p>
            </div>
          </div>

          <div className="col-1-of-4">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-compass"></i>
              <h3 className="heading-tertiary u-margin-bottom-small">
                Meet nature
              </h3>
              <p className="feature-box__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, ipsum sapiente aspernatur.
              </p>
            </div>
          </div>

          <div className="col-1-of-4">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-map"></i>
              <h3 className="heading-tertiary u-margin-bottom-small">
                Find your way
              </h3>
              <p className="feature-box__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, ipsum sapiente aspernatur.
              </p>
            </div>
          </div>

          <div className="col-1-of-4">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-heart"></i>
              <h3 className="heading-tertiary u-margin-bottom-small">
                Live a healthier life
              </h3>
              <p className="feature-box__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, ipsum sapiente aspernatur.
              </p>
            </div>
          </div>
        </div> */}
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

      {/* <section className="section-stories">
        <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
            <source src="img/video.mp4" type="video/mp4" />
            <source src="img/video.webm" type="video/webm" />
            Your browser is not supported!
          </video>
        </div>

        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary">We make people genuinely happy</h2>
        </div>

        <div className="row">
          <div className="story">
            <figure className="story__shape">
              <img
                src="img/nat-8.jpg"
                alt="Person on a tour"
                className="story__img"
              />
              <figcaption className="story__caption">Mary Smith</figcaption>
            </figure>
            <div className="story__text">
              <h3 className="heading-tertiary u-margin-bottom-small">
                I had the best week ever with my family
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, ipsum sapiente aspernatur libero repellat quis
                consequatur ducimus quam nisi exercitationem omnis earum qui.
                Aperiam, ipsum sapiente aspernatur libero repellat quis
                consequatur ducimus quam nisi exercitationem omnis earum qui.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="story">
            <figure className="story__shape">
              <img
                src="img/nat-9.jpg"
                alt="Person on a tour"
                className="story__img"
              />
              <figcaption className="story__caption">Jack Wilson</figcaption>
            </figure>
            <div className="story__text">
              <h3 className="heading-tertiary u-margin-bottom-small">
                WOW! My life is completely different now
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, ipsum sapiente aspernatur libero repellat quis
                consequatur ducimus quam nisi exercitationem omnis earum qui.
                Aperiam, ipsum sapiente aspernatur libero repellat quis
                consequatur ducimus quam nisi exercitationem omnis earum qui.
              </p>
            </div>
          </div>
        </div>

        <div className="u-center-text u-margin-top-huge">
          <a href="#" className="btn-text">
            Read all stories &rarr;
          </a>
        </div>
      </section> */}

      {/* <section className="section-book">
        <div className="row">
          <div className="book">
            <div className="book__form">
              <form action="#" className="form">
                <div className="u-margin-bottom-medium">
                  <h2 className="heading-secondary">Start booking now</h2>
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    className="form__input"
                    placeholder="Full name"
                    id="name"
                    required
                  />
                  <label htmlFor="name" className="form__label">
                    Full name
                  </label>
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    className="form__input"
                    placeholder="Email address"
                    id="email"
                    required
                  />
                  <label htmlFor="email" className="form__label">
                    Email address
                  </label>
                </div> */}

      {/* <div className="form__group u-margin-bottom-medium">
                  <div className="form__radio-group">
                    <input
                      type="radio"
                      className="form__radio-input"
                      id="small"
                      name="size"
                    />
                    <label htmlFor="small" className="form__radio-label">
                      <span className="form__radio-button"></span>
                      Small tour group
                    </label>
                  </div>

                  <div className="form__radio-group">
                    <input
                      type="radio"
                      className="form__radio-input"
                      id="large"
                      name="size"
                    />
                    <label htmlFor="large" className="form__radio-label">
                      <span className="form__radio-button"></span>
                      Large tour group
                    </label>
                  </div>
                </div> */}

      {/* <div className="form__group">
                  <button className="btn btn--green">Register &rarr;</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default Main;
