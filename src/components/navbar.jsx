import React, { useEffect, useState } from "react";
import "../assets/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const check = localStorage.getItem("user");
    if (check) {
      setIsLoggedIn(true);
    }
    if (check && JSON.parse(check).isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <select>
        <option>EN</option>
        <option>FR</option>
      </select>
      <h1>DynamoVinyls</h1>
      <div className="buttons">
        <Link to={"/vinyls"}>Vinyls</Link>
        {isLoggedIn ? (
          <>
            <Link to={"/profile"} className="profileBtn">
              My Profile
            </Link>
            <Link onClick={handleLogout}>Sign Out</Link>
            {isAdmin && <Link to={"/admin"}>Admin</Link>}
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
