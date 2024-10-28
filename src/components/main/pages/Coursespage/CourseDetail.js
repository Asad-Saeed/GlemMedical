import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { Images } from "../../../../assets/assets";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FetchCourseDetail } from "../../../../redux/courses/courseActions";
import { useDispatch, useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { addToCart, fetchCart } from "../../../../redux/cart/cartActions";

function CoursesDeatil() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const course = useSelector((state) => state?.courses?.courseDetail?.data);
  const user = useSelector((state) => state?.auth?.user);
  var location = window.location.href.split("/");
  let course_id = location[4];
  useEffect(() => {
    dispatch(FetchCourseDetail(course_id));
  }, [dispatch, course_id]);

  const handleAddToCart = (id) => {
    try {
      const res = dispatch(addToCart(id, user?.data?.accessToken));
      if (res.status === 200) {
        dispatch(fetchCart(user?.data?.accessToken));
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error(
        "An error occurred while adding the item to the cart:",
        error
      );
    }
  };
  return (
    <div className="course-detail-pg pb-90">
      <section className="commmon-cms-baner">
        <div className="theme__container">
          <div className="row">
            <div className="col-lg-7">
              <h2>{course?.title_en}</h2>
              <p className="mt-xl-3 mt-md-2 mt-1">{course?.prerequisites_en}</p>
              <div className="btn-holder pt-50">
                {/* <button className="theme-btn" href="/checkout">
                  Get Started
                  <FontAwesomeIcon className="arrow1" icon={faChevronRight} />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="courses-detail-content pt-50">
        <div className="theme__container">
          <div className="row">
            <div className="col-lg-8 tab-content-row">
              <Tabs
                defaultActiveKey="Overview"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="Overview" title="Overview">
                  <div className="tab-content">
                    <h2>Course Description</h2>
                    <p className="mt-xl-4 mt-3">{course?.description_en}</p>
                    {/* <div className='what-u-learn'>
                                            <h4 className='mt-xl-4 mt-3'>What You’ll Learn?</h4>
                                            <ul className='what-u-learn-list mt-xl-4 mt-3'>
                                                <li>Communication on the phone was clear and friendly. </li>
                                                <li>Communication on the phone was clear and friendly. </li>
                                                <li>Communication on the phone was clear and friendly. </li>
                                                <li>Communication on the phone was clear and friendly. </li>
                                            </ul>
                                        </div> */}
                  </div>
                </Tab>
                <Tab eventKey="Carriculam" title="Carriculam">
                  No content for Carriculam
                </Tab>
                <Tab eventKey="Instructor" title="Instructor">
                  <div className="tab-content">
                    <h2>{course?.instructor?.name_en}</h2>
                    <div className="what-u-learn">
                      <h5 className="mt-xl-4 mt-3">Designation</h5>
                      <p className="mt-xl-4 mt-3">
                        {course?.instructor?.designation}
                      </p>
                    </div>
                    <h5 className="mt-xl-4 mt-3">Bio</h5>
                    <p className="mt-xl-4 mt-3">{course?.instructor?.bio}</p>
                  </div>
                </Tab>
                <Tab eventKey="Reviews" title="Reviews">
                  No content for Reviews
                </Tab>
              </Tabs>
            </div>
            <div className="col-lg-4">
              <div className="course-detail-info">
                <div className="course-detail-card-head">
                  <img src={course?.image} className="img-fluid" alt="img" />
                </div>
                <div className="course-detail-table">
                  <table className="table ">
                    <tbody>
                      <tr>
                        <td>Price:</td>
                        <td className="text-red text-end">
                          <b>{course?.price}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>Instrutor:</td>
                        <td className="text-end">
                          {course?.instructor?.name_en}
                        </td>
                      </tr>
                      <tr>
                        <td>Duration:</td>
                        <td className="text-end">{course?.duration}</td>
                      </tr>
                      <tr>
                        <td>Lesson:</td>
                        <td className="text-end">{course?.lesson} lessons</td>
                      </tr>
                      <tr>
                        <td>Type:</td>
                        <td className="text-end">{course?.type}</td>
                      </tr>
                      <tr>
                        <td>Difficulty:</td>
                        <td className="text-end">{course?.difficulty}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="btn-holder mt-xl-4 mt-3 d-flex justify-content-center align-items-center">
                    <button
                      className="theme-btn"
                      onClick={() => handleAddToCart(course?.id)}
                    >
                      Add to Cart
                      <FontAwesomeIcon
                        className="arrow1"
                        icon={faChevronRight}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className='more-courses pt-90'>
                <div className="theme__container">
                    <div className='more-courses-content'>
                        <h4 className='mb-xl-5 mb-md-4 mb-3'>More Courses for You</h4>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className='more-courses-box courses-detail-box mb-md-3 mb-2'>
                                    <div className='course-image'>
                                        <img src={Images.moreCourse1} className="img-fluid" alt="img" />
                                    </div>
                                    <div className='course-description'>
                                        <h6 className='course-price text-red mt-md-3 mt-2 mb-xl-2 mb-1'>
                                            $238.85
                                        </h6>
                                        <h6 className='mb-xl-2 mb-1'>
                                            Start a branded social media account: In addition to
                                        </h6>
                                        <p className='course-para mb-xl-2 mb-1'>Lorem ipsum dolor sit amet consectetur. Ipsum sed consequat ac turpis feugiat nisl. Volutpat eu </p>
                                        <div className='course-rating'>
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
                                            <p className='small-text'>(5.0/9 Reating)</p>
                                        </div>
                                        <ul className='course-member mt-xl-3 mt-2'>
                                            <li>
                                                <img src={Images.lesson} className="img-fluid me-xl-2 me-1" alt="img" />
                                                <p className='small-text'>15 Lessons</p>
                                            </li>
                                            <li>
                                                <img src={Images.primeUser} className="img-fluid me-xl-2 me-1" alt="img" />
                                                <p className='small-text'>32 Student </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='more-courses-box courses-detail-box mb-md-3 mb-2'>
                                    <div className='course-image'>
                                        <img src={Images.moreCourse2} className="img-fluid" alt="img" />
                                    </div>
                                    <div className='course-description'>
                                        <h6 className='course-price text-red mt-md-3 mt-2 mb-xl-2 mb-1'>
                                            $238.85
                                        </h6>
                                        <h6 className='mb-xl-2 mb-1'>
                                            Start a branded social media account: In addition to
                                        </h6>
                                        <p className='course-para mb-xl-2 mb-1'>Lorem ipsum dolor sit amet consectetur. Ipsum sed consequat ac turpis feugiat nisl. Volutpat eu </p>
                                        <div className='course-rating'>
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
                                            <p className='small-text'>(5.0/9 Reating)</p>
                                        </div>
                                        <ul className='course-member mt-xl-3 mt-2'>
                                            <li>
                                                <img src={Images.lesson} className="img-fluid me-xl-2 me-1" alt="img" />
                                                <p className='small-text'>15 Lessons</p>
                                            </li>
                                            <li>
                                                <img src={Images.primeUser} className="img-fluid me-xl-2 me-1" alt="img" />
                                                <p className='small-text'>32 Student </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='more-courses-box courses-detail-box mb-md-3 mb-2'>
                                    <div className='course-image'>
                                        <img src={Images.moreCourse3} className="img-fluid" alt="img" />
                                    </div>
                                    <div className='course-description'>
                                        <h6 className='course-price text-red mt-md-3 mt-2 mb-xl-2 mb-1'>
                                            $238.85
                                        </h6>
                                        <h6 className='mb-xl-2 mb-1'>
                                            Start a branded social media account: In addition to
                                        </h6>
                                        <p className='course-para mb-xl-2 mb-1'>Lorem ipsum dolor sit amet consectetur. Ipsum sed consequat ac turpis feugiat nisl. Volutpat eu </p>
                                        <div className='course-rating'>
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
                                            <p className='small-text'>(5.0/9 Reating)</p>
                                        </div>
                                        <ul className='course-member mt-xl-3 mt-2'>
                                            <li>
                                                <img src={Images.lesson} className="img-fluid me-xl-2 me-1" alt="img" />
                                                <p className='small-text'>15 Lessons</p>
                                            </li>
                                            <li>
                                                <img src={Images.primeUser} className="img-fluid me-xl-2 me-1" alt="img" />
                                                <p className='small-text'>32 Student </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='more-courses-box courses-detail-box mb-md-3 mb-2'>
                                    <div className='course-image'>
                                        <img src={Images.moreCourse1} className="img-fluid" alt="img" />
                                    </div>
                                    <div className='course-description'>
                                        <h6 className='course-price text-red mt-md-3 mt-2 mb-xl-2 mb-1'>
                                            $238.85
                                        </h6>
                                        <h6 className='mb-xl-2 mb-1'>
                                            Start a branded social media account: In addition to
                                        </h6>
                                        <p className='course-para mb-xl-2 mb-1'>Lorem ipsum dolor sit amet consectetur. Ipsum sed consequat ac turpis feugiat nisl. Volutpat eu </p>
                                        <div className='course-rating'>
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
                                            <p className='small-text'>(5.0/9 Reating)</p>
                                        </div>
                                        <ul className='course-member mt-xl-3 mt-2'>
                                            <li>
                                                <img src={Images.lesson} className="img-fluid me-xl-2 me-1" alt="img" />
                                                <p className='small-text'>15 Lessons</p>
                                            </li>
                                            <li>
                                                <img src={Images.primeUser} className="img-fluid me-xl-2 me-1" alt="img" />
                                                <p className='small-text'>32 Student </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
    </div>
  );
}

export default CoursesDeatil;
