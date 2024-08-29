import logo from "../img/ALPHA-Logo-round-white.png";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";

import "../css/index.comp.css";

const Authentication = () => {
  return (
    <div className="authpage">
      <Link className="header__logo-box auth__logo-box" to="/">
        <img src={logo} alt="Logo" className="header__logo auth__logo" />
      </Link>
      <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Authentication;
