import React from "react";
import "./Quizzes.css";
import { useNavigate } from "react-router-dom";

const Quizzes = ({ quizz }) => {
  const navigate = useNavigate();
  
  return (
    <div className="quiz-section">
      <h2 className="gms-heading-xl">Course Quizzes</h2>
      <div className="quiz-list">
        {quizz && quizz.length > 0 ? (
          quizz.map((quiz, index) => (
            <div key={quiz.id} className="quiz-item">
              <span className="quiz-title">{`Quiz ${index + 1}: ${quiz.title}`}</span>
              <button
                className="section--preview-button"
                onClick={() => {
                  navigate("/quizz", { state: { questions: quiz?.question } }); // Navigate with quiz questions
                }}
              >
                Start Quiz
              </button>
            </div>
          ))
        ) : (
          <div className="no-quizzes-message">No quiz available</div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
