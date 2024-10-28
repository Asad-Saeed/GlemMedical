import React, { useEffect } from "react";
import { Images } from "../../../assets/assets";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FetchCourses } from "../../../redux/courses/courseActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import "./Courses.css";

function Courses() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchCourses());
  }, [dispatch]);
  const courses = useSelector((state) => state?.courses?.coursesList?.data);
  const loading = useSelector((state) => state?.courses?.loading);
  return (
    <div className="popular-courses-wraper">
      {loading ? (
        <Loader />
      ) : (
        <div className="theme__container">
          <section className="courses-detail-wraper pt-90">
            <div className="section-heading-wraper">
              <div className="fency-heading d-flex flex-column align-items-center justify-content-center text-center">
                <h5>Popular Courses</h5>
                <h2>Course To Get Started</h2>
              </div>
            </div>
            <div className="row courses_list">
              {courses?.slice(0, 4).map((course, index) => (
                <div className="col-md-6 pt-50" key={index}>
                  <Link to={`/courses-detail/${course?.id}`}>
                    <div className="courses-detail-box">
                      <div className="course-image">
                        <img
                          src={course?.image}
                          className="img-fluid"
                          alt="img"
                        />
                      </div>
                      <div className="course-description">
                        <h5 className="course-price text-red mb-xl-2 mb-1">
                          {course?.price}
                        </h5>
                        <Link to={`/courses-detail/${course?.id}`}>
                          <h6 className="mb-xl-2 mb-1">{course?.title_en}</h6>
                        </Link>
                        <p className="course-para mb-xl-2 mb-1">
                          {course?.description_en}
                        </p>
                        <div className="course-rating">
                          <ul className="star-list">
                            <li>
                              <FontAwesomeIcon icon={faStar} />
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faStar} />
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faStar} />
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faStar} />
                            </li>
                          </ul>
                          <p className="small-text">(5.0/9 Reating)</p>
                        </div>
                        <ul className="course-member mt-xl-3 mt-2">
                          <li>
                            <img
                              src={Images?.lesson}
                              className="img-fluid me-xl-2 me-1"
                              alt="img"
                            />
                            <p className="small-text">{course?.lesson}</p>
                          </li>
                          <li>
                            <img
                              src={Images?.primeUser}
                              className="img-fluid me-xl-2 me-1"
                              alt="img"
                            />
                            <p className="small-text">{course?.total_students} Students </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <div className="btn-holder pt-50 d-flex justify-content-center align-items-center">
                <Link to='/courses'>
                  <button className="theme-btn">
                    View All Courses
                    <FontAwesomeIcon className="arrow1" icon={faChevronRight} />
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Courses;
