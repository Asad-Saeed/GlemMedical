import React from "react";
import { ProgressBar } from "react-bootstrap";
import { Images } from "../../../../assets/assets";
import { useNavigate, Link } from "react-router-dom";

const CourseCard = ({ course, disabled, view }) => {

  const navigate = useNavigate();
  // pecentage and difficulities
  const difficultyPercentages = {
    beginner: 30,
    intermediate: 60,
    advanced: 90,
  };
  const coursePercentage =
    difficultyPercentages[course?.difficulty?.toLowerCase()] || 0;

  const handleImageError = (e) => {
    e.target.src = Images.moreCourse3;
  };

  // Handle navigation to WatchList page with course data
  const handleWatchList = () => {
    navigate("/watch-lists", { state: { course } }); // Navigate with state
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="contentCard contentCard--watch-course">
        <div className="contentCard-top">
          {/* <a href={`/courses-detail/${course?.id}`}> */}
            <img
              src={
                course?.image || course?.thumbnail_image || Images?.moreCourse3
              }
              className="img-fluid"
              alt={course.title_en}
              onError={handleImageError}
            />
          {/* </a> */}
        </div>
        <div className="contentCard-bottom">
          <h5>
            <a
              href={`/courses-detail/${course?.id}`}
              className="font-title--card"
            >
              {course?.title_en?.length > 70
                ? course?.title_en?.slice(0, 70) + "..."
                : course?.title_en}
            </a>
          </h5>
          {view && (
          <>
          <div className="contentCard-info d-flex align-items-center justify-content-between">
            <Link 
            to={`/courses-detail/${course?.id}`} 
            key={course?.id}
            className="contentCard-user d-flex align-items-center"
            >
              <img
                src={course?.instructor?.image || Images?.clientImg}
                className="img-fluid rounded-circle"
                alt={course?.instructor?.name_en}
                onError={handleImageError}
              />
              <p className="font-para--md">{course?.instructor?.name_en}</p>
            </Link>
            <div className="contentCard-course--status d-flex align-items-center">
              <span className="percentage">{coursePercentage}%</span>
              <p>Finish</p>
            </div>
          </div>
          {!disabled && (
            <div className="d-flex justify-content-center w-100">
                <button
                    onClick={handleWatchList} // Use onClick to navigate
                    className="theme-btn w-100 my-2"
                    title="Watch Course"
                  >
                    Watch Course
                </button>
            </div>
          )}
          <div className="contentCard-watch--progress">
            <ProgressBar variant="warning" now={coursePercentage} />
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
