import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faFileAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import "./CourseContent.css";
// import Quizzes from "../QuizzesList/Quizzes"; // Import the Quizzes component

const CourseContent = ({content}) => {
    console.log(content, 'content');
    const sections = [
        {
            title: 'Front-End Web Development',
            lessons: [
                { title: 'What You\'ll Get in This Course', duration: '03:08', type: 'video' },
                { title: 'Download the Course Syllabus', duration: '00:12', type: 'document' },
            ],
            totalLength: '37min',
        },
        {
            title: 'Web Development (PHP)',
            lessons: [
                { title: 'What You\'ll Get in This Course', duration: '03:08', type: 'video' },
                { title: 'Download the Course Syllabus', duration: '00:12', type: 'document' },
            ],
            totalLength: '37min',
        },
    ];

    // State to manage expand/collapse all sections
    const [openAll, setOpenAll] = useState(false);

    // Handle expand/collapse all sections
    const toggleAllSections = () => {
        setOpenAll(!openAll);
    };

    return (
        <div className="component-margin">
            <span id="objective" className="in-page-offset-anchor"></span>
            <div data-purpose="course-curriculum">
                <h2 className="gms-heading-xl curriculum--curriculum-header--vxTrz" data-purpose="curriculum-header">
                    Course Content
                </h2>
                <div className="curriculum--curriculum-sub-header--QqY6d">
                    <div className="gms-text-sm" data-purpose="curriculum-stats">
                        <span className="curriculum--content-length--V3vIz">
                            {sections.length} sections • {sections.reduce((total, section) => total + section.lessons.length, 0)} lectures
                        </span>
                    </div>
                    <button
                        type="button"
                        data-purpose="expand-toggle"
                        aria-expanded={openAll}
                        onClick={toggleAllSections}
                        className="gms-btn gms-btn-medium gms-btn-ghost gms-heading-sm"
                    >
                        <span className="gms-btn-label">{openAll ? "Collapse all sections" : "Expand all sections"}</span>
                    </button>
                </div>
                {sections.map((section, index) => (
                    <Section key={index} section={section} isOpen={openAll} />
                ))}
            </div>

            {/* New Quizzes Section */}
            {/* <Quizzes /> */}
        </div>
    );
};

const Section = ({ section, isOpen: parentIsOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(parentIsOpen);
    }, [parentIsOpen]);

    return (
        <div className="accordion-panel-module--panel--Eb0it section--panel--qYPjj">
            <div
                className="gms-btn gms-btn-large gms-btn-link gms-heading-md gms-accordion-panel-toggler accordion-panel-module--panel-toggler--WUiNu"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="gms-accordion-panel-heading section--section-title-container--Hd9vI">
                    <button
                        type="button"
                        aria-expanded={isOpen}
                        className="gms-btn gms-btn-large gms-btn-link gms-heading-md"
                    >
                        <span className="gms-accordion-panel-title">
                            <span className="section--section-title--svpHP">{section.title}</span>
                            <span className="gms-text-sm section--hidden-on-mobile---ITMr section--section-content--2mUJ7">
                                {section.lessons.length} lectures • {section.totalLength}
                            </span>
                        </span>
                    </button>
                    <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        className="gms-icon"
                    />
                </h3>
            </div>
            {isOpen && (
                <div className="accordion-panel-module--content-wrapper--TkHqe">
                    <div className="gms-accordion-panel-content accordion-panel-module--content--0dD7R">
                        <ul className="gms-unstyled-list gms-block-list">
                            {section.lessons.map((lesson, index) => (
                                <Lesson key={index} lesson={lesson} />
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const Lesson = ({ lesson }) => {
    // Determine the icon based on the lesson type
    const getIcon = (type) => {
        switch (type) {
            case "video":
                return faVideo;
            case "document":
                return faFileAlt;
            default:
                return faFileAlt; // Default icon if type is unrecognized
        }
    };

    return (
        <li>
            <div className={`section--previewable-item---IMY- gms-block-list-item gms-block-list-item-small gms-block-list-item-link gms-text-sm ${lesson.type}`}>
                <div className="gms-block-list-item-content">
                    <FontAwesomeIcon icon={getIcon(lesson.type)} className="lesson-icon" /> {/* Icon added */}
                    <button type="button" className="gms-btn gms-btn-large gms-btn-link gms-text-sm section--item-title--EWIuI">
                        <span className="gms-btn-label">{lesson.title}</span>
                    </button>
                </div>
                <div className="section--item-summary">
                    <button type="button" className="gms-btn gms-btn-large gms-btn-link gms-text-sm section--preview-button">
                        <span className="section--hidden-on-mobile---ITMr section--preview-text--YETr5">Preview</span>
                    </button>
                    <span className="section--hidden-on-mobile---ITMr section--item-content-summary--Aq9em">{lesson.duration}</span>
                </div>
            </div>
        </li>
    );
};

export default CourseContent;
