import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/quiz/:type" element={<Quiz />} />

        <Route path="/history" element={<History />} />

        <Route path="/leaderboard" element={<Leaderboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;