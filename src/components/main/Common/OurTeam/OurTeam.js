import React, { useEffect } from "react";
import Slider from "react-slick";
// import { Images } from "../../../../assets/assets";
import { FetchTeams } from "../..//../../redux/common/commonActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import "./OurTeam.css";

function OurTeam({ isAboutUsScreen }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchTeams());
  }, [dispatch]);
  const teams = useSelector((state) => state?.common?.teamsList?.data);
  const loading = useSelector((state) => state?.common?.loading);
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    margin: 10,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
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
    <div
      className={`our-team-wraper ${
        isAboutUsScreen ? "pt-50" : "gradientb--bg-wraper"
      } mb-90`}
    >
      <div className="theme__container">
        <div className="section-heading-wraper">
          <div className="fency-heading d-flex flex-column align-items-center justify-content-center text-center">
            <h5>Team</h5>
            <h2>Meet Our Team</h2>
          </div>
        </div>
        {/* Slider component and other content can go here */}
        {loading ? (
          <Loader />
        ) : (
          <div className="our-team-slider mt-50">
            <Slider {...settings}>
              {teams?.map((team, index) => (
                <div className="our-team-slide white-box" key={index}>
                  <div className="our-team-image">
                    <img src={team?.image} className="img-fluid" alt="img" />
                  </div>
                  <div className="team-member-detail">
                    <h5>{team?.name_en}</h5>
                    <p>{team?.designation}</p>
                    <div className="qualification mt-xl-2 mt-1">
                      <p>
                        <span className="theme-color">Qualification:</span>{" "}
                        {team?.title}
                      </p>
                    </div>
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

export default OurTeam;
