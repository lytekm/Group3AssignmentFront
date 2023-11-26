import React, { useState } from "react";
import "../assets/login.css";
import { useNavigate } from "react-router-dom";
import music from "../assets/music.jpg";
import config from "../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(false);
    const res = await fetch(`${config.apiBaseUrl}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      data.password = password;
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else {
      setError(true);
    }
  };
  return (
    <div className="loginPage">
      <img src={music} alt="mus" className="backImg" />
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div>
              <p>
                Incorrect username <br /> or password
              </p>
            </div>
          )}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
