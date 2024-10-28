import React, { useEffect } from "react";
import Slider from "react-slick";
// import { Images } from "../../../../assets/assets";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FetchTestimonials } from "../..//../../redux/common/commonActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import "./Testimonial.css";

function Testimonial() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchTestimonials());
  }, [dispatch]);
  const testimonials = useSelector(
    (state) => state?.common?.testimonialsList?.data
  );
  const loading = useSelector((state) => state?.common?.loading);
  const client = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // vertical: true,
    // verticalSwiping: true,

    responsive: [
      {
        breakpoint: 1580, // Breakpoint at screen width of 1024px and below
        settings: {
          slidesToShow: 1, // Show 3 slides
        },
      },
      {
        breakpoint: 868, // Breakpoint at screen width of 768px and below
        settings: {
          slidesToShow: 1, 
          dots: true,
          arrows: false,// Show 2 slides
        },
      },
    ],
  };

  return (
    <>
      <div className="client_reommendation gradientb--bg-wraper">
        <div className="theme__container">
          <div className="main_client_wrapper">
            <div className="row align-items-center">
              {loading ? (
                <Loader />
              ) : (
                <div className="col-md-6 order-md-0 order-2">
                  <div className="client_slider">
                    <Slider {...client}>
                      {testimonials?.map((testimonial, index) => (
                        <div className="client_card" key={index}>
                          <div className="client-img-wraper">
                            <img
                              src={testimonial.image}
                              className="position_men_image"
                              alt="img"
                            />
                          </div>
                          <div className="testimonial-content">
                            <h5>{testimonial.name}</h5>
                            <h6 className="theme-color">{testimonial.title}</h6>
                            {/* <div className='course-rating'>
                                                <ul className='star-list'>
                                                    <li>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </li><li>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </li>
                                                </ul>
                                            </div> */}
                            <p>“{testimonial.testimonial}”</p>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              )}
              <div className="col-md-6">
                <div className="section-heading-wraper">
                  <div className="d-flex flex-column ">
                    <h5 className="mb-xl-2 mb-1 one-side-fency-heading">
                      Testimonials
                    </h5>
                    <h2 className="mb-xl-3 mb-1">
                      What Our <span className="theme-color">Students </span>{" "}
                      Say?
                    </h2>
                    <p>
                      Communication on the phone was clear and friendly.
                      Delivery was on time and the delivery people were very
                      friendly and helpful. Without being asked, they brought
                      the ice in hand trucks all the way to the inflatable pool
                      where the i
                    </p>
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

export default Testimonial;
