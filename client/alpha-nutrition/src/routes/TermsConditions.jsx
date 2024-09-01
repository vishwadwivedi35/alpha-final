import React from "react";
import { Link } from "react-router-dom";
import "../css/index.comp.css";
import logo from "../img/ALPHA-Logo-round-white.png";

const TermsConditions = () => {
  return (
    <div className="page-content page-content__tnc">
      <h1 className="heading--main-pages">
        <Link className="header__logo-box" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
      </h1>
      <div className="contact-us__para">
        <h2 className="heading--main-static">Terms & Conditions</h2>
        <p className="heading-static">Welcome to Alpha Muscle Nutrition!</p>
      </div>
      <div className="contact-us__para">
        <p className="heading-static">
          For the purpose of these Terms and Conditions, The term "we", "us",
          "our" used anywhere on this page shall mean Pratyaksh Healthcare,
          whose registered/operational office is Shubhashees apartment, patel
          nagar square Gwalior MADHYA PRADESH 474002. "you", “your”, "user",
          “visitor” shall mean any natural or legal person who is visiting our
          website and/or agreed to purchase from us.
        </p>
      </div>
      <div className="contact-us__para">
        <p className="heading-static">
          Your use of the website and/or purchase from us are governed by
          following Terms and Conditions:
        </p>
      </div>
      <ul className="contact-us__para">
        <li className="heading-static">
          The content of the pages of this website is subject to change without
          notice.
        </li>
        <li className="heading-static">
          Neither we nor any third parties provide any warranty or guarantee as
          to the accuracy, timeliness, performance, completeness or suitability
          of the information and materials found or offered on this website for
          any particular purpose. You acknowledge that such information and
          materials may contain inaccuracies or errors and we expressly exclude
          liability for any such inaccuracies or errors to the fullest extent
          permitted by law.
        </li>
        <li className="heading-static">
          Your use of any information or materials on our website and/or product
          pages is entirely at your own risk, for which we shall not be liable.
          It shall be your own responsibility to ensure that any products,
          services or information available through our website and/or product
          pages meet your specific requirements.
        </li>
        <li className="heading-static">
          Our website contains material which is owned by or licensed to us.
          This material includes, but is not limited to, the design, layout,
          look, appearance and graphics. Reproduction is prohibited other than
          in accordance with the copyright notice, which forms part of these
          terms and conditions.
        </li>
        <li className="heading-static">
          All trademarks reproduced in our website which are not the property
          of, or licensed to, the operator are acknowledged on the website.
        </li>
        <li className="heading-static">
          Unauthorized use of information provided by us shall give rise to a
          claim for damages and/or be a criminal offense.
        </li>
        <li className="heading-static">
          From time to time our website may also include links to other
          websites. These links are provided for your convenience to provide
          further information.
        </li>
        <li className="heading-static">
          You may not create a link to our website from another website or
          document without Pratyaksh Healthcare’s prior written consent.
        </li>
        <li className="heading-static">
          Any dispute arising out of use of our website and/or purchase with us
          and/or any engagement with us is subject to the laws of India.
        </li>
        <li className="heading-static">
          We, shall be under no liability whatsoever in respect of any loss or
          damage arising directly or indirectly out of the decline of
          authorization for any Transaction, on Account of the Cardholder having
          exceeded the preset limit mutually agreed by us with our acquiring
          bank from time to time.
        </li>
      </ul>
    </div>
  );
};

export default TermsConditions;
