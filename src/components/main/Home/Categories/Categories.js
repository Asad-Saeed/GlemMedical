import React, { useEffect } from "react";
// import { Images } from "../../../../assets/assets";
import { FetchCourseCategories } from "../../../../redux/home/homeActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import Slider from "react-slick";
import "./Categories.css";

function Categories() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchCourseCategories());
  }, [dispatch]);
  const categories = useSelector((state) => state?.home?.categoriesList?.data);
  const loading = useSelector((state) => state?.home?.loading);
    const settings = {
      dots: true,
      infinite: true,
      arrows: false,
      margin: 10,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      // autoplay: true,
      autoplaySpeed: 2000,
      centerPadding: "60px",
      responsive: [
          {
              breakpoint: 1200,
              settings: {
                  slidesToShow: 4,
              },
          },
          {
            breakpoint: 1199,
            settings: {
                slidesToShow: 3,
            },
        },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 2,
              },
          },
          {
              breakpoint: 500,
              settings: {
                  slidesToShow: 1,
                  className: "center",
                  centerMode: true,
              },
          },
      ],
    };
  return (
    <div className="popular-categories-wraper">
      {loading ? (
        <Loader />
      ) : (
        <div className="theme__container">
          <section className="categories-list">
            <div className="grid-container">
              <Slider {...settings}>
              {categories?.slice(0, 5).map((category, index) => (
                <div className="category-item" key={index}>
                  <div className="category-img-wraper">
                    <img
                      src={category.category_image}
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                  <div className="category-naming">
                    <h5>{category.category_name}</h5>
                    <p>{category.total_course_count} Courses</p>
                  </div>
                </div>
              ))}
              </Slider>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Categories;
