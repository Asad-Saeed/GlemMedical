import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './Quizz.css';

const Quizz = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook to navigate back
    const { questions } = location.state || {};

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Convert the questions data to match the dummyData format
    const transformQuestions = (questions) => {
        return questions.map(question => {
          const parsedOptions = JSON.parse(question.options);
          const correctAnswer = parsedOptions[question.correct_answer];
          const optionsArray = Object.values(parsedOptions);
          return {
            id: question.id,
            text: question.content,
            options: optionsArray,
            correctAnswer: correctAnswer,
            description: question.description
          };
        });
    };

    const transformedData = transformQuestions(questions);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };

    // Function to reset the quiz state
    const handleAttemptAgain = () => {
        setSelectedAnswers({});
        setSubmitted(false);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };

    const getBadge = (question, option) => {
        if (!submitted) return null;

        if (selectedAnswers[question.id] === option) {
            return option === question.correctAnswer ? (
                <span className="badge correct">Correct</span>
            ) : (
                <span className="badge incorrect">Incorrect</span>
            );
        } else if (option === question.correctAnswer) {
            return <span className="badge correct">Correct</span>;
        }
        return null;
    };

    const getCustomRadio = (question, option) => {
        if (submitted) {
            if (selectedAnswers[question.id] === option) {
                return <FontAwesomeIcon icon={faCheckCircle} className="tick-icon" />;
            }
            return null;
        }
        return <span className={`custom-radio ${submitted ? 'submitted' : ''}`}></span>;
    };

    const allQuestionsAnswered = transformedData.length === Object.keys(selectedAnswers).length;

    const score = transformedData.reduce((total, question) => {
        return total + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    return (
        <div className="quiz-wrapper">
            {/* Back button on the top right corner */}
            {/* <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button> */}

            <div className={`quiz-container ${submitted ? 'submitted' : ''}`}>
                {submitted && (
                    <div className={`quiz-results ${submitted ? 'visible' : ''}`}>
                        <div className={`result-icon ${score >= transformedData.length / 2 ? 'feedback-icon' : 'feedback-icon negative'}`}>
                            <FontAwesomeIcon icon={score >= transformedData.length / 2 ? faCheckCircle : faTimesCircle} />
                        </div>
                        <h3>Your Score</h3>
                        <p>{score} / {transformedData.length}</p>
                        <p className={`feedback ${score >= transformedData.length / 2 ? '' : 'negative'}`}>
                            {score >= transformedData.length / 2 ? 'Great job!' : 'Better luck next time!'}
                        </p>
                    </div>
                )}
                
                {transformedData.map((question, index) => (
                    <div key={question.id} className="quiz-question">
                        <p className="question-text">Q{index + 1}. {question.text}</p>
                        <div className="options">
                            {question.options.map((option, idx) => (
                                <label
                                    key={idx}
                                    className={`option-label ${submitted && option === question.correctAnswer ? 'correct-answer' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option}
                                        checked={selectedAnswers[question.id] === option}
                                        onChange={() => handleAnswerChange(question.id, option)}
                                        disabled={submitted}
                                    />
                                    {getCustomRadio(question, option)}
                                    <span className="option-text">{option}</span>
                                    {getBadge(question, option)}
                                </label>
                            ))}
                        </div>
                        {submitted && <div className="question-description">{question.description}</div>}
                    </div>
                ))}
                
                {allQuestionsAnswered && !submitted && (
                    <button className="submit-button" onClick={handleSubmit} disabled={submitted}>
                        {submitted ? 'Submitted' : 'Submit'}
                    </button>
                )}

                {/* Show Attempt Again button after submission */}
                {submitted && (
                    <button className="attempt-again-button" onClick={handleAttemptAgain}>
                        Attempt Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default Quizz;
