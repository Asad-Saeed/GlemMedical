import React, { useState } from "react";
import CourseCard from "./CourseCard";
const CourseList = ({ courses, disableCondition, isViewCondition }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMoreCourses = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div className="row">
        {courses?.length === 0 && <h4 className="text-center">No Data Found!</h4>}
        {courses?.slice(0, visibleCount).map((course, index) => (
          <CourseCard
            key={course?.id + index}
            course={course}
            disabled={disableCondition}
            view={isViewCondition}
          />
        ))}
      </div>
      {visibleCount < courses?.length && (
        <div className="d-flex justify-content-center w-100 mt-4">
          <button className="theme-btn" onClick={loadMoreCourses}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default CourseList;
