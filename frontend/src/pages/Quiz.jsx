import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Quiz() {

  const { type } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState(30);

  // Fetch Questions
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Timer Logic
  useEffect(() => {

    if (timeLeft === 0) {
      saveScore(score);
      setShowResult(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);

  // Get Questions API
  const fetchQuestions = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:5000/questions/${type}`
      );

      setQuestions(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Save Score API
  const saveScore = async (finalScore) => {

    try {

      await axios.post("http://127.0.0.1:5000/save-score", {
        username: localStorage.getItem("username"),
        quiz_type: type,
        score: finalScore,
    });

      console.log("Score saved successfully");

    } catch (error) {
      console.log(error);
    }
  };

  // Handle Answer
  const handleAnswer = (option) => {

    let updatedScore = score;

    if (option === questions[currentQuestion].answer) {
      updatedScore = score + 1;
      setScore(updatedScore);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {

      setCurrentQuestion(nextQuestion);

    } else {

      saveScore(updatedScore);
      setShowResult(true);
    }
  };

  // Loading Screen
  if (questions.length === 0) {
    return (
      <h1 className="text-center mt-10 text-3xl font-bold">
        Loading...
      </h1>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">

        {!showResult ? (
          <>

            <div className="flex justify-between mb-4">

              <h2 className="text-xl font-bold">
                Question {currentQuestion + 1}/{questions.length}
              </h2>

              <div className="text-red-500 font-bold">
                Time Left: {timeLeft}s
              </div>

            </div>

            <h1 className="text-2xl font-bold mb-6">
              {questions[currentQuestion].question}
            </h1>

            <div className="space-y-4">

              {questions[currentQuestion].options.map((option, index) => (

                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                >
                  {option}
                </button>

              ))}

            </div>

          </>
        ) : (

          <div className="text-center">

            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Quiz Finished!
            </h1>

            <p className="text-2xl">
              Your Score: {score} / {questions.length}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default Quiz;