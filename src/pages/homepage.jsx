import React from "react";
import NavBar from "../components/navbar";
import "../assets/homepage.css";
import Arrow from "../assets/arrow.svg";
import Vynil from "../assets/vynil.png";

const Homepage = () => {
  return (
    <div>
      <NavBar loggedIn={false} />
      <div className="homepage">
        <div className="header">
          <img className="vinyl-img" src={Vynil} />
          <h1>Shop Vinyls Now At DynamoVinyls</h1>
          <a href="/vinyls" className="shop-button">
            Shop Now <img className="arrow" src={Arrow} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
