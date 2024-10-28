import React, { useState, useEffect, useRef } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Images } from "../../../assets/assets";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/authActions";
import { displayValue } from "../../../config/config";
import { toast } from "react-toastify";

const Header = ({ settings }) => {

  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  // Close the navbar if a click is detected outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { user } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.profile);
  const cartReducer = useSelector((state) => state.cart);
  const cartList = cartReducer?.cartList || {};
  const cartItems = Object.values(cartList);
  const handleLogout = () => {
    dispatch(logout());
  };

  const [selectedImage, setSelectedImage] = useState(user?.data?.image || "");

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);
  const handleLinkClick = () => {
    setExpanded(false);
  };
  const handleEmptyCart = (e) => {
    if (!cartItems?.length) {
      e.preventDefault();
      toast.error("Cart is empty!");
    }
  };
  return (
    <div>
      <header>
        <div className="top-header">
          <div className="theme__container">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="top-header-left d-flex">
                <ul className="contact-list">
                  <li>
                    <span>
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <span className="no-text text-white">Call:</span> {settings ? settings.contact_number : '+1234567890'}
                  </li>
                  <li>
                    <div className="divider"></div>
                  </li>
                  <li>
                    <span>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span className="no-text text-white">Email:</span>
                    {settings ? settings?.contact_email : 'gleammedstudies@info.com'}
                  </li>
                </ul>
              </div>
              {isAuthenticated ? (
                <div className="top-header-right d-flex justify-content-end align-items-center">
                  {/* <Link to="#" className="theme-btn" onClick={handleLogout}>
                    Logout
                    <FontAwesomeIcon className="arrow1" icon={faChevronRight} />
                  </Link> */}
                </div>
              ) : (
                <div className="top-header-right d-flex justify-content-end align-items-center">
                  <Link to="/login" className="simple-link me-xl-4 me-2">
                    Login
                  </Link>
                  <Link to="/sign-up" className="theme-btn">
                    Sign Up
                    <FontAwesomeIcon className="arrow1" icon={faChevronRight} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="site-header bottom-header">
          <Navbar expand="lg" ref={navbarRef}
            collapseOnSelect
            className="bg-body-tertiary"
            expanded={expanded}>

            <Container fluid className="theme__container">
              <Navbar.Brand href="/">
                <img
                  src={Images.siteLogo}
                  className="img-fluid logo-image"
                  alt="Logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                onClick={() => setExpanded(!expanded)}
              />
              <div className="additional-items mobile-cart">
                <Link to="/cart" onClick={handleEmptyCart}>
                  <div className="cart-btn">
                    <span className="count">{cartItems?.length}</span>
                    <img
                      src={Images.cart}
                      className="img-fluid cart-img"
                      alt="img"
                    />
                  </div>
                </Link>
                {isAuthenticated && (
                  <div className="profile-dropdown">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <figure className="mb-0 me-2 profile-img">
                          <img
                            src={
                              selectedImage ||
                              user?.data?.image ||
                              userInfo?.student_info?.image ||
                              Images.clientImg
                            }
                            className="img-fluid logo-image"
                            alt="img"
                          />
                        </figure>
                        <div className="profile-name">
                          <p>{displayValue(user?.data?.user_name)}</p>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="">
                        <Dropdown.Item
                          href="/student-profile"
                          className="mb-3"
                        >
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </div>
              <Navbar.Collapse id="responsive-navbar-nav" className="pages-names">
                <Nav className="ms-auto">
                  <Link to="/" onClick={handleLinkClick}>Home</Link>
                  <Link to="/courses"onClick={handleLinkClick}>Courses</Link>
                  <Link to="/about-us"onClick={handleLinkClick}>About Us</Link>
                  <Link to="/contact-us"onClick={handleLinkClick}>Contact Us </Link>
                </Nav>
                <div className="additional-items desktop-cart">
                  <Link to="/cart" onClick={handleEmptyCart}>
                    <div className="cart-btn">
                      <span className="count">{cartItems?.length}</span>
                      <img
                        src={Images.cart}
                        className="img-fluid cart-img"
                        alt="img"
                      />
                    </div>
                  </Link>
                  {isAuthenticated && (
                    <div className="profile-dropdown">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <figure className="mb-0 me-2 profile-img">
                            <img
                              src={
                                selectedImage ||
                                user?.data?.image ||
                                userInfo?.student_info?.image ||
                                Images.clientImg
                              }
                              className="img-fluid logo-image"
                              alt="img"
                            />
                          </figure>
                          <div className="profile-name">
                            <p>{displayValue(user?.data?.user_name)}</p>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="">
                          <Dropdown.Item
                            href="/student-profile"
                            className="mb-3"
                          >
                            Profile
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout}>
                            Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </header>
    </div>
  );
};
export default Header;

