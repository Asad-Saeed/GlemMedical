import React from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ summary, cartLength }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    if (cartLength > 0) {
      navigate("/checkout");
    }
  };
  return (
    <div className="summery-wizard">
      <div className="summery-wizard-text pt-0">
        <h6>Subtotal</h6>
        <p>${summary?.cart_total}</p>
      </div>
      {/* <div className="summery-wizard-text">
        <h6>Coupon Discount</h6>
        <p>{summary?.discount || 0}%</p>
      </div> */}
      <div className="summery-wizard-text">
        <h6>Taxes</h6>
        <p>${summary?.tax}</p>
      </div>
      <div className="total-wizard">
        <h6 className="font-title--card">Total:</h6>
        <p className="font-title--card">${summary?.cart_total}</p>
      </div>
      <form action="#">
        <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={handleCheckout}
            className="theme-btn mb-lg-3 w-100"
            disabled={!cartLength}
          >
            Checkout
          </button>
        </div>
        {/* <label htmlFor="coupon">Apply Coupon</label>
        <div className="cart-input">
          <input
            type="text"
            className="form-control"
            placeholder="Coupon Code"
            id="coupon"
          />
          <button type="submit" className="sm-button">
            Apply
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default CartSummary;
