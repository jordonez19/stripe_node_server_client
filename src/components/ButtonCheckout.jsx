import React from "react";

const ButtonCheckout = ({ priceId }) => {
  return (
    <button
      onClick={() => {
        console.log(priceId);
      }}
      className="btn btn-primary"
    >
      Pay
    </button>
  );
};

export default ButtonCheckout;
