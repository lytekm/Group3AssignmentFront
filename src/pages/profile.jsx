import music from "../assets/music.jpg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";

const profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch(`${config.apiBaseUrl}/api/user/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email,
      }),
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      });
  };

  return (
    <>
      <div className="signUpPage">
        <img src={music} alt="mus" className="backImg" />
        <div className="container">
          <h1>Profile</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <span>createdAt:</span>
              <input disabled={true} type="text" value={user.createdAt} />
            </label>
            <label>
              <span>updatedAt:</span>
              <input disabled={true} type="text" value={user.updatedAt} />
            </label>
            <span>Username:</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={user.username}
              onChange={(ev) =>
                setUser({
                  ...user,
                  username: ev.target.value,
                })
              }
            />
            <span>Email:</span>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={user.email}
              onChange={(ev) =>
                setUser({
                  ...user,
                  email: ev.target.value,
                })
              }
            />
            <span>Password:</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={user.password}
              onChange={(ev) =>
                setUser({
                  ...user,
                  password: ev.target.value,
                })
              }
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default profile;
