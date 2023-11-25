import React from "react";
import "../assets/navbar.css";

const NavBar = ({ loggedIn }) => {
  return (
    <div className="navbar">
      <select>
        <option>EN</option>
        <option>FR</option>
      </select>
      <h1>DynamoVinyls</h1>
      <div className="buttons">
        <a href="/">Home</a>
        <a href="/vinyls">Vinyls</a>
        <a href="/login">Login</a>
        {loggedIn ? <a>Sign Out</a> : <a href="/signup">Sign Up</a>}
        {loggedIn ? <a href="/account">My Profile</a> : null}
      </div>
    </div>
  );
};

export default NavBar;
