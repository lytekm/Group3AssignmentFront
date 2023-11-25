import React, { useEffect, useState } from "react";
import "../assets/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const check = localStorage.getItem("user");
    if (check) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }
  
  return (
    <div className="navbar">
      <select>
        <option>EN</option>
        <option>FR</option>
      </select>
      <h1>DynamoVinyls</h1>
      <div className="buttons">
        <a href="/vinyls">Vinyls</a>
        {isLoggedIn ? (
          <>
            <Link to={"/profile"} className="profileBtn">My Profile</Link>
            <Link onClick={handleLogout}>Sign Out</Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
