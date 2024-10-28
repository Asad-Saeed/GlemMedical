import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faFileAlt, faVideo, faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import "./CourseContent.css";

Modal.setAppElement('#root');

const CourseContent = ({ content }) => {
    console.log(content, '$mt->content')
    const [openAll, setOpenAll] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentMedia, setCurrentMedia] = useState({ url: "", type: "" });

    const toggleAllSections = () => {
        setOpenAll(!openAll);
    };

    const openModal = (content ,url, type) => {
        setCurrentMedia({content, url, type });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentMedia({content: "", url: "", type: "" });
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
                            {content.length} categories • {content.reduce((total, category) => total + category.lessons.length, 0)} lessons
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

                {content.map((category, index) => (
                    <Section key={index} category={category} isOpen={openAll} openModal={openModal} />
                ))}

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Preview Media"
                    className="styled-media-modal"
                    overlayClassName="styled-media-modal-overlay"
                >
                    <div className="modal-header">
                        <button className="styled-modal-close-button" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    {currentMedia.type === "video" ? (
                        <ReactPlayer
                            url={currentMedia.content ? currentMedia?.content : currentMedia?.url}
                            className="react-player"
                            controls
                            playing
                            width="100%"
                            height="100%"
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload', // optional, to prevent downloading
                                        type: 'video/mp4' // explicitly set type
                                    }
                                }
                            }}
                        />
                    ) : currentMedia.type === "document" ? (
                        <iframe
                            src={currentMedia.content ? currentMedia?.content : currentMedia?.url}
                            title="PDF Preview"
                            width="100%"
                            height="500px"
                            frameBorder="0"
                        >
                            This browser does not support PDFs. Please download the PDF to view it: <a href={currentMedia.url}>Download PDF</a>.
                        </iframe>
                    ) : null}
                </Modal>


            </div>
        </div>
    );
};

const Section = ({ category, isOpen: parentIsOpen, openModal }) => {
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
                            <span className="section--section-title--svpHP">
                                {category.name} (Main)
                            </span>
                            <span className="gms-text-sm section--hidden-on-mobile---ITMr section--section-content--2mUJ7">
                                {category.lessons.length} lessons
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
                            {category.lessons.map((lesson, lessonIndex) => (
                                <Lesson key={lessonIndex} lesson={lesson} lessonNumber={lessonIndex + 1} openModal={openModal} />
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const Lesson = ({ lesson, lessonNumber, openModal }) => {
    return (
        <>
            {lesson.materials.length > 0 ? (
                lesson.materials.map((material, materialIndex) => (
                    <li key={materialIndex}>
                        <div className={`section--previewable-item---IMY- gms-block-list-item gms-block-list-item-small gms-block-list-item-link gms-text-sm`}>
                            <div className="gms-block-list-item-content">
                                <FontAwesomeIcon icon={material.type === "video" ? faVideo : faFileAlt} className="lesson-icon" />
                                <button type="button" className="gms-btn gms-btn-large gms-btn-link gms-text-sm section--item-title--EWIuI"
                                    onClick={() => openModal(material.content, material.content_url, material.type)}
                                >
                                    <span className="gms-btn-label">
                                        Lesson-{lessonNumber} {lesson.title} - {material.title}
                                    </span>
                                </button>
                            </div>
                            <div className="section--item-summary">
                                <button
                                    type="button"
                                    className="gms-btn gms-btn-large gms-btn-link gms-text-sm section--preview-button"
                                    onClick={() => openModal(material.content, material.content_url, material.type)}
                                >
                                    <span className="section--hidden-on-mobile---ITMr section--preview-text--YETr5">Preview</span>
                                </button>
                                <span className="section--hidden-on-mobile---ITMr section--item-content-summary--Aq9em">{material?.duration}</span>
                            </div>
                        </div>
                    </li>
                ))
            ) : (
                <li>
                    <div className={`section--previewable-item---IMY- gms-block-list-item gms-block-list-item-small gms-block-list-item-link gms-text-sm`}>
                        <div className="gms-block-list-item-content">
                            <FontAwesomeIcon icon={faFileAlt} className="lesson-icon" />
                            <button type="button" className="gms-btn gms-btn-large gms-btn-link gms-text-sm section--item-title--EWIuI">
                                <span className="gms-btn-label">
                                    Lesson-{lessonNumber} {lesson.title}
                                </span>
                            </button>
                        </div>
                    </div>
                </li>
            )}
        </>
    );
};

export default CourseContent;
