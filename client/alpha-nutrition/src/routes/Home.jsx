import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";

const Home = () => {
  return (
    <>
      <Header />
      {/* <Navigation /> */}
      <Main />
      {/* <Footer /> */}
      <Outlet />
    </>
  );
};

export default Home;
