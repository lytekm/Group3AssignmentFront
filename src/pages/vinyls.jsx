import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import "../assets/vinyls.css";
import AlbumCoverExample from "../assets/AlbumCoverExample.jpg";
import config from "../config";

const Vinyls = () => {
  const [vinyls, setVinyls] = useState([]);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/api/music`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVinyls(data);
      });
  }, []);

  return (
    <>
      <NavBar loggedIn={false} />
      <div className="all-cards">
        {vinyls.map((vinyl, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={vinyl.image}
                alt={"Album Cover"}
                className="album-image"
              />
              <h2 className="album-title">{vinyl.title}</h2>
              <p className="album-singer">{vinyl.singer}</p>
              <p className="album-category">{vinyl.category}</p>
              <p className="album-price">${vinyl.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Vinyls;
