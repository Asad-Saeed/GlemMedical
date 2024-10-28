import React, { useEffect } from "react";
import { Images } from "../../../../assets/assets";
import OurTeam from "../../Common/OurTeam/OurTeam";
import Testimonial from "../../Common/Testimonial/Testimonial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FetchAbouts } from "../../../../redux/aboutUs/aboutActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import WhyChoose from "./WhyChoose";
import "./About.css";

function AboutUs() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchAbouts());
  }, [dispatch]);
  const abouts = useSelector((state) => state?.abouts?.aboutsList?.data);
  const loading = useSelector((state) => state?.abouts?.loading);
  return (
    <div className="about-pg-wraper">
      {loading ? (
        <Loader />
      ) : (
        abouts?.slice(0, 2).map((about, index) => (
          <React.Fragment key={index}>
            {about.section === 1 ? (
              <section className="commmon-cms-baner">
                <div className="theme__container">
                  <div className="d-flex flex-column justify-content-center align-items-center cms-baner-content">
                    <h1 dangerouslySetInnerHTML={{ __html: about.title }}></h1>
                    <p className="mt-xl-3 mt-md-2 mt-1">{about.content}</p>
                  </div>
                </div>
              </section>
            ) : (
              <section className="quality-course">
                <div className="theme__container">
                  <div className="row pt-90 pb-90">
                    <div className="col-md-6">
                      <div className="section-heading-wraper">
                        <div className="d-flex flex-column">
                          <h5 className="mb-xl-2 mb-1 one-side-fency-heading">
                            {about.title}
                          </h5>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: about.sub_title
                            }}
                          />
                          <p
                            className="mt-xl-4 mt-md-3 mt-2"
                            dangerouslySetInnerHTML={{
                              __html: about.content
                            }}
                          ></p>
                          <div className="btn-holder pt-50">
                            <button className="theme-btn">
                              Get Started
                              <FontAwesomeIcon
                                className="arrow1"
                                icon={faChevronRight}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                      <div className="quality-course-img">
                        <img
                          src={Images.qualityCourse}
                          className="img-fluid"
                          alt="img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </React.Fragment>
        ))
      )}
      <WhyChoose abouts={abouts} />
      <OurTeam isAboutUsScreen={true} />
      <Testimonial />
    </div>
  );
}

export default AboutUs;
