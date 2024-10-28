import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { Images } from "../../../../assets/assets";
import { FetchSliders } from "../../../../redux/home/homeActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import Slider from "react-slick";
import "./Banner.css";

function Banner() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchSliders());
  }, [dispatch]);
  const sliders = useSelector((state) => state?.home?.slidersList?.data);
  const loading = useSelector((state) => state?.home?.loading);
  const settings = {
    dots: false,
    infinite: true,
    margin: 10,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1199, // Breakpoint at screen width of 768px and below
        settings: {
          arrows: false,
          dots: true,
        },
      },
      
    ],
  };

  return (
    <div className="main-baner hero-slider">
      {loading ? (
        <Loader />
      ) : (
        <div className="theme__container">
          <Slider {...settings}>
            {sliders?.map((slider, index) => (
              <div className="baner-slider" key={index}>
                <div className="baner-left-side">
                  <div className="baner-content">
                    <h5 className="bg-heading">{slider.title}</h5>
                    <h1>
                      <div
                        dangerouslySetInnerHTML={{ __html: slider.sub_title }}
                      ></div>
                    </h1>
                    <p>{slider.description}</p>
                    {/* <div className="banr-btn-holder">
                      <button className="theme-btn">
                        Find Courses
                        <FontAwesomeIcon
                          className="arrow1"
                          icon={faChevronRight}
                        />
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="baner-right-side">
                  <div className="baner-right-wraper d-flex justify-content-md-end justify-content-center">
                    <img src={slider.image} className="img-fluid" alt="img" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}

export default Banner;
