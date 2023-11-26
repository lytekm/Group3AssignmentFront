import React, { useState } from "react";
import "../assets/signup.css";
import { Link } from "react-router-dom";
import music from "../assets/music.jpg";
import config from "../config";

const signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSuccess(false);
    setError(false);
    const data = await fetch(`${config.apiBaseUrl}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (data.ok) {
      setSuccess(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="signUpPage">
      <img src={music} alt="mus" className="backImg" />
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {success && (
            <div>
              <Link to={"/login"}>
                User created Successfully,
                <br /> Click to login.
              </Link>
            </div>
          )}
          {error && (
            <div>
              <p>
                There was an error, <br /> please try again
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
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default signup;
