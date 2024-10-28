import React, { useEffect } from "react";
import Slider from "react-slick";
// import { Images } from "../../../../assets/assets";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FetchEvents } from "../..//../../redux/common/commonActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import "./NewsEvents.css";

function NewsEvents() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchEvents());
  }, [dispatch]);
  const events = useSelector((state) => state?.common?.eventsList?.data);
  const loading = useSelector((state) => state?.common?.loading);
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    margin: 10,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="news-event-wraper mb-90">
      <div className="theme__container">
        <div className="section-heading-wraper">
          <div className="fency-heading d-flex flex-column align-items-center justify-content-center text-center">
            <h5>Events</h5>
            <h2>Popular News & Events </h2>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="news-event-slider mt-50">
            <Slider {...settings}>
            {events?.map((event, index) => (
              <div className="news-event-slide white-box" key={index}>
                <div className="news-img-wraper">
                  <img src={event.image} className="img-fluid" alt="img" />
                </div>
                <div className="news-event-detail">
                <Link to={`/fetch-event/${event.id}`}><h5>{event.title}</h5></Link>
                  <div className="qualification mt-xl-2 mt-1">
                    <p>
                      {event.description}
                    </p>
                  </div>
                  <p className="loaction-p mt-xl-2 mt-1">
                    <span className="text-red me-2">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsEvents;
