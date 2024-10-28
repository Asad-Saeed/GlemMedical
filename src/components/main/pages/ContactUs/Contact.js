import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faSquareWhatsapp, faFacebookF, faTwitter, faLinkedinIn, faPinterest, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Form from "react-bootstrap/Form";
import { ContactUs } from "../../../../redux/contactUs/contactUsActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "./contact.css";

function Contact({settings}) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const contactUs = useSelector((state) => state?.contactUs?.message);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (contactUs?.status === 1) {
      reset();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // Hide the success message after 5 seconds
    }
  }, [contactUs, reset]);

  const onSubmit = async (data) => {
    dispatch(ContactUs(data));
  };

  return (
    <div className="contact-us-wraper pb-90">
      <section className="commmon-cms-baner">
        <div className="theme__container">
          <div className="d-flex flex-column justify-content-center align-items-center cms-baner-content">
            <h1>
              Contact <span className="theme-color">Us</span>
            </h1>
            <p className="mt-xl-3 mt-md-2 mt-1">
              Lorem ipsum dolor sit amet consectetur. Ipsum sed consequat ac
              turpis feugiat nisl. Volutpat eu facilisis semper nam netus
              tincidunt nisl feugiat sit.
            </p>
          </div>
        </div>
      </section>
      <section className="contact-detail pt-90">
        <div className="theme__container">
          <div className="row">
            <div className="col-md-4 order-md-0 order-2">
              <div className="contact-form-left">
                <h2>Contact Us</h2>
                <ul className="contact_info">
                  <li>
                    <span className="me-2">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    Merwedeweg 5-B53621 LP Breukelen
                  </li>
                  <li>
                    <span className="me-2">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    {settings ? settings.contact_number : '+1234567890'}
                  </li>
                  <li>
                    <span className="me-2">
                      <FontAwesomeIcon icon={faSquareWhatsapp} />
                    </span>
                    {settings ? settings.contact_number : '+1234567890'}
                  </li>
                  <li>
                    <span className="me-2">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    {settings ? settings.contact_email : 'gleammedstudies@info.com'}
                  </li>
                </ul>
                <div className="opening-time mt-xl-5 mt-md-3 mt-2">
                  <h5>Opening hours</h5>
                  <p className="mt-xl-3 mt-2">
                    Ordering is possible 24/7 via 123 7878 789 and the order
                    form.
                  </p>
                </div>
                <div className="follow-us contact-social-icons mt-xl-4 mt-md-3 mt-2">
                  <ul className="list-unstyled contact-info d-flex flex-row mb-md-0 mb-5">
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
            <div className="col-md-8">
              <div className="form-wraper">
                <div className="section-heading-wraper">
                  <div className="d-flex flex-column">
                    <h5 className="mb-xl-2 mb-1 one-side-fency-heading">
                      Let’s Talk
                    </h5>
                    <h2 className="mb-xl-3 mb-1">
                      Let’s Get in <span className="theme-color">Touch</span>
                    </h2>
                  </div>
                  {/* CLIENT SIDE VALIDATION MESSAGES */}
                  {errors.name && <div className="alert alert-danger alert-dismissible">Please check the Name</div>}
                  {errors.email && <div className="alert alert-danger alert-dismissible">Please check the Email</div>}
                  {errors.phone && <div className="alert alert-danger alert-dismissible">Please check the Phone</div>}
                  {errors.message && <div className="alert alert-danger alert-dismissible">Please check the Message</div>}

                  {/* SERVER SIDE VALIDATION MESSAGE */}
                  {(contactUs?.status === 0 && contactUs.message) &&
                    Object.keys(contactUs.message).map(key => (
                      <div key={key} className="alert alert-danger alert-dismissible">
                        {contactUs.message[key][0]}
                      </div>
                    ))
                  }

                  {/* SERVER SIDE SUCCESS MESSAGE */}
                  {showSuccess && contactUs?.status === 1 &&
                    <div className="alert alert-success alert-dismissible">
                      {contactUs?.message}
                    </div>
                  }
                </div>
                <Form method="post" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      size="lg"
                      placeholder="Enter your name"
                      {...register("name", { required: true })}
                    />
                  </Form.Group>
                  <div className="row">
                    <Form.Group className="mb-3 col-lg-6" controlId="exampleForm.ControlInput2">
                      <Form.Label>Email address <span style={{ color: 'red' }}>*</span></Form.Label>
                      <Form.Control
                        className="w-100"
                        type="email"
                        name="email"
                        size="lg"
                        placeholder="Enter your e-mail address"
                        {...register("email", { required: true })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="exampleForm.ControlInput3">
                      <Form.Label>Phone Number <span style={{ color: 'red' }}>*</span></Form.Label>
                      <Form.Control
                        className="w-100"
                        type="tel"
                        name="phone"
                        size="lg"
                        placeholder="Enter your phone number"
                        {...register("phone", { required: true })}
                      />
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={3}
                      placeholder="Type here..."
                      {...register("message", { required: true })}
                    />
                  </Form.Group>
                  <div className="btn-holder mt-xl-4 mt-2 d-flex justify-content-end align-items-end">
                    <button className="theme-btn" type="submit">
                      Submit
                      <FontAwesomeIcon className="arrow1" icon={faChevronRight} />
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;