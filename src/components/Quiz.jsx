/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Question from "./Question";

function Quiz(props) {
  const { questions } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isShowScreenQuiz, setIsShowScreenQuiz] = useState(false);
  const [isDisableNext, setIsDisableNext] = useState(true);
  const [isShowAnswers, setIsShowAnswers] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleStart = () => {
    setIsShowScreenQuiz(true);
  };

  const handleSelectAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    setIsDisableNext(false);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setIsShowScreenQuiz(false);
    setAnswers([]);
  };

  useEffect(() => {
    setIsDisableNext(true);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const numCorrectAnswers = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  const color = (option, index, question) => {
    if (option === question.correctAnswer) {
      return "green";
    } else if (answers[index] === option) {
      return "red";
    }
  };

  const renderAnswer = () => {
    return (
      <div className="my-10">
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: "40px" }}>
            <h4 className="text-xl font-bold">{question.question}</h4>
            <div className="flex flex-col">
              {question.options.map((option, key) => (
                <button
                  key={key}
                  style={{ color: color(option, index, question) }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const complete = () => {
    const numQuestions = questions.length;
    const score = (numCorrectAnswers / numQuestions) * 100;

    return (
      <>
        <h2 className="bg-green-900 font-bold text-2xl my-5 inline-block px-5 py- rounded-full">
          Hoàn thành!
        </h2>
        <p>
          Điểm của bạn: <strong>{score}</strong>
        </p>
        <h4>{"Số câu đúng: " + numCorrectAnswers}</h4>
        <div className="flex flex-col items-center">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-full my-3"
            onClick={handleRestartQuiz}
          >
            Làm lại
          </button>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-full"
            onClick={() => setIsShowAnswers(!isShowAnswers)}
          >
            Xem lại câu trả lời
          </button>
        </div>

        {isShowAnswers && renderAnswer()}
      </>
    );
  };

  return (
    <div className="text-white">
      {!(currentQuestionIndex === questions.length) ? (
        <>
          {!isShowScreenQuiz && (
            <button
              className="w-40 h-50 bg-red-700 text-white px-4 py-2 rounded-full my-10"
              onClick={handleStart}
            >
              Bắt đầu
            </button>
          )}
          {isShowScreenQuiz && (
            <>
              <h3>{`${currentQuestionIndex + 1}/${
                questions.length
              } câu hỏi`}</h3>
              <h4>{"Số câu đúng: " + numCorrectAnswers}</h4>
              <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                correctAnswer={currentQuestion.correctAnswer}
                onSelect={handleSelectAnswer}
              />

              {!isDisableNext && (
                <button
                  style={{ margin: "15px" }}
                  onClick={handleNextQuestion}
                  className="bg-red-700 text-white px-4 py-2 rounded-full my-5"
                >
                  Câu tiếp theo
                </button>
              )}
            </>
          )}
        </>
      ) : (
        complete()
      )}
    </div>
  );
}

export default Quiz;
