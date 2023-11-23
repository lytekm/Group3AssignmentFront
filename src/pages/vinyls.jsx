import React from "react";
import NavBar from "../components/navbar";
import "../assets/vinyls.css";
import AlbumCoverExample from "../assets/AlbumCoverExample.jpg";

const Vinyls = () => {
return (

    <><NavBar loggedIn={false} /><div className="all-cards">
        <div className="card">
            <img src={AlbumCoverExample} alt={"Songs From The Big Chair"} className="album-image" />
            <h2 className="album-title">{"Songs From The Big Chair"}</h2>
            <p className="album-singer">{"Tears For Fears"}</p>
            <p className="album-category">{"80's"}</p>
            <p className="album-price">{"$39.90"}</p>
        </div>

        <div className="card">
            <img src={AlbumCoverExample} alt={"Songs From The Big Chair"} className="album-image" />
            <h2 className="album-title">{"Songs From The Big Chair"}</h2>
            <p className="album-singer">{"Tears For Fears"}</p>
            <p className="album-category">{"80's"}</p>
            <p className="album-price">{"$39.90"}</p>
        </div>

        <div className="card">
            <img src={AlbumCoverExample} alt={"Songs From The Big Chair"} className="album-image" />
            <h2 className="album-title">{"Songs From The Big Chair"}</h2>
            <p className="album-singer">{"Tears For Fears"}</p>
            <p className="album-category">{"80's"}</p>
            <p className="album-price">{"$39.90"}</p>
        </div>

    </div></>
);
};
  
  export default Vinyls;