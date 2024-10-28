import React from "react";
import { Images } from "../../../../assets/assets";

const CheckoutItem = ({ cartData }) => {
  const parsedData = JSON.parse(cartData);
  const cartItemKey = Object.keys(parsedData)?.[0];
  const cartItem = parsedData?.[cartItemKey] || {};
  const handleImageError = (e) => {
    e.target.src = Images.moreCourse3;
  };

  return (
    <div className="purchase-area-items-start d-flex align-items-lg-center">
      <div className="image">
        <a href={`/courses-detail/${cartItemKey}`}>
          <img
            src={cartItem?.image || Images.moreCourse3}
            className="img-fluid"
            alt={cartItem?.title_en || "Course Image"}
            onError={handleImageError}
          />
        </a>
      </div>
      <div className="text d-flex flex-column flex-lg-row">
        <div className="text-main">
          <h6>
            <a href={`/courses-detail/${cartItemKey}`}>
              {cartItem?.title_en || "Course Title"}
            </a>
          </h6>
          <p>
            By{" "}
            <a href="instructorcourses.html">
              {cartItem?.instructor || "Instructor Name"}
            </a>
          </p>
        </div>
        <p>${parseFloat(cartItem?.price || 0)?.toFixed(2)}</p>
      </div>
    </div>
  );
};

const CheckoutSummary = ({ checkout }) => {
  // Parse cart_data
  const parsedCheckout = checkout?.map((item) => {
    const cartData = JSON.parse(item?.cart_data);
    const cartItem = cartData?.[Object.keys(cartData)[0]] || {};
    return {
      ...item,
      cartItem,
    };
  });

  // Summing up the total amounts
  const subtotal = parsedCheckout?.reduce(
    (sum, item) => sum + parseFloat(item?.cartItem?.price || 0),
    0
  );

  const totalCourses = parsedCheckout?.length;

  return (
    <div className="d-flex align-items-lg-center align-items-start flex-column flex-lg-row">
      <div className="purchase-area-items">
        {parsedCheckout?.map((item, index) => (
          <CheckoutItem key={index} cartData={item?.cart_data} />
        ))}
      </div>
      <div className="purchase-area-items-end">
        <p>{new Date(parsedCheckout[0]?.created_at)?.toLocaleDateString()}</p>
        <dl className="row">
          <dt className="col-5">Subtotal</dt>
          <dd className="col-7">{subtotal?.toFixed(2)} USD</dd>
          <dt className="col-5">Total Courses</dt>
          <dd className="col-7">{totalCourses}</dd>
          <dt className="col-5">Payment Type</dt>
          <dd className="col-7">
            {parsedCheckout[0]?.payment_type === 0
              ? "Credit Card"
              : "Other Payment Method"}
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default CheckoutSummary;
