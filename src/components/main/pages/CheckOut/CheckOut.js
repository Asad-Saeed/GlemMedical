import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import { Images } from "../../../../assets/assets";
import "./CheckOut.css";
import { useDispatch, useSelector } from "react-redux";
import { ENV } from "../../../../config/config";
import { fetchCart, resetCart } from "../../../../redux/cart/cartActions";
import { processStripePayment, notifyStripePayment } from "../../../../redux/payment/paymentAction";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const stripePromise = loadStripe(ENV.public_key);

const CheckoutForm = () => {
  const [saveInfo, setSaveInfo] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Initialize useNavigate
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
    if (user?.data?.accessToken) {
      dispatch(fetchCart(user.data.accessToken));
    }
  }, [user?.data?.accessToken, dispatch]);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded properly.");
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement is not properly set up.");
      setIsLoading(false);
      return;
    }

    const { error, token } = await stripe.createToken(cardElement, {
      name: cardholderName,
    });

    if (error) {
      console.error("Stripe token creation error:", error.message);
      setIsLoading(false);
      return;
    }

    const paymentData = {
      amount: summary.total_amount,
      token: token.id,
      cart_data: { ...restructuredCartList, cart_details: { ...cartReducer?.cartDetails } },
      payer_name: cardholderName,
      payment_type: "1", // 0: COD, 1:Stripe
      student_id: user?.data?.id,
      status: 0,
    };

    try {
      const res = await dispatch(processStripePayment(paymentData, user?.data?.accessToken));
      if (res && res.txnid) {
        const notifyRes = await dispatch(notifyStripePayment(res?.txnid, user?.data?.accessToken));
        if (notifyRes?.status === 'success') {
          dispatch(resetCart(cartList, user?.data?.accessToken));

          // Redirect to thank-u page and pass transaction details
          navigate("/thank-you", {
            state: {
              studentName: user?.data?.first_name,
              courses: cartItems.map((item) => ({
                title: item?.title_en,
                startDate: item?.start_date, // Assuming start date exists in item
              })),
              transactionId: res?.txnid,
              amount: summary.total_amount,
              paymentMethod: "Stripe",
            },
          });
        }
      }
    } catch (e) {
      console.error("Error during payment processing:", e);
      toast.error("Payment failed due to server error.");
    }

    setIsLoading(false);
  };

  return (
    <section className="checkout-area">
      <div className="theme__container">
        <Row>
          <Col lg={6} className="checkout-area-checkout">
            <h6 className="checkout-area__label">Checkout</h6>
            <div className="checkout-tab">
              <Tab.Container defaultActiveKey="credit-card">
                <Nav variant="pills" className="mb-4">
                  <Nav.Item>
                    <Nav.Link eventKey="credit-card">
                      <svg
                        width="45"
                        height="34"
                        viewBox="0 0 45 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M39.5 2H5.75C3.67893 2 2 3.67893 2 5.75V28.25C2 30.3211 3.67893 32 5.75 32H39.5C41.5711 32 43.25 30.3211 43.25 28.25V5.75C43.25 3.67893 41.5711 2 39.5 2Z"
                          stroke="#25252E"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M2 13.25H43.25"
                          stroke="#25252E"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <h6>Stripe</h6>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="credit-card">
                    <Form onSubmit={handlePayment}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name on Card</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Type here"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Card Details</Form.Label>
                        <CardElement className="p-2 border rounded" />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Check
                          type="checkbox"
                          id="save-info"
                          label="Save my information for a faster checkout"
                          checked={saveInfo}
                          onChange={() => setSaveInfo(!saveInfo)}
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        className="w-100 theme-btn"
                        disabled={isLoading || !stripe || !elements}
                      >
                        {isLoading ? "Processing..." : "Confirm Payment"}
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
          <Col lg={6} className="mt-4 mt-lg-0">
            <div className="checkout-area-summery">
              <h6 className="checkout-area__label">Summary</h6>
              <div className="cart">
                <div className="cart__includes-info cart__includes-info--bordertop-0">
                  <div className="productContent__wrapper">
                    {cartItems?.length > 0 ? (
                      cartItems.map((item) => (
                        <div className="productContent" key={item.id}>
                          <div className="productContent-item__img productContent-item">
                            <img
                              src={
                                item?.image ||
                                item?.thumbnail_image ||
                                Images.moreCourse2
                              }
                              className="img-fluid"
                              alt={item?.title_en}
                            />
                          </div>
                          <div className="productContent-item__info productContent-item">
                            <h6 className="font-para--lg">
                              <a href="course-details.html">
                                {item?.title_en}
                              </a>
                            </h6>
                            <p>by {item?.instructor}</p>
                            <div className="price">
                              <b className="font-para--md text-red me-1">
                                ${item?.price}
                              </b>
                              {item?.old_price > 0 && (
                                <p>
                                  <del>${item?.old_price}</del>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No items in cart</p>
                    )}
                  </div>
                </div>
                <div className="cart__checkout-process">
                  <p>
                    <span>Cart Total:</span> ${summary.cart_total}
                  </p>
                  <p>
                    <span>Tax:</span> ${summary.tax}
                  </p>
                  <p>
                    <b>Total:</b> ${summary.total_amount}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
