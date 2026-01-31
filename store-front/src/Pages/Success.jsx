import { useEffect } from "react";
import { Link } from "react-router-dom";

const Success = () => {
  useEffect(() => {
		localStorage.removeItem("cart-products");
	}, []);
  return (
    <div className="about container success" id="about">
      <h1 className="about-title">Thank you for your purchase !</h1>
      <p className="about-info">
        Your payment has been processed successfully. We are preparing your
        order and will update you once it’s delivered to your address. If you
        have any questions, feel free to contact us at dorothy@shop.com
      </p>
      <Link to="/" className="button">
        Back to home page
      </Link>
      <svg
        className="svg-curve"
        width="392"
        height="535"
        viewBox="108 36 392 535"
        xmlns="http://www.w3.org/2000/svg"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      >
        <path fill="none" d="M25,169 C255,36 88,389 400,394" />
      </svg>
      <svg
        className="svg-curve svg-curve-right"
        width="350"
        height="370"
        viewBox="0 0 350 370"
        xmlns="http://www.w3.org/2000/svg"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      >
        <path fill="none" d="M3,252 C344,364 133,5 318,25" />
      </svg>
    </div>
  );
};

export default Success;
