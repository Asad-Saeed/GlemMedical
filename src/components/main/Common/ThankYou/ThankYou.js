import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./ThankYou.css";

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    studentName = "Student",
    courses = [],
    transactionId = "N/A",
    amount = 0,
    paymentMethod = "N/A"
  } = location.state || {};

  if (!location.state) {
    return (
      <div className="thanku-pg pt-90 login-signup-wraper">
        <div className="theme__container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-7">
              <div className="form-wraper">
                <div className="thanku-content text-center">
                  <h1>Oops! Something went wrong.</h1>
                  <p>It looks like you accessed this page without completing the checkout process.</p>
                  <button
                    className="theme-btn mt-3"
                    onClick={() => navigate("/")}
                  >
                    Return Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="thanku-pg pt-90 login-signup-wraper">
        <div className="theme__container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-7">
              <div className="form-wraper">
                <div className="thanku-content text-center">
                  <h1>Thank You for Your Enrollment!</h1>

                  <div className="check-icon">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>

                  <p className="mt-lg-3 mt-2">
                    🎉 Your Payment Was Successful!
                  </p>

                  <p className="mt-lg-3 mt-2">
                    Dear <strong>{studentName}</strong>,
                  </p>

                  <p className="mt-lg-3 mt-2">
                    We’re excited to confirm your enrollment in the following course(s):
                  </p>

                  <ul className="course-list mt-lg-3 mt-2">
                    {courses.map((course, index) => (
                      <li key={index}>
                        {course?.title} – Starts on <strong>{course?.startDate || "TBA"}</strong>
                      </li>
                    ))}
                  </ul>

                  <div className="payment-details mt-lg-4 mt-3">
                    <h4>Payment Details:</h4>
                    <div className="payment-info">
                      <div className="payment-info-item">
                        <strong>Transaction ID:</strong>
                        <span>{transactionId}</span>
                      </div>
                      <div className="payment-info-item">
                        <strong>Amount Paid:</strong>
                        <span>${amount}</span>
                      </div>
                      <div className="payment-info-item">
                        <strong>Payment Method:</strong>
                        <span>{paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  <div className="btn-holder mt-lg-4 mt-3">
                    <button className="thank-theme-btn" onClick={() => navigate("/")}>
                      Continue to more enrollment!
                      <FontAwesomeIcon className="arrow1" icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThankYou;
