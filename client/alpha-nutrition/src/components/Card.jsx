// import React from "react";
// import { Link } from "react-router-dom";

// const Card = ({ id, name, description, price, image, onDelete }) => {
//   return (
//     <div className="col-1-of-3">
//       <div className="card">
//         <div className="card__side card__side--front">
//           <div
//             className="card__picture card__picture--1"
//             style={{ backgroundImage: `url(${image})` }}
//           >
//             &nbsp;
//           </div>
//           <div className="card__details">
//             <ul>
//               <h3 className="heading-tertiary u-margin-bottom-small">{name}</h3>
//               <li style={{ fontWeight: "bolder", color: "black" }}>
//                 {description}
//               </li>
//               <li style={{ fontWeight: "bold", color: "black" }}>
//                 Price: ₹{price}
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="card__side card__side--back card__side--back-1">
//           <div className="card__cta">
//             <div className="card__price-box">
//               <p className="card__price-only">Only</p>
//               <p className="card__price-value">₹{price}</p>
//             </div>
//             <Link to={`/product/${id}`} className="btn btn--white">
//               SHOP NOW!
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, name, description, price, flavours }) => {
  // Function to get the main image from the flavours
  const getMainImage = () => {
    if (
      flavours &&
      flavours.length > 0 &&
      flavours[0].images &&
      flavours[0].images.length > 0
    ) {
      return flavours[0].images[0]; // Use the first image of the first flavour
    }
    return "https://via.placeholder.com/300"; // Fallback image
  };

  const image = getMainImage();

  // Log image URL for debugging
  console.log("Final Image URL:", image);

  return (
    <div className="col-1-of-3">
      <div className="card">
        <div className="card__side card__side--front">
          <div
            className="card__picture card__picture--1"
            style={{ backgroundImage: `url(${image})` }} // Ensure correct syntax with quotes
          >
            &nbsp;
          </div>
          <div className="card__details">
            <ul>
              <h3 className="heading-tertiary u-margin-bottom-small">{name}</h3>
              <li style={{ fontWeight: "bolder", color: "black" }}>
                {description}
              </li>
              <li style={{ fontWeight: "bold", color: "black" }}>
                Price: ₹{price}
              </li>
            </ul>
          </div>
        </div>
        <div className="card__side card__side--back card__side--back-1">
          <div className="card__cta">
            <div className="card__price-box">
              <p className="card__price-only">Only</p>
              <p className="card__price-value">₹{price}</p>
            </div>
            <Link to={`/product/${id}`} className="btn btn--white">
              SHOP NOW!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
