import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "http://127.0.0.1:5000/login"
        : "http://127.0.0.1:5000/register";

      const response = await axios.post(url, {
        username,
        password,
      });

      alert(response.data.message);

      if (response.data.message === "Login successful") {
        localStorage.setItem("username", username);
        
        navigate("/dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          {isLogin ? "Login" : "Register"}
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="text-center mt-4 cursor-pointer text-blue-600"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}

export default Login;