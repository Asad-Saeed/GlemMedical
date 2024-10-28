import React, { useEffect } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummry";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../../redux/cart/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartReducer = useSelector((state) => state.cart);
  const cartList = cartReducer?.cartList || {};
  const restructuredCartList = Object.entries(cartList).reduce(
    (acc, [id, item]) => {
      acc[id] = { ...item, id };
      return acc;
    },
    {}
  );
  const cartItems = Object.values(restructuredCartList);

  const summary = cartReducer?.cartDetails || {
    cart_total: 0,
    tax: 0,
    total_amount: 0,
  };

  useEffect(() => {
    dispatch(fetchCart(user?.data?.accessToken));
  }, [user?.data?.accessToken]);

  return (
    <section className="section cart-area">
      <div className="theme__container">
        <div className="row">
          <div className="col-lg-8">
            <h6 className="cart-area__label">{`${cartItems?.length} Courses in Cart`}</h6>
            {!cartItems?.length ? (
              <div className="cart-empty d-flex flex-column align-items-center justify-content-center py-5 mt-5">
                <p className="mb-3">No courses added to cart!</p>
                <a className="theme-btn" href="/courses">
                  Continue Shopping
                </a>
              </div>
            ) : (
              <>
                {cartItems?.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </>
            )}
          </div>
          <div className="col-lg-4">
            <h6 className="cart-area__label">Summary</h6>
            <CartSummary summary={summary} cartLength={cartItems?.length} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
