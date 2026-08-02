import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">🎓</div>
        <h1>Jupiter Admin</h1>
        <p>Sign in to manage your school database</p>

        {errorMsg && <div className="error-badge">{errorMsg}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@jupiter.ac.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;