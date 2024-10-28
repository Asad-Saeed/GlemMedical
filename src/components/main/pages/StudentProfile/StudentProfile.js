import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Images } from "../../../../assets/assets";
import "./StudentProfile.css";
import {
  fetchUserInfo,
  updateUserInfo,
  changePassword,
  fetchDashboardData,
} from "../../../../redux/profile/profileActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { displayValue } from "../../../../config/config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  passwordChangeSchema,
  profileUpdateSchema,
} from "../../../../config/schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FetchCourses } from "../../../../redux/courses/courseActions";
import CheckoutSummary from "../../Common/Cards/CheckoutItem";
import ImageUploadComponent from "../../Common/Form/imageChange";
import { toast } from "react-toastify";
import CourseList from "../../Common/Cards/CourseList";

function StudentProfile() {
  const dispatch = useDispatch();
  const { userInfo, dashboardInfo, loading } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const { coursesList } = useSelector((state) => state.courses);
  // Update profile
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: profileIsSubmitting },
    setValue: setValueProfile,
  } = useForm({
    resolver: yupResolver(profileUpdateSchema),
    mode: "all",
  });

  useEffect(() => {
    if (user?.data?.accessToken) {
      dispatch(fetchUserInfo(user?.data?.accessToken));
      dispatch(fetchDashboardData(user?.data?.accessToken));
      dispatch(FetchCourses(user?.data?.accessToken));
    }
  }, [user?.data?.accessToken]);

  useEffect(() => {
    if (userInfo) {
      setValueProfile(
        "first_name",
        displayValue(userInfo?.student_info?.first_name, "")
      );
      setValueProfile(
        "last_name",
        displayValue(userInfo?.student_info?.last_name, "")
      );
      setValueProfile("email", displayValue(userInfo?.student_info?.email, ""));
      setValueProfile(
        "profession",
        displayValue(userInfo?.student_info?.profession, "")
      );
      setValueProfile(
        "phone_no",
        displayValue(userInfo?.student_info?.phone_no, "")
      );
      // setValueProfile(
      //   "country",
      //   displayValue(userInfo?.student_info?.country, "")
      // );
    }
  }, [userInfo, setValueProfile]);

  const onSubmitProfile = async (data) => {
    const apiPayload = {
      ...data,
      user_name: userInfo?.student_info?.user_name,
    };
    const res = await dispatch(
      updateUserInfo(apiPayload, user?.data?.accessToken)
    );
    if (res?.status === 1) {
      // update profile data
      dispatch(fetchUserInfo(user?.data?.accessToken));
    }
  };

  // change Password
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: passwordIsSubmitting },
  } = useForm({
    resolver: yupResolver(passwordChangeSchema),
    mode: "all",
  });
  const onSubmitPasswordChange = async (data) => {
    await dispatch(changePassword(data, user?.data?.accessToken));
  };

  const [selectedImage, setSelectedImage] = useState(user?.data?.image || "");

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, [selectedImage, localStorage.getItem("selectedImage")]);

  // Function to calculate the end date
  function calculateEndDate(startDate, duration) {
    const start = new Date(startDate);
    const endDate = new Date(start);
    if (isNaN(start.getTime()) || isNaN(duration)) {
      toast.error(`Invalid startDate or duration: ${startDate}, ${duration}`);
    }
    endDate.setMonth(start.getMonth() + duration);
    return endDate;
  }

  // Separate active and completed courses
  const activeCourses = [];
  const completedCourses = [];
  const currentDate = new Date();

  // filter active and completed courses
  dashboardInfo?.enrollment?.forEach((enrollment) => {
    const course = dashboardInfo?.courses?.find(
      (course) => course?.course_id === enrollment?.course_id
    );

    if (course) {
      try {
        const endDate = calculateEndDate(course?.start_from, course?.duration);
        if (currentDate > endDate) {
          completedCourses.push(course);
        } else {
          activeCourses.push(course);
        }
      } catch (error) {
        console.error(
          `Error processing course_id: ${enrollment?.course_id}`,
          error
        );
      }
    } else {
      console.log(`No course found for course_id: ${enrollment?.course_id}`);
    }
  });

  if (loading)
    return (
      <div className="loader-wraper h-screen">
        <Loader />.
      </div>
    );

  return (
    <div>
      <section className="section students-info">
        <div className="theme__container">
          <div className="students-info-intro">
            {/* profile Details   */}
            <div className="students-info-intro__profile">
              <div>
                <div className="students-info-intro-start">
                  <div className="image">
                    <img
                      src={
                        selectedImage ||
                        user?.data?.image ||
                        userInfo?.student_info?.image ||
                        Images.clientImg
                      }
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                  <div className="text">
                    <h5>{`${displayValue(
                      userInfo?.student_info?.first_name
                    )} ${displayValue(userInfo?.student_info?.last_name)}`}</h5>
                    <p>{displayValue(userInfo?.student_info?.profession)}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="students-info-intro-end">
                  <div className="enrolled-courses">
                    <div className="enrolled-courses-icon">
                      <svg
                        width={28}
                        height={26}
                        viewBox="0 0 28 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.625H8.8C10.1791 1.625 11.5018 2.15764 12.477 3.10574C13.4521 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 13.5891 22.405 12.8577 21.6939C12.1263 20.9828 11.1343 20.5833 10.1 20.5833H1V1.625Z"
                          stroke="#1089FF"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M27 1.625H19.2C17.8209 1.625 16.4982 2.15764 15.523 3.10574C14.5479 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 14.4109 22.405 15.1423 21.6939C15.8737 20.9828 16.8657 20.5833 17.9 20.5833H27V1.625Z"
                          stroke="#1089FF"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="enrolled-courses-text">
                      <h6 className="font-title--xs">
                        {displayValue(userInfo?.enrollment?.length)}
                      </h6>
                      <p className="fs-6 mt-1">Enrolled Courses</p>
                    </div>
                  </div>
                  <div className="completed-courses">
                    <div className="completed-courses-icon">
                      <svg
                        width={22}
                        height={26}
                        viewBox="0 0 22 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.1716 3.95235C19.715 4.14258 20.078 4.65484 20.078 5.23051V13.6518C20.078 16.0054 19.2226 18.2522 17.7119 19.9929C16.9522 20.8694 15.9911 21.552 14.9703 22.1041L10.5465 24.4938L6.11516 22.1028C5.09312 21.5508 4.13077 20.8694 3.36983 19.9916C1.85791 18.2509 1 16.0029 1 13.6468V5.23051C1 4.65484 1.36306 4.14258 1.90641 3.95235L10.0902 1.07647C10.3811 0.974511 10.6982 0.974511 10.9879 1.07647L19.1716 3.95235Z"
                          stroke="#00AF91"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.30688 12.4002L9.65931 14.7538L14.5059 9.90723"
                          stroke="#00AF91"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="completed-courses-text">
                      <h5 className="font-title--xs">
                        {displayValue(completedCourses?.length)}
                      </h5>
                      <p className="fs-6 mt-1">Completed Courses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="students-info-main student-profile-tab  mt-lg-4 mt-3">
            <div className="tab-content">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={12}>
                    <Nav variant="pills">
                      <Nav.Item>
                        <Nav.Link eventKey="first">My Profile</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Courses</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Active Courses</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="forth">Completed Courses</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fifth">Purchase History</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="six">Setting</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12} className="mt-lg-4 mt-3">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div>
                          <div className="tab-content__profile row">
                            <div className="tab-content__profile-content col-lg-6">
                              <div className="about-student">
                                <h6 className="font-title--card mb-lg-2 mb-1">
                                  About Me
                                </h6>
                                <p className="font-para--md">
                                  {displayValue(userInfo?.student_info?.bio)}
                                </p>
                              </div>
                            </div>
                            <div className="tab-content__profile-content col-lg-6">
                              <div className="info-student">
                                <h6 className="font-title--card mb-lg-2 mb-1">
                                  {`${displayValue(
                                    userInfo?.student_info?.first_name
                                  )} ${displayValue(
                                    userInfo?.student_info?.last_name
                                  )}`}{" "}
                                  Information
                                </h6>
                                <dl className="row my-0 info-student-topic">
                                  <dt className="col-sm-4">
                                    <span>Name</span>
                                  </dt>
                                  <dd className="col-sm-8">
                                    <p>{`${displayValue(
                                      userInfo?.student_info?.first_name
                                    )} ${displayValue(
                                      userInfo?.student_info?.last_name
                                    )}`}</p>
                                  </dd>
                                </dl>
                                <dl className="row my-0 info-student-topic">
                                  <dt className="col-sm-4">
                                    <span>E-mail</span>
                                  </dt>
                                  <dd className="col-sm-8">
                                    <p>
                                      {displayValue(
                                        userInfo?.student_info?.email
                                      )}
                                    </p>
                                  </dd>
                                </dl>
                                <dl className="row my-0 info-student-topic">
                                  <dt className="col-sm-4">
                                    <span>Username</span>
                                  </dt>
                                  <dd className="col-sm-8">
                                    <p>
                                      {displayValue(
                                        userInfo?.student_info?.user_name
                                      )}
                                    </p>
                                  </dd>
                                </dl>
                                <dl className="row my-0 info-student-topic">
                                  <dt className="col-sm-4">
                                    <span>Profession</span>
                                  </dt>
                                  <dd className="col-sm-8">
                                    <p>
                                      {displayValue(
                                        userInfo?.student_info?.profession
                                      )}
                                    </p>
                                  </dd>
                                </dl>
                                <dl className="row my-0 info-student-topic">
                                  <dt className="col-sm-4">
                                    <span>Phone Number</span>
                                  </dt>
                                  <dd className="col-sm-8">
                                    <p>
                                      {displayValue(
                                        userInfo?.student_info?.phone_no
                                      )}
                                    </p>
                                  </dd>
                                </dl>
                                <dl className="row my-0 info-student-topic">
                                  <dt className="col-sm-4">
                                    <span>Nationality</span>
                                  </dt>
                                  <dd className="col-sm-8">
                                    <p>
                                      {displayValue(
                                        userInfo?.student_info?.country
                                      )}
                                    </p>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <CourseList
                          courses={coursesList?.data || []}
                          disableCondition={false}
                          isViewCondition={false}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <CourseList
                          courses={activeCourses || []}
                          disableCondition={false}
                          isViewCondition={true}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="forth">
                        <CourseList
                          courses={completedCourses || []}
                          disableCondition={true}
                          isViewCondition={true}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="purchase-area">
                              {dashboardInfo?.checkout ? (
                                <CheckoutSummary
                                  checkout={dashboardInfo?.checkout}
                                />
                              ) : (
                                <h4 className="text-center">No Data Found!</h4>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-lg-5 mt-4">
                          <div className="col-lg-12 text-center">
                            <p
                              style={{
                                color: "#42414b !important",
                                fontSize: "18px !important",
                              }}
                            >
                              Yay! You have seen all your purchase history.
                              <svg
                                width={31}
                                height={31}
                                viewBox="0 0 31 31"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d)">
                                  <path
                                    d="M15.8653 26.6346C23.1194 26.4329 28.8365 20.3887 28.6347 13.1346C28.433 5.8805 22.3888 0.163433 15.1347 0.365178C7.88061 0.566922 2.16355 6.61108 2.36529 13.8652C2.56704 21.1193 8.61119 26.8363 15.8653 26.6346Z"
                                    fill="url(#paint0_radial)"
                                  />
                                  <path
                                    d="M15.8653 26.6346C23.1194 26.4329 28.8365 20.3887 28.6347 13.1346C28.433 5.8805 22.3888 0.163433 15.1347 0.365178C7.88061 0.566922 2.16355 6.61108 2.36529 13.8652C2.56704 21.1193 8.61119 26.8363 15.8653 26.6346Z"
                                    fill="url(#paint1_linear)"
                                  />
                                  <path
                                    d="M28.0022 13.1522C28.1942 20.0569 22.7524 25.81 15.8477 26.002C8.94295 26.1941 3.18988 20.7523 2.99785 13.8476C2.80582 6.94284 8.24756 1.18977 15.1523 0.997737C22.057 0.805709 27.8101 6.24744 28.0022 13.1522Z"
                                    stroke="#D67504"
                                    strokeOpacity="0.27"
                                    strokeWidth="1.26563"
                                  />
                                </g>
                                <path
                                  d="M17.7944 8.07061C16.9534 8.34992 15.9151 8.39547 15.5022 8.40458C15.0893 8.39547 14.0449 8.34992 13.2069 8.07061C11.61 7.5393 9.03846 7.20231 7.07718 7.24785C5.62595 7.28429 4.12311 7.47859 3.18801 7.66683C2.77208 7.75184 2.50794 8.15866 2.6051 8.57156L2.70528 8.99963C2.76297 9.24859 2.95728 9.43379 3.20016 9.5188C3.32464 9.56434 3.44608 9.64632 3.50073 9.79205C3.66771 10.2444 4.57852 12.9252 5.07036 13.918C5.47415 14.7286 6.56712 15.4239 9.10829 15.436C12.7242 15.4512 13.9751 13.0588 14.5519 11.5165C14.6126 11.3556 14.7037 11.0459 14.7857 10.7454C14.9041 10.3173 15.1652 9.89526 15.2805 9.83454C15.3504 9.80115 15.4293 9.7708 15.5083 9.7708C15.5902 9.7708 15.6692 9.80115 15.739 9.83454C15.8544 9.89526 16.1094 10.3173 16.2278 10.7454C16.3098 11.0459 16.4008 11.3526 16.4616 11.5165C17.0354 13.0619 18.2893 15.4512 21.9021 15.436C24.4433 15.4269 25.5363 14.7317 25.9401 13.918C26.4319 12.9283 27.3397 10.2444 27.5097 9.79205C27.5644 9.64632 27.6828 9.56434 27.8072 9.5188C28.0501 9.43379 28.2414 9.24859 28.3021 8.99963L28.4023 8.56852C28.4964 8.15562 28.2323 7.7488 27.8194 7.66379C26.8843 7.47555 25.3814 7.28125 23.9302 7.24481C21.9598 7.20231 19.3913 7.5393 17.7944 8.07061Z"
                                  fill="#261F11"
                                />
                                <path
                                  d="M17.1971 10.4655C17.273 12.2173 18.9792 13.8993 20.5731 14.2849C22.92 14.8526 24.6839 14.3456 25.6858 12.19C25.9864 11.5403 26.6331 10.1224 26.5906 9.36647C26.5177 8.05187 24.8509 8.2826 23.7853 8.25831C23.6699 8.25528 17.0908 8.07008 17.1971 10.4655Z"
                                  fill="#574A2D"
                                />
                                <path
                                  d="M13.8691 10.4655C13.7932 12.2173 12.087 13.8993 10.4931 14.2849C8.1462 14.8526 6.38226 14.3456 5.38037 12.19C5.0798 11.5403 4.43313 10.1224 4.47563 9.36647C4.5485 8.05187 6.21528 8.2826 7.28093 8.25831C7.39326 8.25528 13.9754 8.07008 13.8691 10.4655Z"
                                  fill="#574A2D"
                                />
                                <g filter="url(#filter1_di)">
                                  <path
                                    d="M18.303 20.2245C17.9538 20.2245 17.5986 20.2002 17.2373 20.1455C16.8852 20.0939 16.6453 19.766 16.6969 19.4138C16.7485 19.0647 17.0734 18.8218 17.4286 18.8734C19.4628 19.177 21.2692 18.4089 22.0312 16.9121C22.1922 16.5964 22.5808 16.4719 22.8965 16.6328C23.2123 16.7937 23.3398 17.1824 23.1789 17.4981C22.3015 19.2165 20.4525 20.2245 18.303 20.2245Z"
                                    fill="#823423"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d"
                                    x="0.65517"
                                    y="0.360352"
                                    width="29.6901"
                                    height="29.6901"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity={0}
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1.70518" />
                                    <feGaussianBlur stdDeviation="0.852591" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0.9 0 0 0 0 0.6165 0 0 0 0 0.19125 0 0 0 0.33 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                  <filter
                                    id="filter1_di"
                                    x="16.2636"
                                    y="16.5625"
                                    width="7.41119"
                                    height="4.51454"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity={0}
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="0.426295" />
                                    <feGaussianBlur stdDeviation="0.213148" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      result="hardAlpha"
                                    />
                                    <feOffset dy="0.426295" />
                                    <feGaussianBlur stdDeviation="0.426295" />
                                    <feComposite
                                      in2="hardAlpha"
                                      operator="arithmetic"
                                      k2={-1}
                                      k3={1}
                                    />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="shape"
                                      result="effect2_innerShadow"
                                    />
                                  </filter>
                                  <radialGradient
                                    id="paint0_radial"
                                    cx={0}
                                    cy={0}
                                    r={1}
                                    gradientUnits="userSpaceOnUse"
                                    gradientTransform="translate(15.1347 0.365178) rotate(88.407) scale(26.2796)"
                                  >
                                    <stop stopColor="#EED919" offset={1} />
                                    <stop offset={1} stopColor="#F1BE08" />
                                  </radialGradient>
                                  <linearGradient
                                    id="paint1_linear"
                                    x1="15.1347"
                                    y1="0.365178"
                                    x2="15.8653"
                                    y2="26.6346"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop
                                      stopColor="white"
                                      offset={1}
                                      stopOpacity="0.52"
                                    />
                                    <stop
                                      offset={1}
                                      stopColor="white"
                                      stopOpacity={0}
                                    />
                                    <stop
                                      offset={1}
                                      stopColor="white"
                                      stopOpacity={0}
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </p>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="six">
                        <div className="row">
                          <div className="col-xxl-9 col-lg-8 order-2 order-lg-0">
                            <div className="white-bg">
                              <div className="students-info-form">
                                <h6 className="font-title--card">
                                  Your Information
                                </h6>
                                <form
                                  onSubmit={handleProfileSubmit(
                                    onSubmitProfile
                                  )}
                                >
                                  <div className="row g-3">
                                    <div className="col-lg-6">
                                      <label htmlFor="first_name">
                                        First Name
                                      </label>
                                      <input
                                        type="text"
                                        className={`form-control ${
                                          profileErrors.first_name
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        placeholder="Phillip"
                                        id="first_name"
                                        {...registerProfile("first_name")}
                                      />
                                      <div className="invalid-feedback">
                                        {profileErrors.first_name?.message}
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <label htmlFor="last_name">
                                        Last Name
                                      </label>
                                      <input
                                        type="text"
                                        className={`form-control ${
                                          profileErrors.last_name
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        placeholder="Bergson"
                                        id="last_name"
                                        {...registerProfile("last_name")}
                                      />
                                      <div className="invalid-feedback">
                                        {profileErrors.last_name?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12">
                                      <label htmlFor="email">Email</label>
                                      <input
                                        type="email"
                                        id="email"
                                        className={`form-control ${
                                          profileErrors.email
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        placeholder="example@gmail.com"
                                        {...registerProfile("email")}
                                      />
                                      <div className="invalid-feedback">
                                        {profileErrors.email?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row g-3">
                                    <div className="col-6">
                                      <label htmlFor="profession">
                                        What Do You Do
                                      </label>
                                      <input
                                        type="text"
                                        id="profession"
                                        className={`form-control ${
                                          profileErrors.profession
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        placeholder="UI/UX Designer"
                                        {...registerProfile("profession")}
                                      />
                                      <div className="invalid-feedback">
                                        {profileErrors.profession?.message}
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <label htmlFor="phone_no">
                                        Phone Number
                                      </label>
                                      <input
                                        type="text"
                                        className={`form-control ${
                                          profileErrors.phone_no
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        placeholder="+8801236-858966"
                                        id="phone_no"
                                        {...registerProfile("phone_no")}
                                      />
                                      <div className="invalid-feedback">
                                        {profileErrors.phone_no?.message}
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="row g-3">
                                    
                                    <div className="col-lg-6">
                                      <label htmlFor="nationality">
                                        Nationality
                                      </label>
                                      <input
                                        type="text"
                                        className={`form-control ${
                                          profileErrors.country
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        id="country"
                                        {...registerProfile("country")}
                                      />
                                      <div className="invalid-feedback">
                                        {profileErrors.country?.message}
                                      </div>
                                    </div>
                                  </div> */}
                                  <div
                                    className={`d-flex justify-content-lg-end justify-content-center mt-2 ${
                                      profileIsSubmitting ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      disabled={profileIsSubmitting}
                                      className="theme-btn"
                                      type="submit"
                                    >
                                      {profileIsSubmitting
                                        ? "Saving Changes..."
                                        : "Save Changes"}
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="white-bg mt-4">
                              <div className="students-info-form">
                                <h6 className="font-title--card">
                                  Change Password
                                </h6>
                                <form
                                  onSubmit={handlePasswordSubmit(
                                    onSubmitPasswordChange
                                  )}
                                >
                                  <div className="row">
                                    <div className="col-12">
                                      <label htmlFor="current_password">
                                        Current Password
                                      </label>
                                      <div className="input-with-icon">
                                        <input
                                          type={
                                            showCurrentPassword
                                              ? "text"
                                              : "password"
                                          }
                                          id="current_password"
                                          className="form-control"
                                          placeholder="Enter Password"
                                          {...registerPassword(
                                            "current_password"
                                          )}
                                        />
                                        <div
                                          className="input-icon"
                                          onClick={() =>
                                            setShowCurrentPassword(
                                              !showCurrentPassword
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              showCurrentPassword
                                                ? faEye
                                                : faEyeSlash
                                            }
                                          />
                                        </div>
                                      </div>
                                      {passwordErrors.current_password && (
                                        <p className="error-message text-danger">
                                          {
                                            passwordErrors.current_password
                                              .message
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12">
                                      <label htmlFor="password">
                                        New Password
                                      </label>
                                      <div className="input-with-icon">
                                        <input
                                          type={
                                            showNewPassword
                                              ? "text"
                                              : "password"
                                          }
                                          id="password"
                                          className="form-control"
                                          placeholder="Enter Password"
                                          {...registerPassword("password")}
                                        />
                                        <div
                                          className="input-icon"
                                          onClick={() =>
                                            setShowNewPassword(!showNewPassword)
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              showNewPassword
                                                ? faEye
                                                : faEyeSlash
                                            }
                                          />
                                        </div>
                                      </div>
                                      {passwordErrors.password && (
                                        <p className="error-message text-danger">
                                          {passwordErrors.password.message}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12">
                                      <label htmlFor="password_confirmation">
                                        Confirm New Password
                                      </label>
                                      <div className="input-with-icon">
                                        <input
                                          type={
                                            showConfirmNewPassword
                                              ? "text"
                                              : "password"
                                          }
                                          id="password_confirmation"
                                          className="form-control"
                                          placeholder="Confirm Password"
                                          {...registerPassword(
                                            "password_confirmation"
                                          )}
                                        />
                                        <div
                                          className="input-icon"
                                          onClick={() =>
                                            setShowConfirmNewPassword(
                                              !showConfirmNewPassword
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              showConfirmNewPassword
                                                ? faEye
                                                : faEyeSlash
                                            }
                                          />
                                        </div>
                                      </div>
                                      {passwordErrors.password_confirmation && (
                                        <p className="error-message text-danger">
                                          {
                                            passwordErrors.password_confirmation
                                              .message
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className={`d-flex justify-content-lg-end justify-content-center mt-2 ${
                                      passwordIsSubmitting ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      disabled={passwordIsSubmitting}
                                      className="theme-btn"
                                      type="submit"
                                    >
                                      {passwordIsSubmitting
                                        ? "Saving Changes..."
                                        : "Save Changes"}
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <ImageUploadComponent />
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentProfile;
