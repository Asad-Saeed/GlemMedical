import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Images } from "../../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = ({settings}) => {
    return (
        <div>
            <footer className="site-footer">
                <Container fluid className="theme__container">
                    <div className="top-footer">
                        <Row className="footer-content-row">
                            <div className="col-lg-4">
                                <div className="footer-logo">
                                    <img src={Images.footerLogo} className="img-fluid" alt="img" />
                                </div>
                                <p>
                                    Excepteur sint occaecat cupidatat non proident sunt in
                                    culpa qui officia deserunt mollit.
                                </p>
                                <p className="mt-xl-4 mt-3">
                                    Excepteur sint occaecat cupidatat non proident sunt in
                                    culpa qui officia deserunt mollit.
                                </p>
                            </div>
                            <div className="col-lg-2">
                                <div className="footer-links">
                                    <h5>Online Platform</h5>
                                    <ul className="list-unstyled">
                                       <li>
                                           <Link to="/">Home</Link>
                                        </li>
                                        <li>
                                           <Link to="/about-us">About</Link>
                                        </li>
                                        <li>
                                           <Link to="/contact-us">Contact</Link>
                                        </li>
                                        <li>
                                           <Link to="/courses">Courses</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="footer-links">
                                    <h5 className="">Links</h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a href="#">Customer Support</a>
                                        </li>
                                        <li>
                                            <a href="#">Terms & Conditions</a>
                                        </li>
                                        <li>
                                            <a href="#">privacy Policy</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="footer-links">
                                    <h5 className="">Contacts</h5>
                                    <div className="footer-newsletter">
                                        <p className="p-text-24 light-gray_clr">
                                            Be the first to hear about new offers and updates from
                                            comlinked
                                        </p>
                                        <div className="field-wrapper">
                                            <input
                                                className="form-control"
                                                name="email"
                                                type="text"
                                                placeholder="Email address"
                                            />
                                            <button className="theme-btn">
                                                Subscribe
                                                <FontAwesomeIcon className="arrow1" icon={faChevronRight} />
                                            </button>
                                        </div>
                                        <div className="follow-us">
                                        <ul className="list-unstyled contact-info d-flex flex-row ">
                                            {settings?.facebook && (
                                                <li>
                                                    <a href={settings.facebook} target="_blank" rel="noreferrer" className="facebook">
                                                        <span>
                                                            <FontAwesomeIcon icon={faFacebookF} />
                                                        </span>
                                                    </a>
                                                </li>
                                            )}
                                            {settings?.instagram && (
                                                <li>
                                                    <a href={settings.instagram} target="_blank" rel="noreferrer" className="instagram">
                                                        <span>
                                                            <FontAwesomeIcon icon={faInstagram} />
                                                        </span>
                                                    </a>
                                                </li>
                                            )}
                                            {settings?.twitter && (
                                                <li>
                                                    <a href={settings.twitter} target="_blank" rel="noreferrer" className="twitter">
                                                        <span>
                                                            <FontAwesomeIcon icon={faTwitter} />
                                                        </span>
                                                    </a>
                                                </li>
                                            )}
                                            {settings?.pinterest && (
                                                <li>
                                                    <a href={settings.pinterest} target="_blank" rel="noreferrer" className="pinterest">
                                                        <span>
                                                            <FontAwesomeIcon icon={faPinterest} />
                                                        </span>
                                                    </a>
                                                </li>
                                            )}
                                            {settings?.linkedin && (
                                                <li>
                                                    <a href={settings.linkedin} target="_blank" rel="noreferrer" className="linkedin">
                                                        <span>
                                                            <FontAwesomeIcon icon={faLinkedinIn} />
                                                        </span>
                                                    </a>
                                                </li>
                                            )}
                                            {settings?.youtube && (
                                                <li>
                                                    <a href={settings.youtube} target="_blank" rel="noreferrer" className="youtube">
                                                        <span>
                                                            <FontAwesomeIcon icon={faYoutube} />
                                                        </span>
                                                    </a>
                                                </li>
                                            )}
                                        </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                    <div className="bottom-footer">
                        <div className="copyrights">
                            <p className="p-text-20 light-gray_clr">
                                {settings?.footer_description}
                            </p>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>
    );
};
export default Footer;

