import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import SingleProduct from "./components/SingleProduct";
// import Error from "./pages/Error";
import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ShopPage from "./routes/ShopPage";
import Authentication from "./routes/Authentication";
import ContactUs from "./routes/ContactUs";
import ReturnPolicy from "./routes/ReturnPolicy";
import Support from "./routes/Support";
import TermsConditions from "./routes/TermsConditions";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import TrackPage from "./routes/TrackPage";
import AboutUs from "./routes/AboutUs";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/track" element={<TrackPage />} />
        {/* <Route path="/" element={<Error />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
