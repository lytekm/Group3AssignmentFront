import React from "react";
import NavBar from "../components/navbar";
import "../assets/homepage.css";

const Homepage = () => {
  return (
    <div>
      <NavBar loggedIn={false} />
      <h1>Hello, World!</h1>
    </div>
  );
};

export default Homepage;
