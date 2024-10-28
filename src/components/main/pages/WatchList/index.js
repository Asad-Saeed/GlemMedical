// Course.js
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./style.css";
import Quizzes from "./QuizzesList/Quizzes"; // Ensure this imports the Quizzes component
import CourseContent from "./CourseContent/CourseContent"; // Create this component similar to Quizzes

const Index = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { course } = location.state || {};
    const [activeTab, setActiveTab] = useState("content");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="watchlist-container">
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === "content" ? "active" : ""}`} 
                    onClick={() => handleTabChange("content")}
                >
                    Course Content
                </button>
                <button 
                    className={`tab ${activeTab === "quizzes" ? "active" : ""}`} 
                    onClick={() => handleTabChange("quizzes")}
                >
                    Quizzes
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "quizzes" ? <Quizzes quizz={course?.quiz} /> : <CourseContent content={course?.lessonCategories} />}
            </div>
        </div>
    );
};

export default Index;
