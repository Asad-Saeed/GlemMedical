import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from "react-router-dom";
import 'react-responsive-pagination/themes/classic.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FetchCourses } from "../../../../redux/courses/courseActions";
import { FetchCourseCategories } from "../../../../redux/home/homeActions";
import { FetchTeams } from "../../../../redux/common/commonActions";
import { Images } from "../../../../assets/assets";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import "./Coursespage.css";

function Coursespage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1); // Start at page 1
    const [totalPages, setTotalPages] = useState(1); // Initially set to 1

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);

    const dispatch = useDispatch();

    // Fetch courses whenever filters or page changes
    useEffect(() => {
        const params = {
            categories: selectedCategories,
            instructors: selectedInstructors,
            page: currentPage, // Send current page in request
            limit: 4, // You can change the limit or make it configurable
        };
        dispatch(FetchCourses(params));
        dispatch(FetchCourseCategories());
        dispatch(FetchTeams());
    }, [dispatch, selectedCategories, selectedInstructors, currentPage]);

    const courses = useSelector((state) => state?.courses?.coursesList?.data);
    const courseLoading = useSelector((state) => state?.courses?.loading);
    const categories = useSelector((state) => state?.home?.categoriesList?.data);
    const instructors = useSelector((state) => state?.common?.teamsList?.data);

    // Get pagination details from the API response
    const totalItems = courses?.length;
    const itemsPerPage = 4;

    useEffect(() => {
        // Calculate total pages based on total items and items per page
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }, [totalItems]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
        );
    };

    const handleInstructorChange = (instructorId) => {
        setSelectedInstructors(prev =>
            prev.includes(instructorId) ? prev.filter(id => id !== instructorId) : [...prev, instructorId]
        );
    };

    return (
        <div className='courses-pg-wraper'>
            <section className='commmon-cms-baner'>
                <div className="theme__container">
                    <div className='d-flex flex-column justify-content-center align-items-center cms-baner-content'>
                        <h1>Courses</h1>
                        <p className='mt-xl-3 mt-md-2 mt-1'>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                </div>
            </section>

            <section className='our-popular-courses pt-90 pb-90'>
                <div className="theme__container">
                    <div className='section-heading-wraper d-flex flex-md-row flex-column justify-content-between align-items-md-center'>
                        <div className="d-flex flex-column">
                            <h5 className="mb-xl-2 mb-1 one-side-fency-heading">Courses</h5>
                            <h2 className="mb-xl-3 mb-1">Our Popular  <span className="theme-color">Courses </span></h2>
                        </div>
                    </div>
                    <div className='courses-page-content pt-50'>
                        <div className='row'>
                            <div className='col-lg-4'>
                                {/* Category Filter */}
                                <div className='courses-category-box mb-md-4 mb-3'>
                                    <h6 className='mb-xl-4 mb-md-3 mb-2'>Filter by Categories</h6>
                                    <ul className="courses-category-list">
                                        {categories?.map((category, index) => (
                                            <li key={index}>
                                                <div className="checkbox-wrapper">
                                                    {/* Input and label are linked via id and htmlFor */}
                                                    <input
                                                        className="styled-checkbox"
                                                        id={`category-${category.id}`}
                                                        type="checkbox"
                                                        value={category.id}
                                                        onChange={() => handleCategoryChange(category.id)}
                                                    />
                                                    <label htmlFor={`category-${category.id}`}>{category?.category_name}</label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Instructor Filter */}
                                <div className='courses-category-box mb-md-4 mb-3'>
                                    <h6 className='mb-xl-4 mb-md-3 mb-2'>Filter by Instructors</h6>
                                    <ul className="courses-category-list">
                                        {instructors?.map((instructor, index) => (
                                            <li key={index}>
                                                <div className="checkbox-wrapper">
                                                    <input
                                                        className="styled-checkbox"
                                                        id={`instructor-${instructor.id}`}
                                                        type="checkbox"
                                                        value={instructor.id}
                                                        onChange={() => handleInstructorChange(instructor.id)}
                                                    />
                                                    <label htmlFor={`instructor-${instructor.id}`} className="checkbox-label">{instructor?.name_en}</label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className='col-lg-8'>
                                {courseLoading ? (
                                    <Loader />
                                ) : (
                                    courses?.length === 0 ? (
                                        <div className="no-courses-found">
                                            <span className="no-courses-badge">No Courses Found</span>
                                        </div>
                                    ) : (
                                        courses?.map((course, index) => (
                                            <Link to={`/courses-detail/${course?.id}`} key={index}>
                                                <div className="courses-detail-box mb-md-3 mb-2">
                                                    <div className="course-image">
                                                        <img src={course?.image} className="img-fluid" alt="img" />
                                                    </div>
                                                    <div className="course-description">
                                                        <h5 className="course-price text-red mb-xl-2 mb-1">
                                                            {course?.price}
                                                        </h5>
                                                        <h6 className="mb-xl-2 mb-1">
                                                            {course?.title_en}
                                                        </h6>
                                                        <p className="course-para mb-xl-2 mb-1">{course?.description_en}</p>
                                                        <div className="course-rating">
                                                            <ul className="star-list">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <li key={i}>
                                                                        <FontAwesomeIcon icon={faStar} />
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <p className="small-text">(5.0/9 Rating)</p>
                                                        </div>
                                                        <ul className="course-member mt-xl-3 mt-2">
                                                            <li>
                                                                <img src={Images.lesson} className="img-fluid me-xl-2 me-1" alt="img" />
                                                                <p className="small-text">{course?.lesson}</p>
                                                            </li>
                                                            <li>
                                                                <img src={Images.primeUser} className="img-fluid me-xl-2 me-1" alt="img" />
                                                                <p className="small-text">{course?.total_students} Students</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )
                                )}

                            </div>
                        </div>
                    </div>
                    <div className='pagination-container'>
                        <ResponsivePagination
                            current={currentPage}
                            total={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Coursespage;
