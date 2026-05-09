import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {

    try {

      const username = localStorage.getItem("username");

      const response = await axios.get(
        `http://127.0.0.1:5000/scores/${username}`
      );

      setScores(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-blue-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Quiz History
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">

        {scores.length === 0 ? (

          <p className="text-center text-xl">
            No quiz attempts yet.
          </p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="p-3 text-left">Attempt</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Quiz</th>
                <th className="p-3 text-left">Score</th>

              </tr>

            </thead>

            <tbody>

              {scores.map((item, index) => (

                <tr key={item.id} className="border-b">

                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.username}</td>
                  <td className="p-3">{item.quiz_type}</td>
                  <td className="p-3">{item.score}</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default History;