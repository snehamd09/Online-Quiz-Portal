import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const quizzes = [
    { title: "Python Quiz", type: "python" },
    { title: "Web Development Quiz", type: "web" },
    { title: "Cybersecurity Quiz", type: "cyber" },
    { title: "Computer Networks Quiz", type: "cn" }
  ];

  const startQuiz = (type) => {
    navigate(`/quiz/${type}`);
  };

  const logout = () => {

    localStorage.removeItem("username");

    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">

      {/* Navbar */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-blue-900">
          Quiz Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Welcome */}
      <h2 className="text-2xl font-semibold mb-8 text-white">
        Welcome, {username} 👋
      </h2>

      {/* Buttons */}
      <div className="mb-8 flex gap-4">

        <button
          onClick={() => navigate("/history")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          View History
        </button>

        <button
          onClick={() => navigate("/leaderboard")}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
        >
          Leaderboard
        </button>

      </div>

      {/* Quiz Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {quizzes.map((quiz, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300"
          >

            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              {quiz.title}
            </h2>

            <button
              onClick={() => startQuiz(quiz.type)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Start Quiz
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;